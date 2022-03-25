<?php
/*
TODO:
-Problem with array empty at the begining, how to store the annotation array??
-the svg /selector fuckery messes everything up.
*/
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: dpost-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');
//Connect to the DB:
include("database.php");
//Get payload a put it into $data as json
$request_body = file_get_contents('php://input');
try {
    $data = json_decode($request_body);
} catch(Exception $e) {
    var_dump($e);
    echo("failed decoding request:");
    var_dump($request_body);
    exit(0);
}
try {
    $pdo = new PDO("$server;dbname=$database;", $user, $password);
} catch (PDOException $pe) {
    echo(json_encode(['status'=>'error', 'msg' => 'Could not connect to DB' . $pe->getMessage()]));
    return;
}
$idannojson = $data ? $data->idannojson : $_GET['idannojson'];
$annotations = getAnnotations($pdo, $idannojson);
if(!$annotations) {
    echo (json_encode(['status' => 'error', 'msg' => "Could not read annotations from db"]));
    exit(0);
}
// If script is call without options, it should do nothing, or ask for idannojson
if(!$data) {
    export($annotations); //For the moment, we focus on the sql query
    return;
}
//unique annotation id is passed through the requested body
$id = $data->id;
//storing temp variables and removing them from the payload, no need to bloat the json
$action = $data->action;
unset($data->action);
unset($data->idannojson);
switch($action) {
    case 'create':
    $annotations[] = $data;
    break;
    case 'delete':
    $annotations = array_values(array_filter($annotations, function($anno, $i) { global $id; return $anno->id != $id; }, ARRAY_FILTER_USE_BOTH));
    break;
    case 'update':
    foreach($annotations as $i => $anno)
        if($anno->id == $id)
            $annotations[$i] = $data;
    break;
}
$sql = "UPDATE annojson set content_json = :annotations where id = :id";
$q = $pdo->prepare($sql);
$result = $q->execute(['annotations' => json_encode($annotations), 'id' => $idannojson]);
if(!$result) {
    echo (json_encode(['status' => 'error', 'msg' => $q->errorInfo()]));
    exit(0);
}
echo(json_encode(['status' => 'ok']));
function getAnnotations($pdo, $idannojson) {
    $sql = "select content_json from annojson where id= :id";
    $query = $pdo->prepare($sql);
    $result = $query->execute([':id' => $idannojson]);
    if(!$result)
        return null;
    while ($row = $query->fetch()) {
        $annotations = json_decode($row['content_json']);
        break;
    }
    return $annotations;
}
//export modifié, il faut qu'on passe dès la premiere lecture le idannojson:
function export($annotations) {
    //REMOVE THIS FOREACH WHEN NEXT OPENLIME IS RELEASED
    //Annotation expect selector/type/value, not just raw svg
    foreach($annotations as &$anno) {
        $anno->{'selector'} = [
            "type"=> "SvgSelector",
            "value"=> $anno->svg
        ];
        unset($anno->svg); //svg is removed
    }
    echo(json_encode($annotations)); //annotations are sent back to the front
    return;
}
?>

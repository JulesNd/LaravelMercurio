 $rti = Rti::create([

    'rti_id' => $random,

    'nom' => $request->input('nom'),

    'description'=>$request->input('description'),

    'metadata' => $request->input('metadata'),

    'owner_id' =>$request->input('owner_id'),

    'date' =>$request->input('date'),

    'public' =>$request->input('public'),

    'layout' =>$request->input('layout'),

    'type' =>$request->input('type'),

    'status' => $request-> input('draft'),

    'description'=>$request->input('description'),
]);
$actor = $data['Activity']['WHO']['Actor'];
      $company = $data['Activity']['WHO']['Company'] ;
      $place = $data['Activity']['WHERE']['Place'];
      $date = $data['Activity']['WHEN']['Date'];
      $time = $data['Activity']['WHEN']['Time'];
      $appelation = $data['Activity']['WHAT']['Appelation'] ;
      $description = $data['Activity']['WHAT']['Description'];
      $technique = $data['Activity']['HOW']['Modality']['Technique'] ;
      $automation = $data['Activity']['HOW']['Modality']['Protocol']['Automation']  ;
      $acquisitiontype = $data['Activity']['HOW']['Modality']['Protocol']['Detail']['AcquisitionType']  ;
      $lpfilename = $data['Activity']['HOW']['Modality']['Protocol']['Detail']['LPFilename'] ;
      $domediameterinmm = $data['Activity']['HOW']['Modality']['Protocol']['Detail']['DomeDiameterinmm']  ;
      $type = $data['Activity']['WHICH']['Camera']['Type'] ;
      $model = $data['Activity']['WHICH']['Camera']['Model'];
      $focal = $data['Activity']['WHICH']['Camera']['Focal'];
      $iso = $data['Activity']['WHICH']['Camera']['Iso'];
      $aperture = $data['Activity']['WHICH']['Camera']['Aperture'];
      $whitebalance = $data['Activity']['WHICH']['Camera']['Whitebalance'];
      $shutterspeed = $data['Activity']['WHICH']['Camera']['Shutterspeed'];
      $sourcetype = $data['Activity']['WHICH']['Light']['SourceType'];
      $number = $data['Activity']['WHICH']['Light']['Number'];
      $natural = $data['Activity']['WHICH']['Light']['Naturel'];
      $project = $data['Activity']['WHY']['Project'];
      //$dom = $data['Activity']['dom'];
      //insert into mysql table
       $sql = $con->prepare("INSERT INTO metadata( id_metadata, actor, company,  place, date, time, appelation, description, technique, automation, acquisitiontype, lpfilename, domediameterinmm,
      type, model, focal, iso, aperture,whitebalance, shutterspeed, sourcetype, number, naturel,
      project)
      VALUES( '$id','$actor', '$company',  '$place', '$date', '$time', '$appelation',
      '$description', '$technique', '$automation', '$acquisitiontype', '$lpfilename',
      '$domediameterinmm','$type', '$model', '$focal', '$iso', '$aperture',
      '$whitebalance', '$shutterspeed', '$sourcetype', '$number', '$natural','$project')");

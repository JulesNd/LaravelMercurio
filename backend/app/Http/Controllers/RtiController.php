<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Rti;
use Illuminate\Support\Collection;


class RtiController extends Controller
{
  public function getRti() {
    return response()->json(Rti::all(), 200);
  }

/** TEST **/
  public function getUserRti() {
    $userId = Auth::id();
  // A NE PAS FAIRE :   $userrti = Employee::select('owner_id','name')->where('owner_id',$userId)->get();
$userrti = Rti::where('owner_id',$userId)->get()->toArray();
  return response($userrti);

    }
/** TEST **/


  public function getRtiById($rti_id) {
      $rti = Rti::find($rti_id);
      if(is_null($rti)) {
        return response()->json(['message' => 'Not found'],404);
      }
      return response()->json($rti::find($rti_id), 200);
  }

  public function addRti(Request $request) {
    $rti = Rti::create($request->all());
    return response($rti, 201);
  }


  public function updateRti(Request $request, $rti_id) {
    $rti = Rti::find($rti_id);
    if(is_null($rti)) {
        return response()->json(['message' => 'Rti Not Found'], 404);
    }
    $rti->update($request->all());
    return response($rti, 200);
}

public function delete(Request $request, $id) {
    $rti = Rti::find($id);
    if(is_null($rti)) {
        return response()->json(['message' => 'Rti Not Found'], 404);
    }
    $Rti->delete();
    return response()->json(null, 204);
}

}

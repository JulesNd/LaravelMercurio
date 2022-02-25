<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Collection;

class EmployeeController extends Controller
{
    public function getEmployee() {
      return response()->json(Employee::all(), 200);
    }

/** TEST **/
    public function getUserEmployee() {
      $userId = Auth::id();
    // A NE PAS FAIRE :   $useremployee = Employee::select('owner_id','name')->where('owner_id',$userId)->modelKeys();
  $useremployee = Employee::where('owner_id',$userId)->get()->toArray();
    return response($useremployee);

      }
/** TEST **/


    public function getEmployeeById($id) {
        $employee = Employee::find($id);
        if(is_null($employee)) {
          return response()->json(['message' => 'Not found'],404);
        }
        return response()->json($employee::find($id), 200);
    }

    public function addEmployee(Request $request) {
      $employee = Employee::create($request->all());
      return response($employee, 201);
    }


    public function updateEmployee(Request $request, $id) {
      $employee = Employee::find($id);
      if(is_null($employee)) {
          return response()->json(['message' => 'Employee Not Found'], 404);
      }
      $employee->update($request->all());
      return response($employee, 200);
  }

  public function deleteEmployee(Request $request, $id) {
      $employee = Employee::find($id);
      if(is_null($employee)) {
          return response()->json(['message' => 'Employee Not Found'], 404);
      }
      $employee->delete();
      return response()->json(null, 204);
  }



}

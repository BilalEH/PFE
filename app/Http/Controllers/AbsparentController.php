<?php

namespace App\Http\Controllers;

use App\Http\Resources\ParentResource;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\StudentResource;
use App\Models\Absparent;
use App\Models\Student;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AbsparentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parents = Absparent::where('status', 1)->get();
        return response()->json(['parents' => ParentResource::collection($parents)], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id' => 'required|exists:users,id|unique:absparents,user_id',
            ]);
            $UserData = User::find($request->user_id);
            if ($UserData->role == 'parent') {
                $parent = Absparent::create($data);
                return response()->json(['absparent' => new ParentResource($parent)], 201);
            }
            return response()->json(['message' => 'User is not parent'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'firstName' => ['nullable', 'string', 'max:255'],
            'lastName' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'regex:/(^0)[0-9]{9}$/', 'min:10', 'max:10'],
            'password' => ['nullable', 'string', 'min:8'],
            'cin' => ['nullable', 'string'],
        ]);
        try {
            $parent = Absparent::findOrFail($id);
            $user = User::findOrFail($parent->user_id);
            if ($data['password']) {
                $data['password'] = Hash::make($request->password);
            } else {
                $data['password'] = $user->password;
            }
            $user->update($data);
            return response()->json(['parent' => new ParentResource($parent)], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }


    public function destroy($id)
    {
        try {
            $parent = Absparent::findOrFail($id);
            $user = User::find($parent->user_id);
            $user->delete();
            $parent->delete();
            return response()->json($parent, 204);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
    public function restore($id)
    {
        try {
            $parent = Absparent::withTrashed()->findOrFail($id);
            if (!$parent->trashed()) {
                return response()->json(['message' => 'parent is not deleted'], 400);
            };
            $parent->restore();
            return response()->json(['parent' => $parent], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
    public function deleted()
    {
        try {
            $parents = Absparent::onlyTrashed()->get();
            return response()->json(['parentsDeleted' => $parents], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function HisChildrensList($id)
    {
        try {
            $par = Absparent::where('user_id', $id)->first();
            if ($par) {
                $childrens = $par->childrens;

                return response()->json(['childrens' => StudentResource::collection($childrens)], 200);
            } else {
                return response()->json(['message' => 'parent not found'], 404);
            }
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
    public function AddStduentsToParent(Request $request, $id)
    {
        $data = $request->validate([
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['required', 'string', 'regex:/(^0)[0-9]{9}$/', 'min:10', 'max:10'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        try {
            $data['password'] = Hash::make($request->password);
            $data['avatar'] = "https://ui-avatars.com/api/?uppercase=false&name=$request->first_name+$request->last_name&background=04F17A&color=19647E";
            $data['role'] = 'student';
            $user = User::create($data);
            $par = Absparent::where('user_id', $id)->first();
            $stu = Student::create(['user_id' => $user->id, 'dateN' => now(), 'absparent_id' => $par->id]);
            return response()->json(['student' => new StudentResource($stu)], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function GetPaymentListOfParent(string $id){
        $parent=Absparent::where('user_id',$id)->first();
        if($parent->childrens()->exists()){
            $payData=[];
            foreach($parent->childrens as $stu){
                if($stu->payments()->exists()){
                    $payData[]=['payments'=> PaymentResource::collection($stu->payments->sortBy('datePay'))];
                }
            }
            return response()->json(['childrens' => $payData], 200);
        }else{
            return response()->json(['message'=>'insert your students'], 404);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClasseResource;
use App\Http\Resources\StudentClasses;
use App\Http\Resources\TeacherResource;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User; // Import the User model
use Illuminate\Http\Request;

class TeacherController extends Controller
{


    public function GetClassesStu(string $id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        return response()->json(['classes' => StudentClasses::collection($student->classes)], 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::all();
        return response()->json(['teachers' => TeacherResource::collection($teachers)], 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'cin' => 'required|string|max:255|unique:users',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);
        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'role' => 'teacher',
            'cin' => $request->cin,
            'avatar' => "https://ui-avatars.com/api/?uppercase=false&name=$request->firstName+$request->lastName&background=19647E&color=FFFDFD",
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
        ]);
        $teacher = Teacher::create([
            'user_id' => $user->id,
        ]);
        return response()->json(['teacher' => new TeacherResource($teacher)], 201);
    }
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'firstName' => 'nullable|string|max:255',
            'lastName' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'cin' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        $teacher = Teacher::findOrFail($id);
        $user = User::find($teacher->user_id);
        if ($data['password'] == '') {
            $data['password'] = $user->password;
        } else {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        return response()->json(['teacher' => new TeacherResource($teacher)], 200);
    }

    public function destroy(string $id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->user->delete();
        $teacher->delete();
        return response()->json(['message' => 'Teacher deleted successfully'], 200);
    }

    public function GetTeacherClasses(string $id)
    {
        $teacher = Teacher::find($id);
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }
        return response()->json(['classes' => ClasseResource::collection($teacher->classes)], 200);
    }
}

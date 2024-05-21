<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeacherResource;
use App\Models\Teacher;
use App\Models\User; // Import the User model
use Illuminate\Http\Request;

class TeacherController extends Controller
{
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
        $request->validate([
            'firstName' => 'string|max:255',
            'lastName' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users',
            'cin' => 'string|max:255|unique:users',
            'phone' => 'string|max:255',
            'password' => 'string|min:8',
        ]);

        $teacher = Teacher::findOrFail($id);
        $user = User::where('id', $teacher->user_id)->first()->update([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'cin' => $request->cin,
            'avatar' => "https://ui-avatars.com/api/?uppercase=false&name=$request->firstName+$request->lastName&background=19647E&color=FFFDFD",
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
        ]);
        return response()->json(['teacher' => new TeacherResource($teacher)], 200);
    }

    public function destroy(string $id)
    {
        $teacher = Teacher::findOrFail($id);

        $teacher->user->delete();

        $teacher->delete();

        return response()->json(['message' => 'Teacher deleted successfully'], 200);
    }
}

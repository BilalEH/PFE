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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate request data
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'cin' => 'required|string|max:255|unique:users',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Create a new user with role teacher
        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'role' => 'teacher',
            'cin' => $request->cin,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
        ]);

        // Create a new teacher associated with the user
        $teacher = Teacher::create([
            'user_id' => $user->id,
            // Add other teacher fields here if needed
        ]);

        return response()->json(['teacher' => new TeacherResource($teacher)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

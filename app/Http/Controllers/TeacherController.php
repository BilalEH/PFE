<?php

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    // Other methods...

    /**
     * Store a newly created teacher in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string',
            'password' => 'required|min:8', // Minimum 8 characters for password
        ]);

        // Create a new user with role 'teacher'
        $user = User::create([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'role' => 'teacher', // Set the role to 'teacher'
            'phone' => $request->input('phone'),
            'password' => Hash::make($request->input('password')), // Hash the password
        ]);

        // Create a new teacher associated with the user
        $teacher = Teacher::create([
            'user_id' => $user->id,
            'specialite' => $request->input('specialty'),
        ]);

        return response()->json(['message' => 'Teacher created successfully', 'teacher' => $teacher], 201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Display a listing of the teachers.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teachers = Teacher::all();

        return response()->json($teachers, 200);
    }

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
            'user_id' => 'required|integer',
            'specialite' => 'required|string',
        ]);

        // Create a new teacher instance
        $teacher = Teacher::create([
            'user_id' => $request->user_id,
            'specialite' => $request->specialite,
        ]);

        // Return the created teacher as JSON response
        return response()->json($teacher, 201);
    }

    /**
     * Display the specified teacher.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Find the teacher by id
        $teacher = Teacher::findOrFail($id);

        // Return the teacher as JSON response
        return response()->json($teacher, 200);
    }

    /**
     * Update the specified teacher in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'user_id' => 'required|integer',
            'specialite' => 'required|string',
        ]);

        $teacher = Teacher::findOrFail($id);

        $teacher->update([
            'user_id' => $request->user_id,
            'specialite' => $request->specialite,
        ]);

        return response()->json($teacher, 200);
    }

    /**
     * Remove the specified teacher from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Teacher::findOrFail($id)->delete();

        return response()->json(['message' => 'Teacher deleted successfully'], 200);
    }
}

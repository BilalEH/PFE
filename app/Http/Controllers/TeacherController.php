<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeacherResource;
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
        return response()->json(['teachers' => TeacherResource::collection($teachers)], 200);
    }


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

    public function destroy($id)
    {
        Teacher::findOrFail($id)->delete();

        return response()->json(['message' => 'Teacher deleted successfully'], 200);
    }
}

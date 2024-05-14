<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::all();
        return response()->json(['courses' => CourseResource::collection($courses)], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'filiere_id' => 'required|integer',
            'courseName' => 'required|string',
            'description' => 'string|nullable',
            'niveau' => 'string|nullable',
            'amount' => 'numeric|nullable',
        ]);

        $course = Course::create($request->all());
        return response()->json($course, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'filiere_id' => 'integer',
            'courseName' => 'string',
            'description' => 'string|nullable',
            'niveau' => 'string|nullable',
            'amount' => 'numeric|nullable',
        ]);

        $course = Course::findOrFail($id);
        $course->update($request->all());
        return response()->json($course, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\CouresRequeres;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;

class CourseController extends Controller
{

    public function index()
    {
        $courses = Course::all();
        return response()->json(['courses' => CourseResource::collection($courses)], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'courseName' => 'required|string|unique:courses,courseName',
            'description' => 'required|string',
            'niveau' => 'required|string',
            'amount' => 'required|numeric|min:1',
        ]);
        $course = Course::create($data);
        return response()->json(['course' => CourseResource::make($course)], 201);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course, 200);
    }


    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'courseName' => 'required|string|unique:courses,courseName',
            'description' => 'required|string',
            'niveau' => 'required|string',
            'amount' => 'required|numeric|min:1',
        ]);
        Course::findOrFail($id)->update($data);
        return response()->json(['course_id' => $id], 200);
    }


    public function destroy($id)
    {
        $course = Course::findOrFail($id)->delete();
        return response()->json(['course_id' => $id], 204);
    }

    public function AddJoinRequest(string $id, Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
        ]);
        try {
            $course = Course::findOrFail($id);
            $course->requests()->attach($request->student_id, ['student_id' => $request->student_id]);
            return response()->json(CouresRequeres::collection($course->requests), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function RemoveJoinRequest(string $id, Request $request)
    {
        $request->validate([
            "student_id" => "required|exists:students,id",
        ]);
        try {
            $course = Course::findOrFail($id);
            $course->requests()->detach($request->student_id);
            return response()->json(CouresRequeres::collection($course->requests), 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Course not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}

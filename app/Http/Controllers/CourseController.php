<?php

namespace App\Http\Controllers;

use App\Http\Resources\CouresRequeres;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Student;
use App\Models\User;
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
        try {
            $course = Course::findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $data = $request->validate([
            'courseName' => 'string',
            'description' => 'string',
            'niveau' => 'string',
            'amount' => 'numeric|min:1',
        ]);

        $course->update($data);
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
            'student_id' => 'required',
        ]);
        try {
            $course = Course::findOrFail($id);
            $StuTest = Student::find($request->student_id);
            if ($StuTest) {
                if ($course->requests()->where('student_id', $request->student_id)->exists()) {
                    return response()->json(['message' => 'Request already sent'], 400);
                } else {
                    $course->requests()->attach($request->student_id);
                }
            } else {
                $Stu = Student::where('user_id', $request->student_id)->first();
                if ($course->requests()->where('student_id', $Stu->id)->exists()) {
                    return response()->json(['message' => 'Request already sent'], 400);
                } else {
                    $course->requests()->attach($Stu->id);
                }
            }
            return response()->json(['message' => 'Request sent successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function RemoveJoinRequest(string $id, Request $request)
    {
        $request->validate([
            "student_id" => "required",
        ]);
        try {
            $course = Course::findOrFail($id);
            $StuTest = Student::findOrFail($request->student_id);
            if ($StuTest) {
                $course->requests()->detach($request->student_id);
            } else {
                $Stu = Student::where('user_id', $request->student_id)->first();
                $course->requests()->detach($Stu->id);
            }
            return response()->json(['message' => 'Request removed successfully'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }

    public function RequestsList()
    {
        try {
            $res = [];
            $courses = Course::with('requests')->get();
            foreach ($courses as $course) {
                if ($course->requests->isNotEmpty()) {
                    $res[] = CouresRequeres::collection($course->requests);
                }
            }
            return response()->json($res, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }
    
}

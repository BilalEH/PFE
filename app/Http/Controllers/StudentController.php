<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentClasses;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::where('status', 1)->get();
        return response()->json(['students' => StudentResource::collection($students)], 200);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id' => 'required|exists:users,id|unique:students,user_id',
                'dateN' => 'required|date',
                'status' => 'boolean|nullable',
                'absparent_id' => 'required|exists:absparents,id|unique:students,absparent_id',
            ]);
            $userData = User::find($request->user_id);
            if ($userData) {
                if ($userData->role === 'student') {
                    $student = Student::create($data);
                    return response()->json(StudentResource::make($student), 201);
                }
            }
            return response()->json(['message' => 'User is not student'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function show($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        return response()->json(['student' => new StudentResource($student)], 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'firstName' => 'string|max:255',
            'lastName' => 'string|max:255',
            'dateN' => 'date',
            'cin' => 'nullable|string|max:8',
            'password' => 'nullable|string|min:8|max:255',
            'phone' => 'string|regex:/(^0)[0-9]{9}$/|min:10|max:10',
            'email' => 'email'
        ]);
        try {
            $student = Student::findOrFail($id);
            $user = User::find($student->user_id);
            if ($data['password']) {
                $data['password'] = bcrypt($data['password']);
            } else {
                $data['password'] = $user->password;
            };
            if (!$data['cin']) {
                $data['cin'] = $user->cin;
            };
            $user->update($data);
            $student->update($data);
            return response()->json(['student' => new StudentResource($student)], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        };
    }

    public function destroy($id)
    {
        try {
            $student = Student::find($id);
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            User::destroy($student->user_id);
            $student->delete();
            return response()->json(['message' => 'Student deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function restore($id)
    {
        try {
            $Student = Student::withTrashed()->findOrFail($id);
            if (!$Student->trashed()) {
                return response()->json(['message' => 'Student is not deleted'], 400);
            };
            $Student->restore();
            return response()->json(['Student' => $Student], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
    public function deleted()
    {
        try {
            $Students = Student::onlyTrashed()->get();
            return response()->json(['Students' => $Students], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function GetClassesStu(string $id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        return response()->json(['classes' => StudentClasses::collection($student->classes)], 200);
    }
}

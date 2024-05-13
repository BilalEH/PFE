<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Student;
<<<<<<< HEAD
use Illuminate\Database\Eloquent\Collection;
=======
use App\Models\User;
>>>>>>> 7524e2cc180fadded67769c77c433cd554abadfb
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
<<<<<<< HEAD
        // $students = Student::all();
        // return response()->json($students, 200);
        return  Student::Collection(Student::all());

=======
        $students = Student::all();
        return response()->json(['students' => StudentResource::collection($students)], 200);
>>>>>>> 7524e2cc180fadded67769c77c433cd554abadfb
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
        try {
            $data = $request->validate([
                'user_id' => 'required|exists:users,id|integer',
                'phone' => 'string|regex:/(^0)[0-9]{9}$/|min:10|max:10',
                'email' => 'email|unique:users,email'
            ]);
            $userData = User::find($request->user_id);
            if ($userData) {
                if ($userData->role === 'student') {
                    $student = Student::find($id);
                    if (!$student) {
                        return response()->json(['message' => 'Student not found'], 404);
                    }
                    $student->update($data);
                    return response()->json($student, 200);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }

        // $student = Student::find($id);
        // if (!$student) {
        //     return response()->json(['message' => 'Student not found'], 404);
        // }
        // $student->update($data);
        // return response()->json($student, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $student->delete();
        return response()->json(['message' => 'Student deleted successfully'], 200);
    }
}

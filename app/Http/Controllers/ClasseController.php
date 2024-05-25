<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClasseResource;
use App\Http\Resources\StudentResource;
use App\Models\Classe;
use App\Models\Course;
use App\Models\Payment;
use App\Models\Student;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    public function index()
    {
        try {
            $classes = Classe::all();
            return response()->json(['classes' => ClasseResource::collection($classes)], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 404);
        }
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'className' => 'required|unique:classes,className|string',
            'course_id' => 'required|exists:courses,id|integer',
            'teacher_id' => 'required|exists:teachers,id|integer',
        ]);
        $classe = Classe::create($data);
        return response()->json(['classe' => new ClasseResource($classe)], 201);
    }

    public function show(string $id)
    {
        try {
            $classe = Classe::findOrFail($id);
            return response()->json($classe, 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Classe not found"], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $data=$request->validate([
            'className' => 'string',
            'course_id' => 'exists:courses,id',
            'teacher_id' => 'exists:teachers,id',
        ]);
        try{
            $classe = Classe::findOrFail($id);
            $classe->update($data);
            return response()->json(['class' => new ClasseResource($classe)], 200);
        }catch(Exception $e){
            return response()->json(["message" => $e->getMessage()], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $classe = Classe::findOrFail($id);
            $classe->delete();
            return response()->json(['message' => 'Classe deleted successfully'], 204);
        }catch(Exception $e){
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function Remove_student_In_Classe(Request $request, String $id)
    {
        $request->validate([
            'student_id' => ['required'],
        ]);
        $stu = Student::find($request->id);
        if ($stu) {
            Classe::find($id)->students()->detach($request->student_id);
        } else {
            $user = User::find($request->student_id);
            if ($user) {
                $stu = Student::where('user_id', $user->id)->first();
                Classe::find($id)->students()->detach($stu->id);
            } else {
                return response()->json(['message' => 'Student not found'], 404);
            }
        }
        return response()->json(['message' => 'Student removed successfully']);
    }

    public function Add_student_In_Classe(Request $request, String $id)
    {
        $request->validate([
            'student_id' => ['required', 'exists:students,id'],
        ]);
        $classe = Classe::findOrFail($id);
        $studentId = $request->student_id;
        if ($classe->students()->where('student_id', $studentId)->exists()) {
            return response()->json(['message' => 'Student already added'], 400);
        }
        $classe->students()->attach($studentId, ['dateJoin' => date('Y-m-d H:i:s')]);
        $course = $classe->course;
        $course->requests()->detach($studentId);

        $paymentData = [
            'student_id' => $studentId,
            'course_id' => $course->id,
            'datePay' => date('Y-m-d H:i:s'),
        ];

        Payment::create($paymentData);

        return response()->json(['message' => 'Student added successfully']);
    }

    public function Class_students_List(string $id)
    {
        try {
            $classe = Classe::findOrFail($id);
            if ($classe && $classe->students) {
                return response()->json(['students' => StudentResource::collection($classe->students)], 200);
            }
            return response()->json(['message' => 'Students not found'], 404);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Classe not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function GetClassesByCourse(string $id)
    {
        $Course = Course::find($id);
        if ($Course) {
            $clsses = Classe::where('course_id', $id)->get();
            if (count($clsses) > 0) {
                return response()->json(['classes' => ClasseResource::collection($clsses)], 200);
            } else {
                return response()->json(['message' => 'does not have classes in this course'], 404);
            }
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }
}

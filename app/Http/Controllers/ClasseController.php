<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClasseResource;
use App\Http\Resources\StudentResource;
use App\Models\Classe;
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
        $classe = Classe::findOrFail($id);

        $request->validate([
            'className' => 'required|unique:classes,className',
            'course_id' => 'required|exists:courses,id',
            'filiere_id' => 'required|exists:filieres,id',
            'teacher_id' => 'required|exists:teachers,id',
        ]);

        $classe->update($request->all());
        return response()->json($classe, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $classe = Classe::findOrFail($id);
        $classe->delete();

        return response()->json(null, 204);
    }

    public function Remove_student_In_Classe(Request $request, String $id)
    {
        $request->validate([
            'student_id' => ['required', 'exists:students,id'],
        ]);
        Classe::find($id)->students()->detach($request->student_id);
        return response()->json(['message' => 'Student removed successfully']);
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
}

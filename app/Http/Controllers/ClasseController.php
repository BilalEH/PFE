<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Exception;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $classes = Classe::all();
            return response()->json($classes, 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'className' => 'required|unique:classes,className|string',
            'course_id' => 'required|exists:courses,id|integer',
            'filiere_id' => 'required|exists:filieres,id|integer',
            'teacher_id' => 'required|exists:teachers,id|integer',
        ]);
        $classe = Classe::create($data);
        return response()->json($classe, 201);
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
            'className' => 'required',
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
}

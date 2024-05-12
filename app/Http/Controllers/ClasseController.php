<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = Classe::all();
        return response()->json($classes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'className' => 'required',
            'course_id' => 'required|exists:courses,id',
            'filiere_id' => 'required|exists:filieres,id',
            'teacher_id' => 'required|exists:teachers,id',
        ]);

        $classe = Classe::create($request->all());

        return response()->json($classe, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $classe = Classe::findOrFail($id);
        return response()->json($classe, 200);
    }

    /**
     * Update the specified resource in storage.
     */
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

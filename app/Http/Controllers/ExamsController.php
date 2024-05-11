<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exams = Exam::all();
        return response()->json($exams, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'teacher_id' => 'required|exists:teachers,id',
            'course_id' => 'required|exists:courses,id',
            'classe_id' => 'required|exists:classes,id',
            'salle_id' => 'required|exists:salles,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $exam = Exam::create($request->all());
        return response()->json($exam, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $exam = Exam::findOrFail($id);
        return response()->json($exam, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'string',
            'description' => 'string',
            'teacher_id' => 'exists:teachers,id',
            'course_id' => 'exists:courses,id',
            'classe_id' => 'exists:classes,id',
            'salle_id' => 'exists:salles,id',
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
        ]);

        $exam = Exam::findOrFail($id);
        $exam->update($request->all());
        return response()->json($exam, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $exam = Exam::findOrFail($id);
        $exam->delete();
        return response()->json(null, 204);
    }
}

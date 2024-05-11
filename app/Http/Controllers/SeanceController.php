<?php

namespace App\Http\Controllers;

use App\Models\Seance;
use Illuminate\Http\Request;

class SeanceController extends Controller
{
    /**
     * Display a listing of the seances.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all seances
        $seances = Seance::all();

        // Return the seances as JSON response
        return response()->json($seances, 200);
    }

    /**
     * Store a newly created seance in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'classe_id' => 'required|integer',
            'salle_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $seance = Seance::create([
            'title' => $request->title,
            'description' => $request->description,
            'classe_id' => $request->classe_id,
            'salle_id' => $request->salle_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        // Return the created seance as JSON response
        return response()->json($seance, 201);
    }

    /**
     * Display the specified seance.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $seance = Seance::findOrFail($id);

        return response()->json($seance, 200);
    }

}


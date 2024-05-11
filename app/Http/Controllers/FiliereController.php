<?php

namespace App\Http\Controllers;

use App\Models\Filiere;
use Illuminate\Http\Request;

class FiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filieres = Filiere::all();
        return response()->json($filieres, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nomFiliere' => 'required|string',
        ]);

        $filiere = Filiere::create($request->all());
        return response()->json($filiere, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $filiere = Filiere::findOrFail($id);
        return response()->json($filiere, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nomFiliere' => 'string',
        ]);

        $filiere = Filiere::findOrFail($id);
        $filiere->update($request->all());
        return response()->json($filiere, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $filiere = Filiere::findOrFail($id);
        $filiere->delete();
        return response()->json(null, 204);
    }
}

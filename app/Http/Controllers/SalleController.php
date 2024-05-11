<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Salle::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nomSalle' => 'required',
            'numSalle' => 'required|unique:Salles',
        ]);

        $salle = Salle::create($request->all());

        return response()->json($salle, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $salle = Salle::find($id);
        if (!$salle) {
            return response()->json(['message' => 'Salle not found'], 404);
        }
        return response()->json($salle, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $salle = Salle::find($id);
        if (!$salle) {
            return response()->json(['message' => 'Salle not found'], 404);
        }

        $request->validate([
            'nomSalle' => 'required',
            'numSalle' => 'required|unique:Salles,numSalle,'.$id,
        ]);

        $salle->update($request->all());

        return response()->json($salle, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $salle = Salle::find($id);
        if (!$salle) {
            return response()->json(['message' => 'Salle not found'], 404);
        }

        $salle->delete();

        return response()->json(['message' => 'Salle deleted successfully'], 200);
    }
}

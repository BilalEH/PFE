<?php

namespace App\Http\Controllers;

use App\Models\Absparent;
use Illuminate\Http\Request;

class AbsparentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $absparents = Absparent::all();
        return response()->json($absparents, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'status' => 'string|nullable',
            'CIN' => 'string|nullable',
            'phone' => 'string|nullable',
            'dateN' => 'date|nullable',
        ]);

        $absparent = Absparent::create($request->all());
        return response()->json($absparent, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $absparent = Absparent::findOrFail($id);
        return response()->json($absparent, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'integer',
            'status' => 'string|nullable',
            'CIN' => 'string|nullable',
            'phone' => 'string|nullable',
            'dateN' => 'date|nullable',
        ]);

        $absparent = Absparent::findOrFail($id);
        $absparent->update($request->all());
        return response()->json($absparent, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $absparent = Absparent::findOrFail($id);
        $absparent->delete();
        return response()->json(null, 204);
    }
}

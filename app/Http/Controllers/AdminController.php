<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $admin = Admin::create($request->all());
        return response()->json($admin, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'integer',
        ]);

        $admin = Admin::findOrFail($id);
        $admin->update($request->all());
        return response()->json($admin, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();
        return response()->json(null, 204);
    }
}

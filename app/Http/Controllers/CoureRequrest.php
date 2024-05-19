<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\CoureRequrest as CoureRequrestModel;
use Illuminate\Http\Request;

class CoureRequrest extends Controller
{
    public function index()
    {
        $requests = CoureRequrestModel::all();
        return response()->json(['requests' => $requests]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'course_id' => 'required',
        ]);
        $request = CoureRequrestModel::create($request->all());
        return response()->json(['request' => $request]);
    }
    public function destroy($id)
    {
        $request = CoureRequrestModel::find($id);
        $request->delete();
        return response()->json(['request' => $request]);
    }

    public function clssesList(string $id)
    {
        $classes = Classe::where('course_id', $id)->get();
        return response()->json(['classes' => $classes]);
    }
}

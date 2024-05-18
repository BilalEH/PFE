<?php

namespace App\Http\Controllers;

use App\Http\Resources\ParentResource;
use App\Http\Resources\StudentResource;
use App\Models\Absparent;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AbsparentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parents = Absparent::where('status', 1)->get();
        return response()->json(['parents' => ParentResource::collection($parents)], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id' => 'required|exists:users,id|unique:absparents,user_id',
            ]);
            $UserData = User::find($request->user_id);
            if ($UserData->role == 'parent') {
                $parent = Absparent::create($data); 
                return response()->json(['absparent' => new ParentResource($parent)], 201);
            }
            return response()->json(['message' => 'User is not parent'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'email' => 'email',
                'phone' => 'regex:/(^0)[0-9]{9}$/|min:10|max:10',
            ]);
            $parent = Absparent::findOrFail($id);
            $UserData = User::find($request->parent->user_id);
            if ($UserData) {
                $UserData->update($data);
                return response()->json($parent, 200);
            };
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $parent = Absparent::findOrFail($id);
            $parent->delete();
            return response()->json($parent, 204);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
    public function restore($id)
    {
        try {
            $parent = Absparent::withTrashed()->findOrFail($id);
            if (!$parent->trashed()) {
                return response()->json(['message' => 'parent is not deleted'], 400);
            };
            $parent->restore();
            return response()->json(['parent' => $parent], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
    public function deleted()
    {
        try {
            $parents = Absparent::onlyTrashed()->get();
            return response()->json(['parentsDeleted' => $parents], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function HisChildrensList($id)
    {
        try {
            $par = Absparent::where('user_id', $id)->first();
            if ($par) {
                $childrens = $par->childrens;
                return response()->json(['childrens' => StudentResource::collection($childrens)], 200);
            } else {
                return response()->json(['message' => 'parent not found'], 404);
            }
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}

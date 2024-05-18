<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdminResource;
use App\Models\absparent;
use App\Models\Admin;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        return response()->json([
            'admins' => AdminResource::collection($admins),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id' => 'required|integer|exists:users,id|unique:admins,user_id',
            ]);
            $userData = User::find($request->user_id);
            if ($userData) {
                if ($userData->role === 'admin') {
                    $admin = Admin::create($data);
                    return response()->json($admin, 201);
                }
            }
            return response()->json(['message' => 'User is not admin'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $admin = Admin::findOrFail($id);
            return response()->json(['admin' => $admin], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Admin not found'], 404);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $admin = Admin::findOrFail($id);
            $admin->delete();
            return response()->json(['admin_id' => $admin], 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Admin not found'], 404);
        }
    }

    public function restore($id)
    {
        try {
            $admin = Admin::withTrashed()->findOrFail($id);
            if (!$admin->trashed()) {
                return response()->json(['message' => 'Admin is not deleted'], 400);
            };
            $admin->restore();
            return response()->json(['admin' => $admin], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
    public function deleted()
    {
        try {
            $admins = Admin::onlyTrashed()->get();
            return response()->json(['admins' => $admins], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function acceptUser(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        } else {
            switch ($user->role) {
                case 'admin':
                    $admin = Admin::where('user_id', $user->id)->first();
                    $admin->update(['status' => 1]);
                    break;
                case 'student':
                    $student = Student::where('user_id', $user->id)->first();
                    $student->update(['status' => 1]);
                    break;
                case 'parent':
                    $absParent = absparent::where('user_id', $user->id)->first();
                    $absParent->update(['status' => 1]);
                    break;
            }
            return response()->json(['message' => 'User accepted'], 200);
        }
    }


    public function Requests()
    {
        $students = Student::where('status', 0)->get();
        $parents = absparent::where('status', 0)->get();

        return response()->json([
            'students' => AdminResource::collection($students),
            'parents' => AdminResource::collection($parents),
        ], 200);
    }
}

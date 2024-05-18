<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\absparent;
use App\Models\Student;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', 'string'],
            'cin' => ['required', 'string', 'unique:users,cin'],
            'phone' => ['required', 'string', 'regex:/(^0)[0-9]{9}$/', 'min:10', 'max:10'],
            'password' => ['required', 'string', Rules\Password::defaults()],
        ]);
        $style_admin = ['bg' => 'FFD700', 'color' => '122620'];
        $style_student = ['bg' => '04F17A', 'color' => '19647E'];
        $style_teacher = ['bg' => '19647E', 'color' => 'FFFDFD'];
        $style_parent = ['bg' => 'ff4500', 'color' => 'FFFDFD'];
        $selectedStyle = [];
        if ($request->role == 'admin') {
            $selectedStyle = $style_admin;
        } else if ($request->role == 'student') {
            $selectedStyle = $style_student;
        } else if ($request->role == 'teacher') {
            $selectedStyle = $style_teacher;
        } else {
            $selectedStyle = $style_parent;
        };
        $avatar = "https://ui-avatars.com/api/?uppercase=false&name=$request->first_name+$request->last_name&background=$selectedStyle[bg]&color=$selectedStyle[color]";
        $user = User::create([
            'firstName' => $request->first_name,
            'lastName' => $request->last_name,
            'email' => $request->email,
            'role' => $request->role,
            'cin' => $request->cin,
            'phone' => $request->phone,
            'avatar' => $avatar,
            'password' => Hash::make($request->password),
        ]);
        if ($request->role == 'student') {
            Student::create([
                'user_id' => $user->id,
                'dateN' => $request->dateN
            ]);
        } else if ($request->role == 'teacher') {
            Student::create([
                'user_id' => $user->id,
                'dateN' => $request->dateN
            ]);
        } else if ($request->role == 'admin') {
            Student::create([
                'user_id' => $user->id,
            ]);
        } else {
            absparent::create([
                'user_id' => $user->id,
            ]);
        };
        event(new Registered($user));
        Auth::login($user);
        return response()->noContent();
    }
}

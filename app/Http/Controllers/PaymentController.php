<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;

class PaymentController extends Controller
{

    public function index()
    {
        $payments = Payment::get();
        return response()->json(['payments' => PaymentResource::collection($payments)], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'student_id' => 'required|exists:students,id',
        ]);
        $data['datePay'] = date('Y-m-d H:i:s');
        $Newpayment = Payment::create($data);
        return response()->json($Newpayment, 201);
    }

    public function PayListByStudent($id)
    {
        $stuT1 = Student::find($id);
        if ($stuT1) {
            $payments = Payment::where('student_id', $id)->get();
        } else {
            $stuT2 = User::find($id);
            if ($stuT2) {
                $stu = Student::where('user_id', $id)->first();
                $payments = Payment::where('student_id', $stu->id)->get();
            } else {
                return response()->json(['message' => 'Student not found'], 404);
            }
        }
        return response()->json(['payments' => PaymentResource::collection($payments)], 200);
    }
}

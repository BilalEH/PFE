<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Models\Payment;
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
}

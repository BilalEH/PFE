<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all payments
        $payments = Payment::all();

        // Return JSON response with the payments
        return response()->json($payments, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'absparent_id' => 'required',
            'amount' => 'required',
            'status' => 'required',
            'course_id' => 'required',
            'student_id' => 'required',
        ]);

        // Create a new payment instance
        $payment = Payment::create($validatedData);

        // Return JSON response with the created payment and status code 201 (Created)
        return response()->json($payment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Retrieve the payment by its ID
        $payment = Payment::findOrFail($id);

        // Return JSON response with the payment
        return response()->json($payment, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'absparent_id' => 'required',
            'amount' => 'required',
            'status' => 'required',
            'course_id' => 'required',
            'student_id' => 'required',
        ]);

        // Find the payment by its ID and update its attributes
        $payment = Payment::findOrFail($id);
        $payment->update($validatedData);

        // Return JSON response with the updated payment
        return response()->json($payment, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the payment by its ID and delete it
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(['message' => 'Payment deleted successfully'], 200);
    }
}

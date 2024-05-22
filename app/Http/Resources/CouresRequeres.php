<?php

namespace App\Http\Resources;

use App\Models\absparent;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouresRequeres extends JsonResource
{

    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['pivot']['student_id'] = StudentResource::make(Student::find($data['pivot']['student_id']));
        // $newDataStr = [
        //     'student' => StudentResource::make(Student::find($data['pivot']['student_id'])),
        //     'course_id' => $data['id'],
        //     'courseName' => $data['courseName'],
        //     'description'=>$data['description'],
        //     'niveau'=>$data['niveau'],
        //     'amount'=>$data['amount'],
        // ];
        return $data;
    }
}

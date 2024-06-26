<?php

namespace App\Http\Resources;

use App\Models\Course;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouresRequeres extends JsonResource
{

    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['pivot']['course_id'] = Course::find($data['pivot']['course_id']);
        $data['pivot']['student_id'] = StudentResource::make(Student::find($data['pivot']['student_id']));
        return $data;
    }
}

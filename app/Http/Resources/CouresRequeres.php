<?php

namespace App\Http\Resources;

use App\Models\absparent;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

// class CouresRequeres extends JsonResource
// {

//     public function toArray(Request $request): array
//     {
//         $data = [];
//         $data['course'] = $this;
//         $Cdata = [];
//         foreach ($this->requests as $student) {
//             $testTab = [];
//             $studentD = Student::findOrFail($student->pivot->student_id);
//             $user = User::findOrFail($studentD->user_id);
//             $parent = absparent::find($studentD->parent_id);
//             if ($parent) {
//                 $data['parent'] = $parent;
//             }
//             return $testTab[] = [
//                 'user' => $user,
//                 'student' => $studentD,
//                 'pivot' => $student->pivot,
//             ];
//         }
//         $data['dataCourse'] = $Cdata;
//         return $data;
//     }
// }

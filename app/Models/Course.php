<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'courseName',
        'description',
        'niveau',
        'amount', 'created_at',
    ];
    protected $hidden = [

        'updated_at',
        'deleted_at',
    ];

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function requests()
    {
        return $this->belongsToMany(Student::class, 'coure_requrests')->withPivot('course_id', 'student_id', 'created_at');
    }
}

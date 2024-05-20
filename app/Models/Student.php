<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'dateN',
        'absparent_id',
        'status',
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function parent()
    {
        return $this->belongsTo(absparent::class, 'absparent_id', 'id');
    }
    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'student_classes')->withPivot('dateJoin');
    }
    public function requests()
    {
        return $this->belongsToMany(Course::class, 'coure_requrests')->withPivot('course_id', 'student_id', 'created_at');
    }
}

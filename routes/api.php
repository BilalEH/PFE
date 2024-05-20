<?php

use App\Http\Controllers\AbsparentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get("/", function () {
    return "API";
});
Route::middleware('auth:sanctum')->get('/user', function () {
    return response(Auth::user(), 200);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    // -------------------------Admins----------------------------------------------
    Route::apiResource("/admins", AdminController::class);
    Route::put("/admins/restore/{id}", [AdminController::class, 'restore']);
    Route::get('admin/deleted', [AdminController::class, "deleted"]);
    Route::get('admin/acceptuser/{id}', [AdminController::class, "acceptUser"]);
    Route::get('admin/requests', [AdminController::class, "Requests"]);
    // -------------------------Students----------------------------------------------
    Route::apiResource("/studients", StudentController::class);
    Route::put("/studients/restore/{id}", [StudentController::class, 'restore']);
    Route::get("/studients/getClasses/{id}", [StudentController::class, 'GetClassesStu']);
    Route::get('studient/deleted', [StudentController::class, "deleted"]);
    // ------------------------------teachers----------------------------------------------


        Route::apiResource("/teachers", TeacherController::class);
        //
    // ------------------------------parents----------------------------------------------
    Route::apiResource("/parents", AbsparentController::class);
    Route::put("/parents/restore/{id}", [AbsparentController::class, 'restore']);
    Route::get('parent/deleted', [AbsparentController::class, "deleted"]);
    Route::get('parent/childrens/{id}', [AbsparentController::class, "HisChildrensList"]);
    // ------------------------------courses----------------------------------------------
    Route::apiResource("/courses", CourseController::class);
    // --------------------------------Messages--------------------------------------------
    Route::apiResource("/messages", MessageController::class);
    Route::get("/messages/usermessages/{id}", [MessageController::class, 'getUserMessages']);
    // --------------------------------Classes--------------------------------------------
    Route::apiResource("/classes", ClasseController::class);
    Route::post("/classes/removestudent/{id}", [ClasseController::class, 'Remove_student_In_Classe']);
});

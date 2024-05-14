<?php

use App\Http\Controllers\AbsparentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

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
    // -------------------------Students----------------------------------------------
    Route::apiResource("/studients", StudentController::class);
    Route::put("/studients/restore/{id}", [StudentController::class, 'restore']);
    Route::get('studient/deleted', [StudentController::class, "deleted"]);
    // ------------------------------teachers----------------------------------------------
    Route::apiResource("/teachers", TeacherController::class);

    // ------------------------------parents----------------------------------------------
    Route::apiResource("/parents", AbsparentController::class);
    Route::put("/parents/restore/{id}", [AbsparentController::class, 'restore']);
    Route::get('parent/deleted', [AbsparentController::class, "deleted"]);
    // ------------------------------courses----------------------------------------------
    Route::apiResource("/courses", CourseController::class);
});

<?php

use App\Http\Controllers\HistoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpotifyAPI;
use App\Models\History;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('storage/{filename}', function ($filename)
{
    $path = storage_path('app/public/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
})->name('storage');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/history/all', [HistoryController::class, 'index'])->name('history.index');
    Route::post('/history', [HistoryController::class, 'store'])->name('history.store');
    Route::get('/history/mood/{mood}', [HistoryController::class, 'getByMood'])->name('history.mood');
    Route::delete('/history/{history}', [HistoryController::class, 'destroy'])->name('history.destroy');

    Route::get('/favorite/all', [FavoriteController::class, 'index'])->name('favorite.index');
    Route::post('/favorite', [FavoriteController::class, 'store'])->name('favorite.store');
    Route::get('/favorite/mood/{mood}', [FavoriteController::class, 'getByMood'])->name('favorite.mood');
    Route::delete('/favorite/{favorite}', [FavoriteController::class, 'destroy'])->name('favorite.destroy');

    Route::get('/home', [SpotifyAPI::class, 'home'])->name('spotify.home');
    Route::get('/access', [SpotifyAPI::class, 'index'])->name('spotify.access');

    // History route for the frontend page only
    Route::get('/history', function () {
        return Inertia::render('History');
    })->name('history.show');
    Route::get('/favorite', function () {
        return Inertia::render('Favorite');
    })->name('favorite.show');

});

require __DIR__.'/auth.php';

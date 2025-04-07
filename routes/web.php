<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use WorkOS\Laravel\Facades\WorkOS;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/', function () {
    return Inertia::render('Home', [
    'user' => auth()->user() ?? ['name' => 'ゲスト'],
    ]);
});

Route::get('/auth/login', function () {
    $redirectUrl = WorkOS::sso()->getAuthorizationUrl([
        'organization' => env('WORKOS_ORGANIZATION_ID'),
        'redirect_uri' => config('works.redirect_uri'),
        'provider' => 'Google',
    ]);

    return redirect($redirectUrl);
});

Route::get('/auth/callback', function (Request $request) {
    $code = $request->query('code');

    $profileAndToken = WorkOS::sso()->authenticateWithCode($code);

    $workosUser = $profileAndToken->profile;

    // LaravelのUserモデルと紐付ける(なければ作る)
    $user = \App\Models\User::firstOrCreate(
        ['email' => $workosUser->email],
        ['name' => $workosUser->firstName . ' ' . $workosUser->lastName]
    );

    Auth::login($user);

    return redirect('/dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

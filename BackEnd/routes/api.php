<?php

use App\Models\State;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\AuthControllers\AuthController;
use App\Http\Controllers\AuthControllers\SocialAuthController;
use App\Http\Controllers\AuthControllers\ForgetPasswordController;
use App\Http\Controllers\ProfileControllers\ProfileController;
use App\Http\Controllers\ProfileControllers\SkillsController;
use App\Http\Controllers\ProfileControllers\EducationController;
use App\Http\Controllers\ProfileControllers\PortfolioController;
use App\Http\Controllers\JobControllers\JobFeedController;
use App\Http\Controllers\JobControllers\DefJobsController;
use App\Http\Controllers\JobControllers\RegJobsController;
use App\Http\Controllers\JobControllers\FreelancingJobsController;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/company/register', 'CompanyRegister');
    Route::post('/login', 'Login');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', 'Logout');

        Route::get('/auth/email', function () {
            return response()->json([
                "email" => auth()->user()->email,
            ], 200);
        });

        Route::get('/auth/verify', 'SendVerificationEmail');
        Route::get('/verifyEmail', 'VerifyEmail');
        Route::get('/isVerified', 'IsVerified');
        Route::get('/isExpired', 'IsExpired');
        Route::get('/regStep', 'GetRegisterStep');
    });

    Route::get('/countries', function () {
        return Response()->json([
            'countries' => Country::all(),
        ], 200);
    });

    Route::post('/states', function (Request $request) {
        $validated = $request->validate([
            'country_name' => 'required',
        ]);
        $country = Country::where('country_name', $validated['country_name'])->first();

        return Response()->json([
            'states' => State::where('country_id', $country->country_id)->get()->all(),
        ], 200);
    });
});

Route::controller(SocialAuthController::class)->group(function () {
    Route::get('/auth/providers', 'RedirectToProviders');
    Route::get('/auth/{provider}/call-back', 'HandleProviderCallback');
    Route::post('/auth/android/google', 'HandleProviderAndroid');
});

Route::controller(ForgetPasswordController::class)->group(function () {
    Route::post('/password/reset-link', 'ForgotPassword');
    Route::post('/password/reset', 'ResetPassword')->middleware('auth:api');
});

Route::controller(ProfileController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/profile', 'ShowProfile');
        Route::get('/profile/wallet', 'GetWallet');
        Route::post('/profile/edit', 'EditProfile');
        Route::post('/profile/photo', 'EditProfilePhoto');
        Route::Delete('/profile/photo', 'DeleteProfilePhoto');
        Route::post('/profile/description', 'EditDescription');

        Route::get('/profile/{userId}/{userName}', 'GetUserProfile');
    });
});

Route::controller(SkillsController::class)->group(function () {
    Route::get('/skills', 'GetSkills');
    Route::get('/skills/types', 'GetSkillTypes');
    Route::middleware('auth:api')->group(function () {
        Route::get('/user/skills', 'GetUserSkills');
        Route::post('/user/skills/add', 'AddUserSkills');
        Route::post('/user/skills/edit', 'EditUserSkills');

        Route::post('/skills', 'AddSkill');
        Route::post('/skills/{skill}', 'EditSkill');
        Route::delete('/skills/{skill}', 'DeleteSkill');
    });
});

Route::controller(EducationController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/education', 'GetEducation');
        Route::post('/education', 'EditEducation');

        Route::get('/certificates/{userId}/{userName}', 'ShowUserCertificates');
        Route::post('/certificate/add', 'AddCertificate');
        Route::post('/certificate/edit/{certificate}', 'EditCertificate');
        Route::delete('/certificates/{certificate}', 'DeleteCertificate');
    });
});

Route::controller(PortfolioController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/portfolios/{userId}/{userName}', 'ShowUserPortfolios');
        Route::get('/portfolio/{id}', 'ShowPortfolio');
        Route::post('/portfolio/add', 'AddPortfolio');
        Route::post('/portfolio/edit/{id}', 'EditPortfolio');
        Route::delete('/portfolios/{id}', 'DeletePortfolio');
    });
});

Route::controller(DefJobsController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/jobs', 'ShowAllJobs');
        Route::get('/jobs/all', 'ShowJobsAdmin');
        Route::get('/jobs/{id}', 'ShowSpecificJob');

        Route::get('/manage/posted', 'PostedJobs');
        Route::get('/manage/applied', 'AppliedJobs');
        Route::get('/manage/bookmarked', 'BookmarkedJobs');
        Route::post('/jobs/{id}/bookmark', 'BookmarkJob');
    });
});

Route::controller(RegJobsController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::post('/regJob/add', 'PostRegJob');
        Route::get('/regJobs', 'ViewRegJobs');
        Route::get('/regJobs/{defJob_id}', 'ShowRegJob');
        Route::get('/regJobs/{defJob_id}/competitors', 'ViewRegJobCompetitors');
        Route::post('/regJob/apply', 'ApplyRegJob');
        Route::post('/regJob/accept/{defJob_id}', 'AcceptIndividual');
        Route::delete('/regJobs/{defJob_id}', 'DeleteRegJob');
    });
});

Route::controller(FreelancingJobsController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::post('/FreelancingJob/add', 'PostFreelancingJob');
        Route::get('/FreelancingJobs', 'ViewFreelancingJobs');
        Route::get('/FreelancingJobs/{defJob_id}', 'ShowFreelancingJob');
        Route::get('/FreelancingJobs/{defJob_id}/competitors', 'ViewFreelancingJobCompetitors');
        Route::post('/FreelancingJob/apply', 'ApplyFreelancingJob');
        Route::post('/FreelancingJob/accept/{defJob_id}', 'AcceptUser');
        Route::post('/FreelancingJob/done/{defJob_id}', 'FinishedJob');
        Route::delete('/FreelancingJobs/{defJob_id}', 'DeleteFreelancingJob');
        Route::post('/FreelancingJobs/offer', 'ChangeOffer');
    });
});

Route::controller(TransactionsController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/transactions', 'GetUserTransactions');
        Route::get('/transactions/all', 'GetAllTransactions');
        Route::post('/transactions/done', 'AddUserTransaction');
        Route::delete('/transactions/{transaction_id}', 'DeleteTransaction');
        Route::post('/redeemcode', 'RedeemCode');
    });
});

Route::controller(ChatController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/chats', 'GetAllChats');
        Route::get('/chats/{id}', 'GetChat');
        Route::post('/chats/create', 'CreateChat');
        Route::post('/chats/sendMessage', 'SendMessage');
        Route::post('/chat/messages', 'MarkMessagesAsRead');
    });
});

Route::controller(JobFeedController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/jobFeed/stats', 'Stats');
        Route::get('/jobFeed/tops', 'Tops');
    });
});

Route::controller(ReviewController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::post('/review', 'MakeReview');
    });
});

Route::controller(NotificationsController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/notifications', 'GetUserNotifications');
        Route::get('/notifications-nr', 'GetUnreadNotifications');
        Route::post('/notifications', 'MarkNotificationsAsRead');
        Route::delete('/notification/{id}', 'DeleteNotification');
    });
});

// Routes for admin can only be accessed through postman
Route::controller(AdminController::class)->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/users', 'Users');
        Route::get('/reports', 'ReportsData');
        Route::post('/generate', 'GenerateCode');
        Route::delete('/users/{user_id}', 'DeleteUser');
    });
});

Route::get('/file/{user_id}/{folder}/{file}', function (Request $request, $user_id, $folder, $file) {
    $path = storage_path('app/' . $user_id . '/' . $folder . '/' . $file);
    if ($path == null) {
        return null;
    }
    return response()->file($path);
});

Route::get('/image/{user_id}/{folder}/{image}', function (Request $request, $user_id, $folder, $image) {
    $path = storage_path('app/' . $user_id . '/' . $folder . '/' . $image);
    if ($path == null) {
        return null;
    }
    return response()->file($path);
});

// Pusher
Route::middleware('auth:api')->get('/pusher/beams-auth', function (Request $request) {
    $beamsClient = new \Pusher\PushNotifications\PushNotifications(array(
        "instanceId" => "8a1adda3-cbf6-4ac7-b9b5-d8d8669217ac",
        "secretKey" => "A37D5D99D8EAB5034F5F56CAD99F043BB38118760368264F102EEA547F57E05C",
    ));

    $userID = auth()->user()->id; // If you use a different auth system, do your checks here
    $userIDInQueryParam = $request->input('user_id');

    if ('user-' . $userID != $userIDInQueryParam) {
        return response('Inconsistent request', 401);
    } else {
        $beamsToken = $beamsClient->generateToken($userID);
        return response()->json($beamsToken);
    }
});

Route::middleware('auth:api')->get('/GG', function (Request $request) {
    $beamsClient = new \Pusher\PushNotifications\PushNotifications(array(
        "instanceId" => "8a1adda3-cbf6-4ac7-b9b5-d8d8669217ac",
        "secretKey" => "A37D5D99D8EAB5034F5F56CAD99F043BB38118760368264F102EEA547F57E05C",
    ));

    //include 'src/PushNotifications.php';
    $publishResponse = $beamsClient->publishToUsers(
        ['user-37'],
        [
            "web" => array(
                "notification" => array(
                    "title" => "Hello",
                    "body" => "Hello, World!",
                    "deep_link" => "https://www.pusher.com",
                )
            ),
        ]
    );
    $publishResponse = $beamsClient->publishToInterests(
        ["TEST"],
        [
            "web" => [
                "notification" => [
                    "title" => "Hello",
                    "body" => "Hello, World!",
                    "deep_link" => "https://www.pusher.com",
                ]
            ],
            "apns" => [
                "aps" => [
                    "alert" => "Hello!",
                ],
            ],
            "fcm" => [
                "notification" => [
                    "title" => "Hello!",
                    "body" => "Hello, world!",
                ],
                "data" => [
                    "name" => "adam",
                    "type" => "user",
                ],
            ],
        ]
    );
    echo ("Published with Publish ID: " . $publishResponse->publishId . "\n");
    return response()->json([
        'GG' => 'Haha'
    ], 200);
});

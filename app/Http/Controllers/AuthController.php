<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordRequest;
use App\Models\Cars;
use App\Models\User;
use App\Models\Province;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use \Validator;
use App\Notifications\UserCreateNotification;
use App\Notifications\PasswordChange;
use Illuminate\Support\Facades\Notification;
use App\Http\Resources\RegionCollection;

class AuthController extends Controller
{

    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'surname' => 'string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:users',
            ///'password' => 'required|string|confirmed',
            'birthday' => 'string',
            'address' => 'required|string',
            'state' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => 0, 'type' => 'validation_filed', 'error' => $validator->messages()], 422);
        }
        $requestData = $validator->validated();
        $state = json_decode($request->state);

        $user = new User([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            /////TODO CHANGE IT
           'password' => bcrypt($requestData['password']),
          ///  'password' => bcrypt('admin'),
            'birthday' => date ('Y-m-d', strtotime($requestData['birthday'])),
            'address' => $requestData['address'],
            'state_id' => $state->id,
        ]);
        if (!$user->save()) {
            return response()->json([
                'success' => '0',
                'type' => 'forbidden',
            ], 403);
        }
        $user->notify(
            new UserCreateNotification($user)
        );
        return response()->json([
            'success' => '1',
            'type' => 'success',
        ], 201);
    }

    public function edit(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email',
            'birthday' => 'required|string',
            'address' => 'required|string',

        ]);
        $id = $request->user()->id;
        $user = User::find($id);
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->birthday = $request->birthday;
        $user->address = $request->address;
        if ($request->state) {
            $state = json_decode($request->state);
            $user->state_id = $state->value;
        }
        $user->update();
        return response()->json($user, 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean',
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
        ]);
    }

    public function logout(Request $request)
    {

        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function user(Request $request, $slug = null)
    {
        $data = [];
        $userId = $request->user()->id;
        $user = User::find($userId);

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            "image" => $user->image ? '/uploads/users/' . $user->image : null,
            'surname' => $user->surname,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'role' => $user->role->name,
            // 'state' => $state->name,
            'address' => $user->address,
            'birthday' => $user->birthday,
        ];
        if($user->role->name == 'admin'){
            $data['count'] = \App\Models\Notification::where('new_admin', 1)->count();
        }else{
            $ids = User::where('vendor_id',  $user->vendor_id)->where(
                'id',
                '!=',
                $user->vendor_id
            )->select('id')->get()->toArray();
         //   dd($ids);
            $carIds = Cars::where('vendor_id',  $user->vendor_id)->select('id')->get()->toArray();
            $data['count'] =  \App\Models\Notification::where(function ($query) use ($ids) {
                $query->whereIn('value_id', $ids)->where('model', 'driver');
            })->orWhere(function ($query) use ($carIds) {
                $query->whereIn('value_id', $carIds)->where('model', 'car');
            })->where('new_vendor', 1)->count();

        }

        return response()->json($data);
    }

    public function reset(PasswordRequest $request)
    {
        $user = User::with(['product_types', 'languages'])->where('id', $request->user()->id)->first();
        if (Hash::check($request->input('password'), $user->password)) {
            $user->password = bcrypt($request->input('new_password'));
            $user->update();
            /////TODO: fix this part
            // $user->notify(
            //     new PasswordChange()
            // );
            return response()->json(1);
        }
        return response()->json(0);
    }

    public function auth_cookie(Request $request)
    {
        $auth_cookie = $request->cookie('laravel_session');
        return response()->json($auth_cookie);
    }

    public function uploadAvatar(Request $request)
    {
        $image =  $request->file;
        $image_new_name = time() . $image->getClientOriginalName();
        $image->move('uploads/partners', $image_new_name);
        $user = User::find($request->input('userId'));
        if($user->image){
            $oldImage =  public_path("uploads/partners/$user->image");
            if (file_exists($oldImage)) {
                unlink($oldImage);
            }
        }
        $user->image = $image_new_name;
        $user->update();
        return response()->json(1);
    }

    public function registerForm()
    {
       /// $regions = Province::get();
       $regions =[
        ['name' =>'californa',
        'slug' =>'californa',
        'id' =>1]
    ];
        $province =new RegionCollection($regions);
        ////new RegionCollection($regions);
        return response()->json($province);
    }
}

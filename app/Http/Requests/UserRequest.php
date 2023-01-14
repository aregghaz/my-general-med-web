<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'surname' =>'required',
            'name' =>'required',
            'email' => 'required|string|email|unique:users',
            // 'address' => $user->address,
            'phone_number' => 'required',
            // 'birthday' => $user->birthday,
            'role' => 'required',
         //   "image" =>'required',
        ];
    }
    public function messages()
    {
        return [
            'name' =>'required',
            'fullName' =>'required',
            'email' => 'required',
            // 'address' => $user->address,
            'phone_number' => 'required',
            // 'birthday' => $user->birthday,
            'role' => 'required',
            //"image" =>'required',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordRequest extends FormRequest
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
            'password' => 'required',
            'new_password' => 'required|different:password',
            'password_confirm' => 'required|same:new_password'
        ];
    }
    public function messages()
    {
        return [
            'password' => 'required',
            'new_password' => 'required|string|confirmed',
            'password_confirm' => 'required'
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VendorRequest extends FormRequest
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
            'value.name' =>'required',
            'value.email' => 'required|string|email|unique:vendors',
            // 'address' => $user->address,
            'value.phone_number' => 'required',
             'value.status' => 'required',
            'value.role' => 'required',
            //   "image" =>'required',
        ];
    }
}

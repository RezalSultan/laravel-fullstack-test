<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    $rules = [
      'name' => 'required|string|max:250',
    ];

    return $rules;
  }

  public function messages(): array
  {
    return [
      'name' => 'Nama produk harus diisi.',
      'name.string' => 'Nama produk harus berupa teks.',
      'name.max' => 'Nama produk maksimal 255 karakter.',
    ];
  }
}

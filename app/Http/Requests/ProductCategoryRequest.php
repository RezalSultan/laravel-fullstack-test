<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    $rules = [
      'image' => 'nullable',
      'product_id' => 'required|integer',
      'desc' => 'required|string|max:250',
    ];

    if ($this->hasFile('image') && $this->file('image')->isValid()) {
      $rules['image'] = 'nullable|file|mimes:jpg,jpeg,png|max:5120';
    } elseif (is_string($this->input('image'))) {
      $rules['image'] = 'nullable';
    }

    return $rules;
  }

  public function messages(): array
  {
    return [
      'product_id' => 'Produk Id harus diisi.',
      'product_id' => 'Produk Id harus berupa integer.',
      'desc' => 'Deskripsi produk harus diisi.',
      'desc.string' => 'Deskripsi produk harus berupa teks.',
      'desc.max' => 'Deskripsi produk maksimal 250 karakter.',
      'image.image' => 'Gambar produk harus berupa file gambar.',
      'image.mimes' => 'Gambar produk hanya boleh memiliki format jpeg, jpg, atau png.',
      'image.max' => 'Gambar produk avatar maksimal 5MB.',
    ];
  }
}

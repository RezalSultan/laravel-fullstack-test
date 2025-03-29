<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ProductCategory extends Model
{
  use HasFactory;

  protected $table = 'product_categories';
  protected $primaryKey = 'id';

  protected $fillable = [
    'product_id',
    'desc',
    'image',
  ];

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class, "product_id", "id");
  }

  function handleUploadImg()
  {
    $this->handleDeleteImg();
    if (request()->hasFile('image')) {
      $image = request()->file('image');
      $destination = "/";
      $randomStr = Str::random(5);
      $filename = $this->id . "-" . time() . "-" . $randomStr . "." . $image->extension();
      $url = $image->storeAs($destination, $filename);
      $this->image = $url;
      $this->save();
    }
  }

  function handleDeleteImg()
  {
    $image = $this->image;
    if ($image) {
      $path = storage_path("app/public/" . $image);
      if (file_exists($path)) {
        unlink($path);
        $this->image = null; // Hapus referensi gambar di database
        $this->save();
      }
      return true;
    }
  }
}

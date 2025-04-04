<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
  use HasFactory;

  protected $table = 'products';
  protected $primaryKey = 'id';

  protected $fillable = [
    'name',
  ];

  public function productCategories(): HasMany
  {
    return $this->hasMany(ProductCategory::class, "product_id", "id");
  }
}

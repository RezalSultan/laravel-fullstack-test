<?php

use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'index'])->name('index');

Route::post('/create/product', [ProductController::class, 'store'])->name('create.product.request');
Route::patch('/edit/product/{id}', [ProductController::class, 'update'])->name('edit.product.request');
Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('delete.product.request');

Route::post('/create/product-category', [ProductCategoryController::class, 'store'])->name('create.product-category.request');
Route::post('/edit/product-category/{id}', [ProductCategoryController::class, 'update'])->name('edit.product-category.request');
Route::delete('/product-category/{id}', [ProductCategoryController::class, 'destroy'])->name('delete.product-category.request');

Route::post('/product-category/upload-image/{id?}', [ProductCategoryController::class, 'uploadImage'])->name('product-category.upload-image');
Route::delete('/product-category/delete-image/{id}', [ProductCategoryController::class, 'deleteImage'])->name('product-category.delete-image');

require __DIR__ . '/auth.php';

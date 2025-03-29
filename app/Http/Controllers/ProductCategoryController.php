<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCategoryRequest;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;

class ProductCategoryController extends Controller
{
  public function store(ProductCategoryRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      DB::beginTransaction();
      $product_category = new ProductCategory();
      $product_category->product_id = $validated['product_id'];
      $product_category->desc = $validated['desc'];
      $product_category->save();
      if ($validated['image']) {
        $product_category->handleUploadImg();
      }
      DB::commit();

      return redirect()->route('index')->with([
        'context' => 'addProductCategory',
        'success' => 'Tambah Produk Kategori Telah Berhasil Dilakukan'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with([
        'context' => 'addProductCategory',
        'danger' => 'Tambah Produk Kategori Gagal Dilakukan'
      ]);
    }
  }

  public function update(ProductCategoryRequest $request, $id): RedirectResponse
  {
    try {
      $validated = $request->validated();

      $product_category = ProductCategory::find($id);

      if (!$product_category) {
        return back()->with('danger', 'Produk kategori tidak ditemukan');
      }

      DB::beginTransaction();

      $product_category->desc = $validated['desc'];
      $product_category->save();
      if ($validated['image'] === null) {
        $product_category->handleDeleteImg();
      } else if ($validated['image'] && $validated['image'] instanceof UploadedFile) {
        $product_category->handleUploadImg();
      }
      DB::commit();

      return redirect()->route('index')->with([
        'context' => 'updateProductCategory',
        'success' => 'Edit Produk Kategori Telah Berhasil Dilakukan'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      dd($e->getMessage());
      return back()->with([
        'context' => 'updateProductCategory',
        'danger' => 'Edit Produk Kategori Gagal Dilakukan'
      ]);
    }
  }

  public function uploadImage(Request $request): RedirectResponse
  {
    try {
      $validated = $request->validate([
        'id' => 'nullable|integer',
        'product_id' => 'required|integer',
        'image' => 'required|file|mimes:jpg,jpeg,png|max:5120',
      ]);

      DB::beginTransaction();

      $id = $validated['id'];

      if ($id) {
        $product_category = ProductCategory::find($id);
        if (!$product_category) {
          return back()->with([
            'context' => 'uploadImageProductCategory',
            'danger' => 'Produk Kategori tidak ditemukan'
          ]);
        }
      } else {
        // Jika ID tidak ada, buat data baru
        $product_category = new ProductCategory();
      }
      $product_category->product_id = $validated['product_id'];
      $product_category->save();
      if ($validated['image']) {
        $product_category->handleUploadImg();
      }
      DB::commit();

      return redirect()->route('index')->with([
        'context' => 'uploadImageProductCategory',
        'success' => 'Tambah Gambar Produk Kategori Telah Berhasil Dilakukan'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with([
        'context' => 'uploadImageProductCategory',
        'danger' => 'Tambah Gambar Produk Kategori Gagal Dilakukan'
      ]);
    }
  }

  public function deleteImage($id): RedirectResponse
  {
    try {
      $product_category = ProductCategory::find($id);
      if (!$product_category) {
        return back()->with([
          'context' => 'uploadImageProductCategory',
          'danger' => 'Produk Kategori tidak ditemukan'
        ]);
      }
      $product_category->handleDeleteImg();

      return redirect()->route('index')->with([
        'context' => 'deleteImageProductCategory',
        'success' => 'Hapus Gambar Produk Kategori Telah Berhasil Dilakukan'
      ]);
    } catch (\Exception $e) {
      return back()->with([
        'context' => 'deleteImageProductCategory',
        'danger' => 'Hapus Gambar Produk Kategori Gagal Dilakukan'
      ]);
    }
  }

  public function destroy($id): RedirectResponse
  {
    try {
      $productCategory = ProductCategory::find($id);

      if (!$productCategory) {
        return back()->with('danger', 'Produk kategori tidak ditemukan');
      }
      $productCategory->handleDeleteImg();
      $productCategory->delete();

      return redirect()->route("index")->with([
        'context' => 'deleteProductCategory',
        'success' => 'Hapus Produk Kategori Telah Berhasil'
      ]);
    } catch (\Exception $e) {
      return back()->with([
        'context' => 'deleteProductCategory',
        'danger' => 'Hapus Produk Kategori Gagal Dilakukan'
      ]);
    }
  }
}

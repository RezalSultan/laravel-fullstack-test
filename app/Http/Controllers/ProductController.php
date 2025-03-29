<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
  public function index()
  {
    $products = Product::with('productCategories')->orderBy('created_at', 'asc')->get();
    return Inertia::render(
      'Product',
      [
        'dataProducts' => $products,
      ]
    );
  }

  public function store(ProductRequest $request): RedirectResponse
  {
    try {
      $validated = $request->validated();

      DB::beginTransaction();
      $myclient = new Product();
      $myclient->name = $validated['name'];
      $myclient->save();
      DB::commit();

      return redirect()->route('index')->with([
        'context' => 'addProduct',
        'success' => 'Tambah Produk Telah Berhasil Dilakukan'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with([
        'context' => 'addProduct',
        'danger' => 'Tambah Produk Gagal Dilakukan'
      ]);
    }
  }

  public function update(ProductRequest $request, $id): RedirectResponse
  {
    try {
      $validated = $request->validated();

      $product = Product::find($id);

      if (!$product) {
        return back()->with('danger', 'Produk tidak ditemukan');
      }


      DB::beginTransaction();
      $product->name = $validated['name'];
      $product->save();
      DB::commit();

      return redirect()->route('index')->with([
        'context' => 'updateProduct',
        'success' => 'Edit Produk Telah Berhasil Dilakukan'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->with([
        'context' => 'updateProduct',
        'danger' => 'Edit Produk Gagal Dilakukan'
      ]);
    }
  }

  public function destroy($id): RedirectResponse
  {
    try {
      $product = Product::find($id);

      if (!$product) {
        return back()->with('danger', 'Produk tidak ditemukan');
      }
      foreach ($product->productCategories as $dataProductCategory) {
        if ($dataProductCategory->image) {
          $productCategory = ProductCategory::find($dataProductCategory->id);
          $productCategory->handleDeleteImg();
        }
      }

      $product->delete();

      return redirect()->route("index")->with([
        'context' => 'deleteProduct',
        'success' => 'Hapus Produk Telah Berhasil Dilakukan'
      ]);
    } catch (\Exception $e) {
      return back()->with([
        'context' => 'deleteProduct',
        'danger' => 'Hapus Produk Gagal Dilakukan'
      ]);
    }
  }
}

import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

type FlashProps = {
    success?: string;
    danger?: string;
    context?: string;
};

const FlashToast = () => {
    const { flash } = usePage().props as { flash?: FlashProps };
    const [toastKey, setToastKey] = useState(Date.now());

    useEffect(() => {
        if (flash?.success || flash?.danger) {
            setToastKey(Date.now()); // Update key setiap ada flash baru
        }
    }, [flash]);

    useEffect(() => {
        if (flash?.success) {
            if (flash?.context === "addProduct") {
                toast.success(`Tambah Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "updateProduct") {
                toast.success(`Edit Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "addProductCategory") {
                toast.success(`Tambah Kategori Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "updateProductCategory") {
                toast.success(`Edit Kategori Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "deleteProduct") {
                toast.success(`Hapus Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "deleteProductCategory") {
                toast.success(`Hapus Kategori Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "uploadImageProductCategory") {
                toast.success(`Tambah Gambar Kategori Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "deleteImageProductCategory") {
                toast.success(`Hapus Gambar Kategori Produk Berhasil`, {
                    description: `${flash.success}`,
                    position: "top-center",
                });
            }
        }
        if (flash?.danger) {
            if (flash?.context === "addProduct") {
                toast.error(`Tambah Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "updateProduct") {
                toast.error(`Edit Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "addProductCategory") {
                toast.error(`Tambah Kategori Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "updateProductCategory") {
                toast.error(`Edit Kategori Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "deleteProduct") {
                toast.error(`Hapus Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "deleteProductCategory") {
                toast.error(`Hapus Kategori Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "uploadImageProductCategory") {
                toast.error(`Tambah Gambar Kategori Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
            if (flash?.context === "deleteImageProductCategory") {
                toast.error(`Hapus Gambar Kategori Produk Gagal`, {
                    description: `${flash.danger}`,
                    position: "top-center",
                });
            }
        }
    }, [toastKey]);

    return null;
};

export default FlashToast;

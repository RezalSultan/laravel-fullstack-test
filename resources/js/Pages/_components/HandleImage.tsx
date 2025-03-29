import { Head, Link, useForm } from "@inertiajs/react";
import {
    DataProductCategoryTypeSchema,
    DataProductTypeSchema,
    FormUploadImageRequest,
} from "@/types/ProductType";
import { Button } from "@/Components/ui/button";
import { Fragment, useState } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Input } from "@/Components/ui/input";
import AlertModal from "@/Components/AlertModal";
import UploadModal from "@/Components/UploadModal";

export default function HandleImage({
    dataProductCategory,
    productId,
}: {
    dataProductCategory?: DataProductCategoryTypeSchema;
    productId: number;
}) {
    const [open, setOpen] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        data,
        setData,
        delete: deleteImage,
        post,
        processing,
        errors,
        reset,
    } = useForm();

    const onConfirmDelete = () => {
        deleteImage(
            route("product-category.delete-image", dataProductCategory?.id),
            {
                preserveScroll: false,
                onError: (errors) => {
                    console.log("Error:", errors);
                },
                onFinish: () => {
                    setOpen(false);
                },
            }
        );
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfrim={onConfirmDelete}
                loading={loading}
            />
            <UploadModal
                isOpen={openUpload}
                onClose={() => setOpenUpload(false)}
                productId={productId}
                dataProductCategory={dataProductCategory}
            />
            <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 align-middle text-center">
                {dataProductCategory?.image ? (
                    <div className="relative">
                        <img
                            src={`/storage/${dataProductCategory.image}`}
                            alt="gambar produk"
                            className="max-h-16 rounded-sm object-contain mx-auto"
                        />
                        <div
                            onClick={() => setOpen(true)}
                            className="group absolute right-0 bottom-0 cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
                        >
                            <Trash2 size={16} className="text-destructive" />
                        </div>
                    </div>
                ) : (
                    <Button onClick={() => setOpenUpload(true)} size={"xs"}>
                        <Upload size={8} />
                    </Button>
                )}
            </td>
        </>
    );
}

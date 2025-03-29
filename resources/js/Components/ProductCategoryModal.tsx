"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import FormProductCategory from "@/Pages/_components/FormProductCategory";
import {
    DataProductCategoryTypeSchema,
    DataProductTypeSchema,
} from "@/types/ProductType";

type ProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    dataProduct?: DataProductTypeSchema;
    dataProductCategory?: DataProductCategoryTypeSchema;
};

const ProductCategoryModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    productId,
    dataProduct,
    dataProductCategory,
}) => {
    const [isMoundted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMoundted) {
        return null;
    }
    return (
        <>
            <Modal
                title={
                    dataProductCategory
                        ? `Edit Kategori Produk ${dataProductCategory.desc}`
                        : `Tambah Kategori Produk Baru`
                }
                description={
                    dataProductCategory
                        ? "Pilih edit untuk mengubah kategori produk."
                        : "Pilih tambah untuk membuat kategori produk."
                }
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormProductCategory
                    onClose={onClose}
                    productId={productId}
                    dataProduct={dataProduct}
                    dataProductCategory={dataProductCategory}
                />
            </Modal>
        </>
    );
};

export default ProductCategoryModal;

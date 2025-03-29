"use client";

import { useEffect, useState } from "react";
import FormCreateProduct from "@/Pages/_components/FormProduct";
import Modal from "./Modal";
import { DataProductTypeSchema } from "@/types/ProductType";

type ProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    dataLength: number;
    dataProduct?: DataProductTypeSchema;
};

const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    dataLength,
    dataProduct,
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
                title={dataProduct ? `Edit Produk` : `Tambah Produk Baru`}
                description={
                    dataProduct
                        ? "Pilih edit untuk mengubah produk."
                        : "Pilih tambah untuk membuat produk baru."
                }
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormCreateProduct
                    onClose={onClose}
                    dataLength={dataLength}
                    dataProduct={dataProduct}
                />
            </Modal>
        </>
    );
};

export default ProductModal;

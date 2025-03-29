"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { DataProductCategoryTypeSchema } from "@/types/ProductType";
import FormUploadImage from "@/Pages/_components/FormUploadImage";

type UploadProps = {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    dataProductCategory?: DataProductCategoryTypeSchema;
};

const UploadModal: React.FC<UploadProps> = ({
    isOpen,
    onClose,
    productId,
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
                title="Upload Gambar Produk"
                description="Pilih upload untuk menambah gambar produk."
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormUploadImage
                    onClose={onClose}
                    productId={productId}
                    dataProductCategory={dataProductCategory}
                />
            </Modal>
        </>
    );
};

export default UploadModal;

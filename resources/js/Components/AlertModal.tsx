"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";

type AlertModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfrim: () => void;
    loading: boolean;
};

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfrim,
    loading,
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
                title="Apakah Anda Yakin untuk Menghapus Gambar?"
                description="Aksi ini tidak dapat dikembalikan"
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="flex w-full items-center justify-center gap-2 sm:justify-end">
                    <Button
                        className="!bg-[#808080] text-white hover:text-white hover:!bg-[#808080]/80"
                        disabled={loading}
                        onClick={onClose}
                        variant={"outline"}
                    >
                        Batalkan
                    </Button>
                    <Button
                        className="!bg-[#D22B2B] hover:!bg-[#D22B2B]/80"
                        disabled={loading}
                        onClick={onConfrim}
                        variant={"destructive"}
                    >
                        Hapus
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default AlertModal;

import { Head, Link, useForm } from "@inertiajs/react";
import {
    DataProductCategoryTypeSchema,
    DataProductTypeSchema,
} from "@/types/ProductType";
import { Button } from "@/Components/ui/button";
import { Fragment, useState } from "react";
import { Edit, Edit2, Plus, Upload, X } from "lucide-react";
import ProductCategoryModal from "@/Components/ProductCategoryModal";
import Guest from "@/Layouts/GuestLayout";
import FlashToast from "@/Components/FlashToast";
import HandleImage from "./_components/HandleImage";
import ProductModal from "@/Components/ProductModal";

export default function Product({
    dataProducts,
}: {
    dataProducts: DataProductTypeSchema[];
}) {
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openProductCategoryModal, setOpenProductCategoryModal] =
        useState(false);
    const [selectProductId, setSelectProductId] = useState(0);
    const [dataProduct, setDataProduct] = useState<
        DataProductTypeSchema | undefined
    >(undefined);
    const [dataProductCategory, setDataProductCategory] = useState<
        DataProductCategoryTypeSchema | undefined
    >(undefined);

    const setValueLenght = (value: number) => {
        const lenght = value < 3 ? value + 1 : value;
        return lenght;
    };

    const {
        delete: destroyProduct,
        delete: destroyProductCategory,
        processing,
        errors,
        reset,
    } = useForm();

    const handleDeleteProduct = (id: number) => {
        destroyProduct(route("delete.product.request", id), {
            preserveScroll: false,
            onError: (errors) => {
                console.log("Error:", errors);
            },
        });
    };

    const handleDeleteProductCategory = (id: number) => {
        destroyProductCategory(route("delete.product-category.request", id), {
            preserveScroll: false,
            onError: (errors) => {
                console.log("Error:", errors);
            },
        });
    };

    return (
        <Guest>
            <Head title="Product Description Section" />
            <FlashToast />
            <ProductModal
                isOpen={openProductModal}
                onClose={() => setOpenProductModal(false)}
                dataLength={dataProducts.length}
                dataProduct={dataProduct}
            />
            <ProductCategoryModal
                isOpen={openProductCategoryModal}
                onClose={() => setOpenProductCategoryModal(false)}
                productId={selectProductId}
                dataProduct={dataProduct}
                dataProductCategory={dataProductCategory}
            />
            <p className="text-3xl font-bold pb-4 text-center">
                Product Description Section
            </p>
            <div className="w-full bg-card px-4 pb-4">
                <table className="mt-4 min-w-full table-auto border-collapse border-spacing-0 ">
                    <thead>
                        <tr className="text-sm text-primary-foreground">
                            <th className="w-fit border-2 border-accent px-2 py-2 bg-primary">
                                No.
                            </th>
                            <th className="w-4/12 border-2 border-accent px-1 py-2 bg-primary">
                                Produk
                            </th>
                            <th className="w-3/12 border-2 border-accent px-1 py-2 bg-primary">
                                Deskripsi Produk
                            </th>
                            <th className="w-3/12 border-2 border-accent px-1 py-2 bg-primary">
                                Gambar Produk
                            </th>
                            <th className="w-1/12 border-2 border-accent px-1 py-2 bg-primary">
                                Aksi
                            </th>
                            <th className="w-0.5/12 border-opacity-0 py-2 opacity-0 !bg-background"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProducts?.length ? (
                            <>
                                {dataProducts?.map((item, index) => (
                                    <Fragment key={index}>
                                        {item.product_categories.length ? (
                                            <>
                                                <tr className="text-base even:bg-muted">
                                                    <td
                                                        rowSpan={setValueLenght(
                                                            item
                                                                .product_categories
                                                                ?.length
                                                        )}
                                                        className="w-fit border-x-2 border-b-2 border-accent px-0.5 py-2 text-center"
                                                    >
                                                        {index + 1}.
                                                    </td>
                                                    <td
                                                        rowSpan={setValueLenght(
                                                            item
                                                                .product_categories
                                                                ?.length
                                                        )}
                                                        className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-center "
                                                    >
                                                        {item.name}
                                                    </td>
                                                    {item.product_categories
                                                        ?.filter(
                                                            (p, index) =>
                                                                index === 0
                                                        )
                                                        .map(
                                                            (
                                                                productCategory,
                                                                index
                                                            ) => (
                                                                <Fragment
                                                                    key={index}
                                                                >
                                                                    <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-center ">
                                                                        {
                                                                            productCategory.desc
                                                                        }
                                                                    </td>
                                                                    <HandleImage
                                                                        dataProductCategory={
                                                                            productCategory
                                                                        }
                                                                        productId={
                                                                            item.id
                                                                        }
                                                                    />
                                                                    <td className="w-1/12 border-2 border-accent px-1 py-2 text-center">
                                                                        <div className="flex justify-center items-center">
                                                                            <Button
                                                                                className="px-2 "
                                                                                size={
                                                                                    "xs"
                                                                                }
                                                                                variant={
                                                                                    "ghost"
                                                                                }
                                                                                onClick={() => {
                                                                                    setDataProductCategory(
                                                                                        productCategory
                                                                                    );
                                                                                    setSelectProductId(
                                                                                        item.id
                                                                                    );
                                                                                    setOpenProductCategoryModal(
                                                                                        true
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Edit
                                                                                    size={
                                                                                        8
                                                                                    }
                                                                                />
                                                                            </Button>
                                                                            <Button
                                                                                onClick={() =>
                                                                                    handleDeleteProductCategory(
                                                                                        productCategory.id
                                                                                    )
                                                                                }
                                                                                size={
                                                                                    "xs"
                                                                                }
                                                                                variant={
                                                                                    "ghost"
                                                                                }
                                                                            >
                                                                                <X
                                                                                    size={
                                                                                        8
                                                                                    }
                                                                                />
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </Fragment>
                                                            )
                                                        )}
                                                    <td
                                                        rowSpan={setValueLenght(
                                                            item
                                                                .product_categories
                                                                ?.length
                                                        )}
                                                        className="w-0.5/12 p-2 !bg-white"
                                                    >
                                                        <div className="flex justify-center items-center">
                                                            <Button
                                                                className="px-2 "
                                                                size={"sm"}
                                                                variant={
                                                                    "ghost"
                                                                }
                                                                onClick={() => {
                                                                    setDataProduct(
                                                                        item
                                                                    );
                                                                    setOpenProductModal(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <Edit
                                                                    size={20}
                                                                />
                                                            </Button>
                                                            <Button
                                                                className="px-2 "
                                                                onClick={() =>
                                                                    handleDeleteProduct(
                                                                        item.id
                                                                    )
                                                                }
                                                                size={"sm"}
                                                                variant={
                                                                    "ghost"
                                                                }
                                                            >
                                                                <X size={20} />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {item.product_categories
                                                    ?.filter(
                                                        (p, index) => index > 0
                                                    )
                                                    .map(
                                                        (
                                                            productCategory,
                                                            index
                                                        ) => (
                                                            <tr
                                                                className="text-base even:bg-muted"
                                                                key={index}
                                                            >
                                                                <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-0.5 text-center ">
                                                                    {
                                                                        productCategory.desc
                                                                    }
                                                                </td>
                                                                <HandleImage
                                                                    dataProductCategory={
                                                                        productCategory
                                                                    }
                                                                    productId={
                                                                        item.id
                                                                    }
                                                                />
                                                                <td className="w-1/12 border-2 border-accent px-1 py-0.5 text-center">
                                                                    <div className="flex justify-center items-center">
                                                                        <Button
                                                                            className="px-2 "
                                                                            size={
                                                                                "xs"
                                                                            }
                                                                            variant={
                                                                                "ghost"
                                                                            }
                                                                            onClick={() => {
                                                                                setDataProductCategory(
                                                                                    productCategory
                                                                                );
                                                                                setSelectProductId(
                                                                                    item.id
                                                                                );
                                                                                setOpenProductCategoryModal(
                                                                                    true
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Edit
                                                                                size={
                                                                                    8
                                                                                }
                                                                            />
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() =>
                                                                                handleDeleteProductCategory(
                                                                                    productCategory.id
                                                                                )
                                                                            }
                                                                            size={
                                                                                "xs"
                                                                            }
                                                                            variant={
                                                                                "ghost"
                                                                            }
                                                                        >
                                                                            <X
                                                                                size={
                                                                                    8
                                                                                }
                                                                            />
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                {item.product_categories
                                                    .length < 3 && (
                                                    <tr className="text-base even:bg-muted">
                                                        <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-center "></td>
                                                        <HandleImage
                                                            productId={item.id}
                                                        />
                                                        <td className="w-1/12 border-2 border-accent px-1 py-2 text-center">
                                                            <Button
                                                                onClick={() => {
                                                                    setDataProductCategory(
                                                                        undefined
                                                                    );
                                                                    setOpenProductCategoryModal(
                                                                        true
                                                                    );
                                                                    setSelectProductId(
                                                                        item.id
                                                                    );
                                                                    setDataProduct(
                                                                        item
                                                                    );
                                                                }}
                                                                size={"xs"}
                                                            >
                                                                <Plus
                                                                    size={8}
                                                                />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : (
                                            <tr className="text-base even:bg-muted">
                                                <td className="w-fit border-x-2 border-b-2 border-accent px-0.5 py-2 text-center">
                                                    {index + 1}.
                                                </td>
                                                <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-center ">
                                                    {item.name}
                                                </td>
                                                <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-center "></td>
                                                <HandleImage
                                                    productId={item.id}
                                                />
                                                <td className="w-1/12 border-2 border-accent px-1 py-2 text-center">
                                                    <Button
                                                        onClick={() => {
                                                            setDataProductCategory(
                                                                undefined
                                                            );
                                                            setOpenProductCategoryModal(
                                                                true
                                                            );
                                                            setSelectProductId(
                                                                item.id
                                                            );
                                                            setDataProduct(
                                                                item
                                                            );
                                                        }}
                                                        size={"xs"}
                                                    >
                                                        <Plus size={8} />
                                                    </Button>
                                                </td>
                                                <td className="w-0.5/12 p-2 !bg-white">
                                                    <div className="flex justify-center items-center">
                                                        <Button
                                                            className="px-2 "
                                                            size={"sm"}
                                                            variant={"ghost"}
                                                            onClick={() => {
                                                                setDataProduct(
                                                                    item
                                                                );
                                                                setOpenProductModal(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <Edit size={20} />
                                                        </Button>
                                                        <Button
                                                            className="px-2 "
                                                            onClick={() =>
                                                                handleDeleteProduct(
                                                                    item.id
                                                                )
                                                            }
                                                            size={"sm"}
                                                            variant={"ghost"}
                                                        >
                                                            <X size={20} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                                {dataProducts.length < 5 && (
                                    <tr className="text-base even:bg-muted">
                                        <td className=" w-fit border-x-2 border-b-2 border-accent px-0.5 py-2 text-center">
                                            {dataProducts.length + 1}.
                                        </td>
                                        <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-left"></td>
                                        <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-left"></td>
                                        <td className="w-3/12 border-x-2 border-b-2 border-accent px-1 py-2 text-left"></td>
                                        <td className="w-1/12 border-2 border-accent px-1 py-1"></td>
                                        <td className="w-0.5/12 p-2 !bg-white">
                                            <Button
                                                onClick={() => {
                                                    setDataProduct(undefined);
                                                    setOpenProductModal(true);
                                                }}
                                                size={"sm"}
                                            >
                                                <Plus size={20} />
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ) : (
                            <tr className="text-base">
                                <td
                                    colSpan={5}
                                    className="w-fit border-x-2 border-b-2 border-accent px-0.5 py-2 text-center"
                                >
                                    Data Produk Belum Tersedia
                                </td>
                                <td className="w-0.5/12 p-2">
                                    <Button
                                        onClick={() => {
                                            setDataProduct(undefined);
                                            setOpenProductModal(true);
                                        }}
                                        size={"sm"}
                                        className="!px-2"
                                    >
                                        <Plus size={20} />
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Guest>
    );
}

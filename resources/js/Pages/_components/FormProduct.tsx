import { Button } from "@/Components/ui/button";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { Input } from "@/Components/ui/input";
import { DataProductTypeSchema, FormProductRequest } from "@/types/ProductType";
import { useToast } from "@/hooks/use-toast";

type FormProps = {
    onClose: () => void;
    dataLength: number;
    dataProduct?: DataProductTypeSchema;
};

const FormProduct: React.FC<FormProps> = ({
    onClose,
    dataLength,
    dataProduct,
}) => {
    const { toast } = useToast();
    const { data, setData, post, patch, processing, errors, reset } =
        useForm<FormProductRequest>({
            name: dataProduct?.name ?? "",
        });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dataProduct
            ? patch(route("edit.product.request", dataProduct.id), {
                  onError: (errors) => {
                      console.log("Error:", errors);
                  },
                  onSuccess: () => {
                      onClose();
                  },
              })
            : post(route("create.product.request"), {
                  onError: (errors) => {
                      console.log("Error:", errors);
                  },
                  onSuccess: () => {
                      onClose();
                      if (dataLength == 4) {
                          toast({
                              title: "Anda Sudah Mencapai Maksimum Input",
                          });
                      }
                  },
              });
    };

    return (
        <>
            <div className="mt-1 w-full">
                <form
                    className="flex w-full flex-col gap-1"
                    onSubmit={onSubmit}
                >
                    <div className="flex-1">
                        <Label htmlFor="name" className="relative">
                            <span className="absolute -right-2 -top-1 text-red-400">
                                *
                            </span>
                            Nama Produk
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="nama produk"
                            disabled={processing}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4 flex w-full justify-end gap-4">
                        <button
                            disabled={processing}
                            onClick={() => reset()}
                            type="reset"
                            className="group flex items-center justify-center"
                        >
                            <RotateCcw
                                size={20}
                                className="mr-2 transition-all duration-300 group-hover:-rotate-[320deg]"
                            />
                            Reset
                        </button>
                        <Button disabled={processing} type="submit">
                            {dataProduct ? "Edit" : "Tambah"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormProduct;

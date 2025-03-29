import { Button } from "@/Components/ui/button";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { Input } from "@/Components/ui/input";
import {
    DataProductCategoryTypeSchema,
    FormUploadImageRequest,
} from "@/types/ProductType";
import { useToast } from "@/hooks/use-toast";

type FormProps = {
    onClose: () => void;
    productId: number;
    dataProductCategory?: DataProductCategoryTypeSchema;
};

const FormUploadImage: React.FC<FormProps> = ({
    onClose,
    productId,
    dataProductCategory,
}) => {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } =
        useForm<FormUploadImageRequest>({
            id: dataProductCategory?.id,
            product_id: productId,
            image: null,
        });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("product-category.upload-image"), {
            preserveScroll: false,
            onError: (errors) => {
                console.log("Error:", errors);
            },
            onFinish: () => {
                onClose();
                console.log("Finis");
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
                        <Label htmlFor="image">Upload Foto</Label>
                        <div className="flex items-center justify-center gap-2 overflow-hidden">
                            <label
                                htmlFor="image"
                                className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground ${
                                    processing &&
                                    "!pointer-events-none !opacity-50"
                                }`}
                            >
                                <Plus
                                    size={16}
                                    className="relative h-4 w-4 fill-foreground"
                                />
                                Tambah Foto
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            setData("image", files[0]);
                                        }
                                    }}
                                    placeholder="upload cover"
                                    accept="image/png, image/jpeg, image/jpg"
                                    disabled={processing}
                                    className="hidden cursor-pointer"
                                />
                            </label>
                            <p className="line-clamp-1 w-full">
                                {data.image &&
                                typeof data.image !== "string" &&
                                "name" in data.image
                                    ? (data.image as File).name
                                    : typeof data.image === "string"
                                    ? data.image
                                    : "No file"}
                            </p>
                        </div>
                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="relative flex-1">
                        {data.image && (
                            <>
                                <div
                                    onClick={() => setData("image", null)}
                                    className="group absolute right-0 top-0 cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
                                >
                                    <Trash2
                                        size={18}
                                        className="text-destructive"
                                    />
                                </div>
                                <div className="mt-4 flex w-full flex-col items-center justify-center">
                                    <img
                                        src={
                                            typeof data.image === "string"
                                                ? `/storage/${data.image}`
                                                : URL.createObjectURL(
                                                      data.image as File
                                                  )
                                        }
                                        alt="Preview Foto Produk"
                                        className="max-h-40 rounded-sm object-cover"
                                    />
                                </div>
                            </>
                        )}
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
                            Upload
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormUploadImage;

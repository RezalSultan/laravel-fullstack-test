export type DataProductTypeSchema = {
    id: number;
    name: string | null;
    product_categories: DataProductCategoryTypeSchema[];
    created_at: Date;
    updated_at: Date;
};

export type DataProductCategoryTypeSchema = {
    id: number;
    desc: string | null;
    image: string | null;
    created_at: Date;
    updated_at: Date;
};

export type FormProductRequest = {
    name: string;
};

export type FormProductCategoryRequest = {
    product_id: number;
    desc: string;
    image: string | File | null;
};

export type FormUploadImageRequest = {
    id?: number;
    product_id: number;
    image: string | File | null;
};

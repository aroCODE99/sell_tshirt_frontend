export type CategoryType = {
	id: number;
	type: string;
};

export type ProductVariants = {
	id: number;
	size: string;
	quantity: number;
}

export type ProductsType = {
	id: number;
	name: string;
	price: number;
	category: CategoryType;
	description: string;
	imgPath: string;
	cloudinarPublicId: string;
	color: string;
	productVariants: ProductVariants[];
};

export type CartProduct = ProductsType & { quantity: number, size: string }

export type sizeType = "XL" | "LG" | "SM" | "XXL" | "XSM" | "M" | ""

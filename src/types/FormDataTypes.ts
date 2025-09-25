export type FormDataType = {
	email: string, password: string, username: string
}

export type ProductFormType = {
	id?: string;
	name: string;
	price: string;
	discount: number;
	description: string;
	categoryType: string;
	color: string;
	sizes: Record<string, number>;
	editMode?: boolean;
	prevImg?: string;
};

// const login = (data: Omit<FormDataType, "username">) => {
// }
//
// TODO: fix the cart Navbar closing of the cartSideBar


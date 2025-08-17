import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {CategoryType, ProductsType, CartProduct} from "../types/ProductsType";
import {API} from "../utilities/axiosInterceptor";
import type {addressType} from "../contexts/AuthContext";
import type { trackingDetailsType } from "../components/orders/TrackingDetails.tsx";

type cartProductsType = {
	id: number,
	product: ProductsType,
	quantity: number,
	size: string
}

type cartType = {
	cartId: number,
	cartProducts: cartProductsType[]
}

type cartMapType = Record<number, CartProduct>;

type orderProductType = {
	id: number,
	priceAtPurchase: number,
	quantity: number,
	product: ProductsType,
	selectedSize: string,
}
type ordersType = {
	id: number,
	orderDate: string,
	orderProducts: orderProductType[],
	totalAmount: number,
	trackingDetails: trackingDetailsType,
	updatedAt: string
}

const productById = (products: ProductsType[]) => {
	const productsMap: Record<number, ProductsType> = {};
	products.forEach((product) => {
		productsMap[product.id] = { ...product };
	});
	return productsMap;
};

const cartById = (cart: cartType) => {
	const cartMap: cartMapType = {};
	cart.cartProducts.forEach((cp) => {
		cartMap[cp.id] = { ...cp.product, quantity: cp.quantity, size: cp.size };
	});
	return cartMap;
}

export const useProducts = () => {
	const productsApiUrl = "/api/products";
	return useQuery({
		queryKey: ["products"],
		queryFn: (): Promise<ProductsType[]> => API.get(productsApiUrl).then(res => res.data),
		select: productById,
		
	})
}

export const useCategories = () => {
	const categoriesApiUrl = "/api/products/getAllCategories";
	return useQuery({
		queryKey: ["categories"],
		queryFn: (): Promise<CategoryType[]> => API.get(categoriesApiUrl).then(res => res.data)
	})
}

export const useGetCart = () => {
	const getCartUrl = "/api/cart";
	return useQuery({
		queryKey: ["cart"],
		queryFn: (): Promise<cartType> => API.get(getCartUrl).then(res => res.data),
		select: cartById
	})
};

export const useGetOrders = () => {
	const getOrdersUrl = "/api/orders";
	return useQuery({
		queryKey: ['orders'],
		queryFn: (): Promise<ordersType[]> => API.get(getOrdersUrl).then(res => res.data),
	});
}

export const useRecentOrder = () => {
	const getRecentUrl = "/api/orders/recent";
	return useQuery({
		queryKey: ['orders', 'recent'],
		queryFn: (): Promise<ordersType> => API.get(getRecentUrl).then(res => res.data)
	})
}

export const useGetAddresses = () => {
	const getAddressess = "api/address";
	return useQuery({
		queryKey: ['user_address'],
		queryFn: (): Promise<addressType[]> => API.get(getAddressess).then(res => res.data),
	})
}

export const useSaveAddress = () => {
	const queryClient = useQueryClient();
	const saveAddressUrl = "api/address";
	return useMutation({
		mutationFn: (data: addressType): Promise<addressType> => {
			return API.post(saveAddressUrl, data);
		},
		onMutate: async (variables) => {
			await queryClient.cancelQueries({ queryKey: ['user_address'] });
			const snapShotCache = queryClient.getQueryData<addressType[]>(['user_address'])
			// now add the data
			queryClient.setQueryData(['user_address'], (old) => {
				return {
					old,
					variables
				}
			})
			return { snapShotCache };
		},
		onError: (_err, _variables, context) => {
			if (context?.snapShotCache) {
				queryClient.setQueryData(['user_address'], context.snapShotCache)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user_address"] });
		}

	});
}

export const useAddToCart = () => {
	const queryClient = useQueryClient();
	const addToCartUrl = "/api/cart/addToCart";
	return useMutation({
		mutationFn: (data: {product: CartProduct}): Promise<cartType> => { 
			return API.post(addToCartUrl, { productId: data.product.id, quantity: data.product.quantity, size: data.product.size });
		},
		async onMutate(variables) {
			await queryClient.cancelQueries({ queryKey: ["cart"] });

			const prevCart = queryClient.getQueryData<cartType>(["cart"]);

			queryClient.setQueryData(['cart'], (oldCart: cartType) => {
				if (!oldCart) return { [variables.product.id]: variables.product };

				const prevProduct = oldCart.cartProducts.find(cp => {
					return cp.product.id === variables.product.id
				})

				if (prevProduct) return {
					...oldCart,
					[variables.product.id]: { ...variables.product, quantity: prevProduct.quantity + variables.product.quantity, size: variables.product.size } 
				}
			})

			return { prevCart }
		},
		onError: (_err, _variables, context) => {
			if (context?.prevCart) {
				queryClient.setQueryData(["cart"], context.prevCart);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}

export const useRemoveFromCart = () => {
	const queryClient = useQueryClient();
	const removeFromCartUrl = "/api/cart/removeFromCart";

	return useMutation({
		mutationFn: (cartProductId: number) => {
			return API.post(`${removeFromCartUrl}/${cartProductId}`)
		},
		onMutate: async (variables) => {
			queryClient.cancelQueries({ queryKey: ["cart"] });

			const snapShottedCartCach = queryClient.getQueryData<cartMapType>(['cart']);
			queryClient.setQueryData(['cart'], (oldCart: cartType) => {
				return oldCart.cartProducts.filter((cp) => cp.id !== variables)
			})
			return { snapShottedCartCach };
		},
		onError: (_err, _variables, context) => {
			if (context?.snapShottedCartCach) {
				queryClient.setQueryData(['cart'], context.snapShottedCartCach)
			}
		},
		onSettled:  () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		}
	});
};

export const useUpdateCartQuantity = () => {
	const queryClient = useQueryClient();
};

export const usePlaceOrder = () => {
	const queryClient = useQueryClient();
	const placeOrderUrl = "/api/orders/placeOrder";

	return useMutation({
		mutationFn: async (): Promise<void> => {
			const res = await API.post(placeOrderUrl);
			return res.data;
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		}
	});
};


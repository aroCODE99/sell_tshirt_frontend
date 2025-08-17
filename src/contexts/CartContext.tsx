import {createContext, useContext, useReducer, type ReactNode } from "react";
import type {ProductsType} from "../types/ProductsType";

export type cartById = Record<number, ProductsType>

export type cartType = {
	cartId: number,
}

type ActionType = 
	| { type: "SET_CART_SIDEBAR_OPEN", payload: boolean }
	| { type: "ADD_PRODUCT_TO_CART", payload: { id: number, product: ProductsType } }
	| { type: "SET_CART_PRODUCTS", payload: cartById }
	| { type: "REMOVE_FROM_CART", payload: number }

type CartStateType = {
	cart: cartById
	isCartSidebarOpen: boolean
}

type CartContextType = {
	cartState: CartStateType,
	dispatchCartAction: React.Dispatch<ActionType>,
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
	const reducerFunction = (state: CartStateType, action: ActionType): CartStateType => {
		switch (action.type) {
			case "SET_CART_SIDEBAR_OPEN":
				return { ...state, isCartSidebarOpen: action.payload };
			case "ADD_PRODUCT_TO_CART":
				return { ...state, cart: { ...state.cart, [action.payload.id]: action.payload.product }}
			case "SET_CART_PRODUCTS":
				return { ...state, cart: action.payload }
			case "REMOVE_FROM_CART":
				return { ...state, cart:  Object.values(state.cart).filter((t) => t.id !== action.payload) }
			default:
				return state
		}
	}

	const initialState = {
		cart: [],
		isCartSidebarOpen: false,
	}

	const [ cartState, dispatchCartAction] = useReducer(reducerFunction, initialState)

	return (
		<CartContext.Provider value={{ cartState, dispatchCartAction }}>
			{ children }
		</CartContext.Provider>
	)
}

export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("cannot use the useNavContext out of the context");
	}

	return context;
}

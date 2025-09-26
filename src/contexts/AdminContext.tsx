import {createContext, useContext, useReducer} from "react";
import type {ProductFormType} from "../types/FormDataTypes";
import type {tabType} from "../types/AdminTypes";

type initialStateType = {
	activeTab: tabType,
	form: ProductFormType,
	file: File | null
}

type ActionType =
	{type: "CHANGE_ACTIVE_TAB", payload: tabType} |
	{type: "CLEAR_FORM", payload: ProductFormType} |
	{type: "SET_FORM", payload: ProductFormType} |
	{type: "SET_FILE", payload: File}

type ContextType = {
	adminState: initialStateType,
	dispatch: React.Dispatch<ActionType>,
	clearForm: () => void
}

const AdminContext = createContext<ContextType | undefined>(undefined);

// i am the fastest vim guy that you will ever see 😊
export const AdminContextProvider = ({children}: {children: React.ReactNode}) => {
	const initialState: initialStateType = {
		activeTab: "products",
		form: {
			name: "",
			price: "",
			description: "",
			categoryType: "",
			color: "",
			sizes: {},
			discount: 0
		},
		file: null
	};

	const reducerFunction = (state: initialStateType, action: ActionType): initialStateType => {
		switch (action.type) {
			case "CHANGE_ACTIVE_TAB":
				return {...state, activeTab: action.payload}
			case "CLEAR_FORM":
				return {...state, form: action.payload}
			case "SET_FORM":
				return {...state, form: action.payload}
			default:
				return {...state};
		}
	}

	const [adminState, dispatch] = useReducer(reducerFunction, initialState);

	const clearForm = () => {
		dispatch({
			type: "CLEAR_FORM", payload: {
				name: "",
				description: "",
				price: "",
				discount: 0,
				categoryType: "",
				color: "",
				sizes: {},
			}
		});
	}
	return (
		<AdminContext.Provider value={{adminState, dispatch, clearForm}}>
			{children}
		</AdminContext.Provider>
	);
}

export const useAdminContext = () => {
	const context = useContext(AdminContext);
	if (!context) {
		throw new Error("Cannot use useAdmin outside of AdminContext");
	}
	return context;
}

import {createContext, useContext, useState} from "react";

type FormType = | "REGISTER" | "LOGIN" | "NONE"

type LoginContextType = {
	formType: FormType, setFormType: React.Dispatch<React.SetStateAction<FormType>>
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children : React.ReactNode }) => {

	const [formType, setFormType] = useState<FormType>("NONE");

	return (
		<LoginContext value={{ formType, setFormType }}>
			{ children }
		</LoginContext>
	);
};

export const useLoginContext = () => {
	const context = useContext(LoginContext);
	if (!context) {
		throw new Error("Cannot use the useLoginContext outside of the context");
	}

	return context;
}

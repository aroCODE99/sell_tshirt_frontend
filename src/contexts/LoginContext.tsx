import {createContext, useContext, useState, type Dispatch, type SetStateAction} from "react";

type LoginContextType = {
	showLoginForm: boolean,
	setShowLoginForm: Dispatch<SetStateAction<boolean>>,
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children : React.ReactNode }) => {

	const [showLoginForm, setShowLoginForm] = useState(false);

	return (
		<LoginContext value={{ showLoginForm, setShowLoginForm }}>
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

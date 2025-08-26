import {useLoginContext} from "../../contexts/LoginContext";
import LoginForm from "./LoginForm";
import {createPortal} from "react-dom";
import RegisterForm from "./RegisterForm";

const LoginModal = () => {
	const { formType } = useLoginContext();
	return (
		<div className={`transition-opacity duration-150 ${formType ? "opacity-100" : "opacity-0"}`}>
			{ formType !== "NONE" && (createPortal(formType === "LOGIN" ? <LoginForm /> : <RegisterForm />, document.body )) }
		</div>
	);
};

export default LoginModal;

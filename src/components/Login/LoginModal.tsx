import {toast} from "react-toastify";
import {useAuth} from "../../contexts/AuthContext";
import {useLoginContext} from "../../contexts/LoginContext";
import LoginForm from "./LoginForm";
import {createPortal} from "react-dom";

const LoginModal = () => {
	const { showLoginForm } = useLoginContext();
	const { auth } = useAuth();
	return (
		<div className={`transition-opacity duration-150 ${showLoginForm ? "opacity-100" : "opacity-0"}`}>
			{ showLoginForm && createPortal(<LoginForm />, document.body) }
		</div>
	);
};

export default LoginModal;

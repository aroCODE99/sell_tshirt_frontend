import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

const IsAdmin = () => {
	const { auth } = useAuth();
	
	console.log(auth.isAdmin);
	if (localStorage.getItem("isAdmin")) {
		return <Outlet />
	}
	
	return <Navigate to={"/shop"} />
}

export default IsAdmin;

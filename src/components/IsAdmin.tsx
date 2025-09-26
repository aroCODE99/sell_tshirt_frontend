import {Navigate, Outlet} from "react-router-dom";

const IsAdmin = () => {
	if (localStorage.getItem("isAdmin")) {
		return <Outlet />
	}
	
	return <Navigate to={"/shop"} />
}

export default IsAdmin;

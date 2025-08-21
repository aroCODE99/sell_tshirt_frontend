import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const PrivateRoute = () => {
	const { auth } = useAuth();
	const location = useLocation();

	console.log(auth);
	if (localStorage.getItem("jwt")) {
		return <Outlet />
	}

	return <Navigate to={'/'} state={{ from : location.state }}/>
};

export default PrivateRoute;

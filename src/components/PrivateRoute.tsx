import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const PrivateRoute = () => {
	const { auth } = useAuth();

	const location = useLocation();
	if (auth.isAuthenticated) {
		return <Outlet />
	}

	return <Navigate to={'/login'} state={{ from : location.state }}/>
};

export default PrivateRoute;

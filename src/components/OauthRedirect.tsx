import {Navigate, useSearchParams} from "react-router-dom";
import {useAuth, type jwtPayload} from "../contexts/AuthContext";
import {jwtDecode} from "jwt-decode";

const OauthRedirect = () => {
	const [params] = useSearchParams();
	const token = params.get("token");
	const {authDispatch, isAdmin} = useAuth();

	// then do something 
	if (token) {
		const decode = jwtDecode<jwtPayload>(token)
		const isUserAdmin = isAdmin(decode.roles);
		authDispatch({type: "LOGIN", payload: {token, roles: decode.roles, userEmail: decode.sub, username: decode.username, isAdmin: isUserAdmin}});
		return <Navigate to={'/shop'}/>
	}

	return <Navigate to={'/'} />
};


export default OauthRedirect;

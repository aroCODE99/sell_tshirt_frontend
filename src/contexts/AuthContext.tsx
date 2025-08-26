import {jwtDecode} from "jwt-decode";
import {createContext, useContext, useEffect, useReducer, type ReactNode} from "react";
import {API} from "../utilities/axiosInterceptor";
import axios from "axios";
import {toast} from "react-toastify";

type ActionType =
	| {type: "LOGIN"; payload: {token: string, roles: RoleType[], userEmail: string | undefined, username: string | undefined, isAdmin: boolean}}
	| {type: "CHANGE_DETAILS", payload: {roles: RoleType[], userEmail: string | undefined, username: string | undefined}}
	| {type: "LOGOUT"}
	| {type: "IS_ADMIN", payload: boolean}
	| {type: "ERROR", error: string}
	| {type: "CHANGE_TOKEN", payload: string}
	| {type: "CHANGE_LOADING", payload: boolean}

export type jwtPayload = {
	sub: string,
	username: string,
	roles: RoleType[],
	exp: number
}

type RoleType = {
	authority: string
};

type AuthContextType = {
	auth: AuthStateType,
	authDispatch: React.Dispatch<ActionType>,
	handleLogin: (loginData: {email: string; password: string}) => Promise<void>,
	handleLogout: () => void,
	isAdmin: (roles: RoleType[]) => boolean
}

type AuthStateType = {
	token: string | null,
	loading: boolean,
	isAuthenticated: boolean,
	userRoles: RoleType[],
	userEmail: string | undefined,
	username: string | undefined,
	isAdmin: boolean,
	error: string | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {

	const initialState: AuthStateType = {
		token: null,
		loading: false,
		isAuthenticated: false,
		userRoles: [],
		userEmail: undefined,
		username: undefined,
		isAdmin: false,
		error: undefined
	};

	const apiUrl = import.meta.env.VITE_API_URL;

	const authReducer = (state: AuthStateType, action: ActionType): AuthStateType => {
		switch (action.type) {
			case "LOGIN":
				return {
					...state,
					isAuthenticated: true,
					loading: false,
					token: action.payload.token,
					userEmail: action.payload.userEmail,
					username: action.payload.username,
					userRoles: action.payload.roles,
					isAdmin: action.payload.isAdmin
				};
			case "LOGOUT":
				return {
					...state,
					loading: false,
					isAuthenticated: false,
					token: null,
					username: undefined,
					isAdmin: false,
					error: undefined,
					userRoles: []
				};
			case "IS_ADMIN":
				return {...state, isAdmin: action.payload}
			case "ERROR":
				return {...state, error: action.error}
			case "CHANGE_TOKEN": // now do i really need this 
				return {...state, token: action.payload}
			case "CHANGE_DETAILS":
				return {
					...state, isAuthenticated: true, username: action.payload.username,
					userEmail: action.payload.userEmail, userRoles: action.payload.roles
				}
			case "CHANGE_LOADING":
				return {...state, loading: action.payload}
			default:
				return state;
		}
	};

	const [auth, authDispatch] = useReducer(authReducer, initialState);

	console.log(auth);

	const isAdmin = (roles: RoleType[]) => {
		return roles.some(r => r.authority === "ADMIN");
	}

	const handleLogin = async (loginData: {email: string; password: string}) => {
		authDispatch({type: "CHANGE_LOADING", payload: true});

		const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginData, {
			withCredentials: true,
			headers: {"Content-Type": "application/json"}
		});

		const token = res.data.token;
		localStorage.setItem("jwt", token);

		const jwtClaims = jwtDecode<jwtPayload>(token);
		const isAdmin = jwtClaims.roles.some(r => r.authority === "ADMIN");

		if (isAdmin) {
			localStorage.setItem("isAdmin", isAdmin.toString());
		}

		authDispatch({
			type: "LOGIN",
			payload: {token, roles: jwtClaims.roles, username: jwtClaims.username, userEmail: jwtClaims.sub, isAdmin}
		});
	};

	const handleLogout = async () => {
		localStorage.removeItem("jwt");
		authDispatch({type: "LOGOUT"});
		await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
			withCredentials: true,
		});
		window.location.href = "/";
		toast.error("user logged out");
	};

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (token) {
			const claims = jwtDecode<jwtPayload>(token);
			const isAdmin = claims.roles.some(role => role.authority === "ADMIN");
			if (isAdmin) {
				localStorage.setItem("isAdmin", isAdmin.toString());
			}
			authDispatch({type: "LOGIN", payload: {token, userEmail: claims.sub, username: claims.username, roles: claims.roles, isAdmin}});
		}
	}, []);

	useEffect(() => {
		const requestInterceptor = API.interceptors.request.use(
			config => {
				if (auth.token) {
					config.headers["Authorization"] = `Bearer ${auth.token}`;
				}
				return config;
			},
			error => {
				authDispatch({type: "ERROR", error: error.message});
				return Promise.reject(error);
			}
		);

		const responseInterceptor = API.interceptors.response.use(
			res => res,
			async error => {
				const originalRequest = error.config;
				console.log("this is the interceptor");
				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					try {
						const res = await axios.post(
							`${apiUrl}/auth/getAccessToken`,
							{},
							{withCredentials: true}
						);

						const {token} = res.data;
						localStorage.setItem("jwt", token);

						const claims = jwtDecode<jwtPayload>(token);
						const isAdmin = claims.roles.some(role => role.authority === "ADMIN");
						console.log(isAdmin);
						authDispatch({type: "LOGIN", payload: {token, userEmail: claims.sub, username: claims.username, roles: claims.roles, isAdmin}});
						API.defaults.headers["Authorization"] = `Bearer ${token}`;
					} catch (e) {
						localStorage.removeItem("jwt");
						localStorage.removeItem("isAdmin");
						await axios.post(`${apiUrl}/auth/logout`, {}, {withCredentials: true});
						authDispatch({type: "LOGOUT"})
						return Promise.reject(e);
					}
				}
				return Promise.reject(error);
			}
		);

		return () => {
			API.interceptors.request.eject(requestInterceptor);
			API.interceptors.response.eject(responseInterceptor);
		};
	}, [auth.token]);

	return (
		<AuthContext.Provider value={{auth, authDispatch, handleLogin, handleLogout, isAdmin}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("Cannot use useAuth outside of AuthProvider");
	}
	return context;
};


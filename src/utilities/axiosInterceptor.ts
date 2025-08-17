import axios from "axios";

const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
const apiUrl = import.meta.env.VITE_API_URL;
const refreshTokenUrl = `${apiUrl}/auth/refreshToken`;

export const API = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json"
	}
})

// now this is the request interceptors

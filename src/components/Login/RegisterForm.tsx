import {useState, type ChangeEvent} from "react";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import {IoIosClose} from "react-icons/io";
import {useLoginContext} from "../../contexts/LoginContext.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx"; // assuming you have this
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import axios, {AxiosError} from "axios";

const RegisterForm = () => {
	const {setFormType} = useLoginContext();
	const {auth, authDispatch} = useAuth();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
		confirmPassword: ""
	});
	const [passwordMissmatch, setPasswordMismatch] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => {
			const {name, value} = e.target;
			if (name === "confirmPassword") value !== prev.password ? setPasswordMismatch(true) : setPasswordMismatch(false);
			else value !== prev.confirmPassword ? setPasswordMismatch(true) : setPasswordMismatch(false);
			return {
				...prev,
				[name]: value
			}
		});

	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const {confirmPassword, ...sendData} = formData;
		const registerUrl = `${import.meta.env.VITE_API_URL}/auth/register`;
		try {
			await axios.post(registerUrl, sendData, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json"
				}
			});
			toast.success("User Regiseterd Successfully");
		} catch (e: any) {
			console.error(e.message)
			toast.error(e.message);
		}
		setFormType("LOGIN");
	};

	return (
		<div className="w-full h-screen fixed top-0 left-0 z-[100] flex justify-center items-center">
			{/* dark overlay */}
			<div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

			<div className="w-full max-w-md border border-gray-300 shadow-xl rounded-2xl p-6 bg-white relative animate-fadeIn">
				<button
					onClick={() => setFormType("NONE")}
					className="text-4xl absolute right-[-50px] top-[-50px] bg-gray-50 opacity-50 rounded-full hover:bg-gray-300 cursor-pointer"
					aria-label="Close"
				>
					<IoIosClose />
				</button>
				<h2 className="text-3xl font-semibold text-center mb-6 italic text-gray-800">
					Welcome Sir
				</h2>

				<form onSubmit={handleSubmit}>
					<input
						id="email"
						name="email"
						type="text"
						placeholder="Enter your email"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<input
						id="username"
						name="username"
						type="text"
						placeholder="Enter your username"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
						value={formData.username}
						onChange={handleChange}
						required
					/>

					<input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4
							${passwordMissmatch && "border-red-300"}
						`}
						value={formData.password}
						onChange={handleChange}
						required
					/>

					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Enter Password again"
						className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4
							${passwordMissmatch && "border-red-400"}
						`}
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>

					{passwordMissmatch && <p className="mb-4 text-red-400 ">Passwords do not match </p>}

					<button
						type="submit"
						className={`w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-slate-900 transition duration-200
							${passwordMissmatch && "opacity-50 cursor-not-allowed"}
						`}
						disabled={passwordMissmatch}
					>
						{auth.loading ? <ClipLoader color="white" size={20} /> : "Submit"}
					</button>
				</form>

				<div className="mt-4 flex gap-4">
					<button className="w-1/2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg cursor-pointer transition-all">
						<FaGoogle className="text-xl" />
						<span className="text-sm font-medium">Google</span>
					</button>

					<button className="w-1/2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg cursor-pointer transition-all">
						<FaFacebook className="text-xl" />
						<span className="text-sm font-medium">Facebook</span>
					</button>
				</div>

				<p
					onClick={() => setFormType("LOGIN")}
					className="flex justify-center items-center mt-8 hover:underline cursor-pointer italic transition-all">
					Already register ? login here
				</p>
			</div>

			<style >{`
			@keyframes fadeIn {
				from {
					opacity: 0;
					transform: scale(0.95);
				}
				to {
					opacity: 1;
					transform: scale(1);
				}
			}
			.animate-fadeIn {
				animation: fadeIn 0.2s ease-out forwards;
			}
			`}</style>
		</div>
	);
};

export default RegisterForm;

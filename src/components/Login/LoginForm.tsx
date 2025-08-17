import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useLoginContext } from "../../contexts/LoginContext.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx"; // assuming you have this
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";

const LoginForm = () => {
	const { setShowLoginForm } = useLoginContext();
	const { auth, authDispatch, handleLogin } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await handleLogin({ email, password });
			navigate("/shop");
		} catch (e: any) {
			toast.error(e.message);
			console.error(e)
			authDispatch({ type: "CHANGE_LOADING", payload: false });
			return;
		}

		setShowLoginForm(false);
	};

	return (
		<div className="w-full h-screen fixed top-0 left-0 z-[100] flex justify-center items-center">
			{/* dark overlay */}
			<div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

			<div className="w-full max-w-md border border-gray-300 shadow-xl rounded-2xl p-6 bg-white relative animate-fadeIn">
				<button 
					onClick={() => setShowLoginForm(false)}
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
						type="text"
						placeholder="Enter your email"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<input
						id="password"
						type="password"
						placeholder="Enter your password"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button
						type="submit"
						className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-slate-900 transition duration-200 cursor-pointer"
					>
						{ auth.loading ? <ClipLoader color="white" size={20} /> : "Submit" }
					</button>
				</form>

				<p className="mt-6 text-center text-gray-500 italic text-lg">
					Or login with
				</p>

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

export default LoginForm;

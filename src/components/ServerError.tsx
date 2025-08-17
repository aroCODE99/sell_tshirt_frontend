import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ServerError = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
			<FaExclamationTriangle className="text-6xl text-red-500 mb-6" />
			<h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
			<p className="text-gray-400 max-w-md text-center mb-8">
				We encountered an unexpected error on our server. Please try again later or return to the homepage.
			</p>
			<div className="flex gap-4">
				<button
					onClick={() => navigate("/")}
					className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
				>
					Go Home
				</button>
				<button
					onClick={() => window.location.reload()}
					className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
				>
					Retry
				</button>
			</div>
		</div>
	);
};

export default ServerError;


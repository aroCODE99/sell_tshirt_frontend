import {motion} from "framer-motion";

type PropsType = {
	condition: boolean;
	title: string;
	description: string;
	onClose: () => void;
	handleMainSubmit: () => void;
};

const Modal = ({condition, title, description, onClose, handleMainSubmit}: PropsType) => {
	if (!condition) return null;

	const wrapperHandleMainSubmit = () => {
		handleMainSubmit();
		onClose();
	};

	return (
		<motion.div
			className="fixed inset-0 z-99 flex items-center justify-center"
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 0.3}}
		>
			{/* Overlay */}
			<motion.div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm"
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: 0.3}}
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="relative bg-white rounded-2xl p-6 w-96 shadow-2xl transform transition-all duration-200">
				<h2 className="text-lg font-bold mb-4 text-gray-900 border-b pb-2">{title}</h2>
				<p className="mb-6 text-gray-700">{description}</p>

				<div className="flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
					>
						Cancel
					</button>
					<button
						onClick={wrapperHandleMainSubmit}
						className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
					>
						Confirm
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default Modal;


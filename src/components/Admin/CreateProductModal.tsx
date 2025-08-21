import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { sizings } from "../Shop/ProductPage";

type AddProductModalProps = {
	showCreateProductModal: boolean;
	onClose: () => void;
	onSubmit: (formData: FormData) => void;
	form: {
		name: string;
		price: string;
		description: string;
		categoryType: string;
		color: string;
		sizes: string[];
	};
	file: File | null;
	setForm: React.Dispatch<React.SetStateAction<any>>;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const CreateProductModal = ({
	showCreateProductModal,
	onClose,
	onSubmit,
	form,
	setForm,
	file,
	setFile,
}: AddProductModalProps) => {

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev: any) => ({ ...prev, [name]: value }));
	};

	const handleSizeChange = (size: string) => {
		setForm((prev: any) => {
			const exists = prev.sizes.includes(size);
			return {
				...prev,
				sizes: exists ? prev.sizes.filter((s: string) => s !== size) : [...prev.sizes, size],
			};
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", form.name);
		formData.append("price", form.price);
		formData.append("description", form.description);
		formData.append("categoryType", form.categoryType);
		formData.append("color", form.color);
		if (file) formData.append("imgUrl", file);
		form.sizes.forEach((size: string) => formData.append("sizes", size));

		onSubmit(formData);
		onClose();
	};


	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<AnimatePresence>
			{showCreateProductModal && (
				<motion.div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-99 p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-100">
							<h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
							<button
								onClick={onClose}
								className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
							>
								<X size={20} className="text-gray-500" />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="p-6 space-y-5">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								{/* Left Column */}
								<div className="space-y-5">
									{/* Product Name */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Product Name
										</label>
										<input
											name="name"
											value={form.name}
											onChange={handleChange}
											placeholder="e.g., Premium T-Shirt"
											className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
											required
										/>
									</div>

									{/* Price */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Price (₹)
										</label>
										<input
											name="price"
											type="number"
											value={form.price}
											onChange={handleChange}
											placeholder="0.00"
											min="0"
											step="0.01"
											className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
											required
										/>
									</div>

									{/* Category */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Category
										</label>
										<input
											name="categoryType"
											value={form.categoryType}
											onChange={handleChange}
											placeholder="category...."
											className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
											required
										/>
									</div>

									{/* Color */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Color
										</label>
										<input
											name="color"
											value={form.color}
											onChange={handleChange}
											placeholder="e.g., Navy Blue"
											className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
										/>
									</div>
								</div>

								{/* Right Column */}
								<div className="space-y-5">
									{/* Description */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Description
										</label>
										<textarea
											name="description"
											value={form.description}
											onChange={handleChange}
											placeholder="Describe the product features and details..."
											rows={4}
											className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
										/>
									</div>

									{/* Sizes */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Available Sizes
										</label>
										<div className="flex flex-wrap gap-2">
											{sizings.map((size) => (
												<button
													key={size}
													type="button"
													onClick={() => handleSizeChange(size)}
													className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
														form.sizes.includes(size)
															? "bg-blue-100 text-blue-800 border-blue-200"
															: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
													}`}
												>
													{size}
												</button>
											))}
										</div>
									</div>

									{/* File Upload */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Product Image
										</label>
										<label
											htmlFor="file-upload"
											className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
										>
											{file ? (
												<>
													<ImageIcon size={32} className="text-blue-500 mb-2" />
													<p className="text-sm font-medium text-gray-700 truncate">
														{file.name}
													</p>
													<p className="text-xs text-gray-500 mt-1">
														Click to change
													</p>
												</>
											) : (
												<>
													<Upload size={32} className="text-gray-400 mb-2" />
													<p className="text-sm font-medium text-gray-700">
														Upload product image
													</p>
													<p className="text-xs text-gray-500 mt-1">
														PNG, JPG up to 10MB
													</p>
												</>
											)}
										</label>
										<input
											id="file-upload"
											type="file"
											accept="image/*"
											onChange={handleFileChange}
											className="hidden"
										/>
									</div>
								</div>
							</div>

							{/* Buttons */}
							<div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
								<button
									type="button"
									onClick={onClose}
									className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
								>
									Create Product
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CreateProductModal;

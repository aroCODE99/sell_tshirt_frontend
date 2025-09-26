import {motion, AnimatePresence} from "framer-motion";
import {Upload, Image as ImageIcon} from "lucide-react";
import {sizings} from "../Shop/ProductPage";
import type {ProductFormType} from "../../types/FormDataTypes";
import CreateProductModalHeader from "./CreateProductModalHeader";
import ProductModalSizeChange from "./ProductModalSizeChange";
import {useAdminContext} from "../../contexts/AdminContext";
import {useEffect} from "react";

type AddProductModalProps = {
	showCreateProductModal: boolean;
	onClose: () => void;
	onSubmit: (formData: FormData) => void;
	onUpdate: (formData: FormData) => void;
};

const CreateProductModal = ({
	showCreateProductModal,
	onClose,
	onSubmit,
	onUpdate,
}: AddProductModalProps) => {

	const {adminState, dispatch} = useAdminContext();
	const form = adminState.form;
	const file = adminState.file;
	console.log(form);

	useEffect(() => {
		return () => {
			if (form.prevImg && form.prevImg.startsWith('blob:')) {
				URL.revokeObjectURL(form.prevImg);
			}
		};
	}, [form.prevImg]);

	// i think this will work 😊
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const {name, value} = e.target;
		dispatch({type: "SET_FORM", payload: {...form, [name]: value}});
	};

	const handleSizeChange = (selectedSize: string) => {
		console.log("Now again something is not working");
		const getNewForm = (prev: ProductFormType) => {
			const exists = Object.entries(prev.sizes ?? {}).find(([size, _]) =>
				selectedSize === size
			);
			return {
				...prev,
				sizes: exists ? Object.fromEntries(Object.entries(prev.sizes ?? {}).filter(([size, _]) =>
					size !== selectedSize)) : {...prev.sizes, [selectedSize]: 50}
			};
		};
		const newForm = getNewForm(form);
		dispatch({type: "SET_FORM", payload: newForm});
	};

	const handleSizeInputChange = (selectedSize: string, stock: number) => {
		const getNewForm = (prev: ProductFormType) => {
			const updatedSizes = {...prev.sizes};
			if (updatedSizes[selectedSize] !== undefined) {
				updatedSizes[selectedSize] = stock;
			}
			return {
				...prev,
				sizes: updatedSizes
			};
		};

		const newForm = getNewForm(form);
		dispatch({type: "SET_FORM", payload: newForm});
	};

	// now let's fix this first
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			dispatch({type: "SET_FILE", payload: selectedFile});

			// getTheNew form
			const imageUrl = URL.createObjectURL(selectedFile);
			const getNewForm = (prev: ProductFormType) => ({
				...prev,
				prevImg: imageUrl
			});

			if (form.editMode) {
				const newForm = getNewForm(form);
				dispatch({type: "SET_FORM", payload: newForm});
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", form.name);
		formData.append("price", form.price);
		formData.append("discount", String(form.discount));
		formData.append("description", form.description);
		formData.append("categoryType", form.categoryType);
		formData.append("color", form.color);
		if (adminState.file) formData.append("imgUrl", adminState.file);
		if (form.id) formData.append("id", form.id);

		// sizes Json
		const sizesJson = JSON.stringify(
			Object.fromEntries(
				Object.entries(form.sizes).map(([size, quantity]) => [size, String(quantity)])
			)
		);
		formData.append("sizes", sizesJson);

		form.editMode ? onUpdate(formData) : onSubmit(formData);
		onClose();
	};

	return (
		<AnimatePresence>
			{showCreateProductModal && (
				<motion.div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-99 p-4"
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					onClick={onClose}
				>
					<motion.div
						className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
						initial={{scale: 0.9, opacity: 0, y: 20}}
						animate={{scale: 1, opacity: 1, y: 0}}
						exit={{scale: 0.9, opacity: 0, y: 20}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header - Updated to show appropriate title */}
						<CreateProductModalHeader
							onClose={onClose}
							isEditMode={form.editMode}
						/>

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

									{/* Discount (%) */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Discount (%)
										</label>
										<input
											name="discount"
											type="number"
											value={form.discount}
											onChange={handleChange}
											placeholder="0%"
											min="0"
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
									<ProductModalSizeChange
										sizings={sizings}
										handleSizeChange={handleSizeChange}
										form={form}
										handleSizeInputChange={handleSizeInputChange}
									/>

									{/* File Upload - Updated for edit mode */}
									{!form.editMode ? (
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
									) : (
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1.5">
												Product Image
											</label>
											{form.prevImg && (
												<div className="mb-4">
													<p className="text-sm text-gray-600 mb-2">Current Image:</p>
													<img
														src={form.prevImg}
														className="max-w-full max-h-[200px] object-contain border rounded-lg"
														alt="Current product"
													/>
												</div>
											)}
											<label
												htmlFor="file-upload-edit"
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
															{file ? 'Change product image' : 'Upload product image'}
														</p>
														<p className="text-xs text-gray-500 mt-1">
															PNG, JPG up to 10MB
														</p>
													</>
												)}
											</label>
											<input
												id="file-upload-edit"
												type="file"
												accept="image/*"
												onChange={handleFileChange}
												className="hidden"
											/>
										</div>
									)}
								</div>
							</div>

							{/* Buttons - Updated button text for edit mode */}
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
									{form.editMode ? 'Update Product' : 'Create Product'}
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

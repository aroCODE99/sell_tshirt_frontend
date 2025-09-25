import {X} from "lucide-react";

const CreateProductModalHeader = ({ onClose, isEditMode }: { onClose: () => void, isEditMode: boolean | undefined}) => {
	return (
		<div className="flex items-center justify-between p-6 border-b border-gray-100">
			<h2 className="text-xl font-bold text-gray-900">
				{!isEditMode ? "Add New Product" : `Update Product` }</h2>
			<button
				onClick={onClose}
				className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
			>
				<X size={20} className="text-gray-500" />
			</button>
		</div>
	);
}

export default CreateProductModalHeader;

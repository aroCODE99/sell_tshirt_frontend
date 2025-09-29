import {useCreateProduct, useMakeFeatureProduct, useUpdateProduct} from "../../hooks/Queries";
import {createPortal} from "react-dom";
import CreateProductModal from "./CreateProductModal";
import AdminSidebar from "./AdminSidebar";
import {ClipLoader} from "react-spinners";
import Modal from "../Modal";
import {useAdminContext} from "../../contexts/AdminContext";
import {Outlet} from "react-router-dom";

const AdminPage = () => {
	const {mutate: makeFeatureProduct} = useMakeFeatureProduct();

	const {mutate: createProduct, isPending} = useCreateProduct();
	const {mutate: updateProduct} = useUpdateProduct();

	const {adminState, dispatch, clearForm} = useAdminContext();
	const activeProduct = adminState.activeProduct;
	const form = adminState.form;
	const showModal = adminState.showFeatureModal;

	console.log(activeProduct);
	const confirmFeaturedChange = () => {
		if (activeProduct) {
			makeFeatureProduct(activeProduct.id);
		}
		dispatch({type: "SET_ACTIVE_PRODUCT", payload: null});
	};

	const handleAddProduct = (formData: any) => {
		createProduct(formData);
	}

	const handleUpdateProduct = (formData: any) => {
		updateProduct(formData);
	}

	if (isPending)
		return (
			<div className="h-screen flex justify-center items-center bg-gray-50">
				<ClipLoader size={40} color="#3B82F6" />
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800 flex">

			{/* Sidebar */}
			<AdminSidebar />

			{/* Main Content */}
			<Outlet />

			{createPortal(
				<Modal
					condition={showModal}
					title="Change Featured Status"
					description={`Do you want to ${activeProduct?.featured ? "remove" : "mark"} ${activeProduct?.name} as a Featured Product?`}
					onClose={() => {
						dispatch({type:"SET_SHOW_FEATURED_MODAL", payload:false})
					}}
					handleMainSubmit={confirmFeaturedChange}
				/>,
				document.body
			)}

			{createPortal(
				<CreateProductModal
					onClose={() => {
						if (form.editMode) clearForm();
						dispatch({type: "SET_SHOW_CREATE_MODAL_FORM", payload: false})
					}}
					onSubmit={(form: any) => handleAddProduct(form)}
					onUpdate={(form: any) => handleUpdateProduct(form)}
				/>, document.body)}

		</div>
	);
};

export default AdminPage;

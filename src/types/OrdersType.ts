import type {ProductsType} from "./ProductsType"
import type {trackingDetailsType} from "./TrackingDetailsType"

export type orderProductType = {
	id: number,
	priceAtPurchase: number,
	quantity: number,
	product: ProductsType,
	selectedSize: string,
}

export type ordersType = {
	id: number,
	orderDate: string,
	orderProducts: orderProductType[],
	totalAmount: number,
	trackingDetails: trackingDetailsType,
	updatedAt: string
}

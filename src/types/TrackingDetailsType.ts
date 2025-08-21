import type {addressType} from "./UserType";

export type trackingDetailsType = {
	id: number;
	status: string;
	updatedAt: string;
	addresses: addressType;
};


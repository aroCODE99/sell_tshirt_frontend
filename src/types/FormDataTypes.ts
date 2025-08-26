export type FormDataType = {
	email: string, password: string, username: string
}

const login = (data: Omit<FormDataType, "username">) => {
}


export interface Column {
	label: string;
	fieldName: string;
	size: string;
}

export interface User {
	_id?: string;
	isActive?: boolean;
	balance?: string;
	age?: string;
	eyeColor?: string;
	name?: string;
	gender?: string;
	company?: string;
	email?: string;
	phone?: string;
	address?: string;
}
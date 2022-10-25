import axios from 'axios';
import { FilterParams, SearchParams, SortParams } from './features/Users/users-slice';
import { User } from './components/UserList/UserList.interface';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const searchUsers = async (searchParams: SearchParams, sortParams: SortParams, filterParams: FilterParams) => {
	const url = `${BASE_URL}/api/user/search`;
	const params = configParams(searchParams, sortParams, filterParams);

	const res = await axios.get(url, { params });
	return res.data;
}

export const createUser = async (user: User) => {
	const url = `${BASE_URL}/api/user/`;

	const res = await axios.post(url, user);
	return res.data;
}

export const updateUser = async (user: User) => {
	const url = `${BASE_URL}/api/user/${user._id}`;

	const res = await axios.put(url, user);
	return res.data;
}

export const deleteUser = async (id: string) => {
	const url = `${BASE_URL}/api/user/${id}`;

	const res = await axios.delete(url);
	return res.data;
}

const configParams = (searchParams: SearchParams, sortParams: SortParams, filterParams: FilterParams) => {
	const params = {
		skip: searchParams.skip || 0,
		limit: searchParams.limit || 10,
		isActive: filterParams.isActive,
		ageFrom: filterParams.ageFrom,
		ageTo: filterParams.ageTo,
		balanceFrom: filterParams.balanceFrom,
		balanceTo: filterParams.balanceTo,
		searchInput: searchParams.searchInput,
		sortByIsActive: sortParams.isActive,
		sortByBalance: sortParams.balance,
		sortByAge: sortParams.age,
		sortByEyeColor: sortParams.eyeColor,
		sortByName: sortParams.name,
		sortByGender: sortParams.gender,
		sortByCompany: sortParams.company,
		sortByEmail: sortParams.email,
		sortByPhone: sortParams.phone,
		sortByAddress: sortParams.address,
	};

	Object.keys(params).forEach(key => {
		if (params[key] === '' || params[key] === null || params[key] === undefined) {
			delete params[key];
		}
	});

	return params;
}

export type Api = {
	deleteUser: (id: string) => void;
	updateUser: (user: User) => User;
	createUser: (user: User) => User;
	searchUsers: (searchParams: SearchParams, sortParams: SortParams, filterParams: FilterParams) => SearchUsersResponse;
};

export interface SearchUsersResponse {
	users: User[];
	userAmount: number;
}
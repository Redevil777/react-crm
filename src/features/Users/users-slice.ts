import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../components/UserList/UserList.interface';
import { NotificationManager } from 'react-notifications';
import { RootState, TypedDispatch } from '../../store';
import { Api, SearchUsersResponse } from '../../api';
import { AxiosError } from 'axios';

export const initialState: UsersState = {
	filters: {
		status: 'all',
		ageFrom: '',
		ageTo: '',
		balanceFrom: '',
		balanceTo: ''
	},
	list: [],
	userAmount: 0,
	searchParams: {
		skip: 0,
		limit: 50,
	},
	sortParams: {
		isActive: null,
		balance: null,
		age: null,
		eyeColor: null,
		name: null,
		gender: null,
		company: null,
		email: null,
		phone: null,
		address: null,
	},
	loading: false,
}

export const searchUsers = createAsyncThunk<
	SearchUsersResponse,
	undefined,
	{
		state: RootState,
		extra: {
			api: Api
		}
	}
	>(
	'@@users/search-users',
	async (_, { getState, extra: { api } } ) => {
		try {
			const state = getState().users;
			return await api.searchUsers(state.searchParams, state.sortParams, state.filters) as SearchUsersResponse;
		} catch (err) {
			const error = err as AxiosError;
			console.log(error.message)
			return {
				users: [],
				userAmount: 0,
			}
		}
	}
)

export const createUser = createAsyncThunk<
	void,
	User,
	{
		dispatch: TypedDispatch,
		extra: {
			api: Api
		}
	}
	>(
	'@@users/create-user',
	async (user, { extra: { api }, dispatch }) => {
		try {
			await api.createUser(user);
			dispatch(searchUsers());
		} catch (e) {
			console.log(e);
		}
	}
)

export const updateUser = createAsyncThunk<
	void,
	User,
	{
		dispatch: TypedDispatch,
		extra: {
			api: Api
		}
	}
	>(
	'@@users/update-user',
	async (user, { extra: { api }, dispatch }) => {
		try {
			await api.updateUser(user);
			NotificationManager.success('Successfully updated');
			dispatch(searchUsers());
		} catch (e) {
			console.log(e);
		}
	}
)

export const deleteUser = createAsyncThunk<
	void,
	string | undefined,
	{
		dispatch: TypedDispatch,
		extra: {
			api: Api
		}
	}
	>(
	'@@users/delete-user',
	async (id = '', { extra: { api }, dispatch }) => {
		try {
			await api.deleteUser(id);
			NotificationManager.success('Successfully deleted');
			dispatch(searchUsers());
		} catch (e) {
			console.log(e);
		}
	}
)

const usersSlice = createSlice({
	initialState,
	name: '@@users',
	reducers: {
		updateFilters(state: UsersState, action: PayloadAction<FilterParams>) {
			const { status } = action.payload;
			state.filters.status = action.payload.status;
			if (status === 'all') {
				state.filters.isActive = null;
			} else if (status === 'active') {
				state.filters.isActive = true;
			} else if (status === 'inactive') {
				state.filters.isActive = false;
			}
			state.filters.ageFrom = action.payload.ageFrom;
			state.filters.ageTo = action.payload.ageTo;
			state.filters.balanceFrom = action.payload.balanceFrom;
			state.filters.balanceTo = action.payload.balanceTo;
		},
		updateSearchInput(state: UsersState, action: PayloadAction<SearchParams>) {
			state.searchParams.searchInput = action.payload.searchInput;
			// searchUsers();
		},
		updateSearchParams(state: UsersState, { payload }) {
			const { name, value } = payload;
			state.searchParams[name] = value;
		},
		updateSortParams(state: UsersState, { payload }) {
			const currentValue = state.sortParams[payload];
			if (!currentValue) {
				state.sortParams[payload] = 1;
			} else if (currentValue === 1) {
				state.sortParams[payload] = -1;
			} else {
				state.sortParams[payload] = null;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchUsers.fulfilled, (state, { payload }) => {
				state.list = payload.users;
				state.userAmount = payload.userAmount;
				state.loading = false;
			})
			.addCase(searchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
	}
});

export const usersReducer = usersSlice.reducer;
export const { updateSearchInput, updateFilters, updateSortParams, updateSearchParams } = usersSlice.actions;

export const selectFilters = ({ users }) => users.filters;
export const selectSortParams = ({ users }) => users.sortParams;
export const selectSearchParams = ({ users }) => users.searchParams;
export const selectUsers = ({ users }) => users.list;
export const selectUserAmount = ({ users }) => users.userAmount;
export const selectLoading = ({ users }) => users.loading;

export interface FilterParams {
	status?: 'all' | 'active' | 'inactive';
	isActive?: true | false | null;
	ageFrom?: string;
	ageTo?: string;
	balanceFrom?: string;
	balanceTo?: string;
}

export interface SearchParams {
	skip: number;
	limit: 25 | 50 | 100 | 200;
	searchInput?: string;
}

type SortType =  '+1' | '-1' | null;

export interface SortParams {
	isActive?: SortType;
	balance?: SortType;
	age?: SortType;
	eyeColor?: SortType;
	name?: SortType;
	gender?: SortType;
	company?: SortType;
	email?: SortType;
	phone?: SortType;
	address?: SortType;
}

export type UsersState = {
	list: User[],
	filters: FilterParams;
	searchParams: SearchParams;
	userAmount: number,
	sortParams: SortParams;
	loading: boolean;
	error?: Error | null;
}

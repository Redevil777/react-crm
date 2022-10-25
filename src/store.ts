import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { usersReducer } from './features/Users/users-slice';
import * as api from './api';

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
		thunk: {
			extraArgument: { api }
		}
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
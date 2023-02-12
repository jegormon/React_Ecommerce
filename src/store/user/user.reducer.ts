import { AnyAction } from 'redux';

import { USER_ACTION_TYPES } from './user.types';

import {
	signInFailed,
	signUpFailed,
	signOutFailed,
	SignOutSuccess,
	signInSuccess,
	signOutSuccess,
} from './user.action';

import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

// The reducer function that will return a new object with user
export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
	if (signInSuccess.match(action)) {
		return {
			...state,
			currentUser: action.payload,
		};
	}

	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	if (
		signOutFailed.match(action) ||
		signInFailed.match(action) ||
		signUpFailed.match(action)
	) {
		return { ...state, error: action.payload };
	}

	return state;
};

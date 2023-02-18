import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocument } from '../../utils/firebase/firebase.utils';

import {
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
} from './categories.action';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

// Saga for fetching categories from firebase
export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield* call(getCategoriesAndDocument);
		yield* put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		yield* put(fetchCategoriesFailed(error as Error));
	}
}

// Takelatest will take latest START action, and initialize the subsequent method
export function* onFetchCategories() {
	yield* takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	yield* all([call(onFetchCategories)]);
}

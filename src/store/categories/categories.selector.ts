import { createSelector } from 'reselect';

import { RootState } from '../store';

import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.types';

const selectCategoriesReducer = (state: RootState): CategoriesState =>
	state.categories;

export const selectCategories = createSelector(
	// Arr of input selector, that contains data for processing
	[selectCategoriesReducer],
	// Output from above^ will be arg for this func.
	(categoriesSlice) => categoriesSlice.categories
);

// Memoized selector, will rerender the component if the data
// is actually changed. Received memoized state
export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories): CategoryMap =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoriesReducer],
	(categoriesSlice) => categoriesSlice.isLoading
);

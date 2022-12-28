import { createSelector } from 'reselect';

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector(
  // Arr of input selector, that contains data for processing
  [selectCategoriesReducer],
  // Output from above^ will be arg for this func.
  (categoriesSlice) => categoriesSlice.categories
);

// Memoized selector, will rerender the component if the data
// is actually changed. Recieved memoized state
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

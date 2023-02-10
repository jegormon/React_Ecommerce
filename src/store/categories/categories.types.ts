// Enum(enumerable) is an extended data structure, usable as object
// Only difference is that is has fixed values
export enum CATEGORIES_ACTION_TYPES {
	FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
	FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
	FETCH_CATEGORIES_ERROR = 'category/FETCH_CATEGORIES_ERROR',
}

export type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type Category = {
	title: string;
	imageUrl: string;
	items: CategoryItem[];
};

export type CategoryMap = {
	[key: string]: CategoryItem[];
};

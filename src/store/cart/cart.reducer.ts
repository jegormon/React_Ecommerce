import { AnyAction } from 'redux';
import { CartItem } from './cart.types';

import { setIsCartOpen, setCartItems } from './cart.action';

export type CartState = {
	isCartOpen: boolean;
	cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

// A reducer should not handle any business logic,
// only set the obj with values
export const cartReducer = (
	state = CART_INITIAL_STATE,
	action: AnyAction
): CartState => {
	if (setIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload,
		};
	}

	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload,
		};
	}

	return state;
};

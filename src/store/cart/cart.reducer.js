import CART_ACTION_TYPES from './cart.types';

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

// A reducer should not handle any business logic,
// only set the obj with values
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};

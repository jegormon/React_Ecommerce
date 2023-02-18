import { FC } from 'react';

import {
	CardItemContainer,
	ItemDetails,
	CartItemImage,
} from './cart-item.styles';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
	cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	console.log(cartItem);
	return (
		<CardItemContainer>
			<CartItemImage imageUrl={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<span>{name}</span>
				<span>
					{quantity} x &#x20AC;{price}
				</span>
			</ItemDetails>
		</CardItemContainer>
	);
};

export default CartItem;

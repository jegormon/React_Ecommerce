import { FC, memo } from 'react';

import {
	CardItemContainer,
	ItemDetails,
	CartItemImage,
} from './cart-item.styles';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
	cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	console.log(cartItem);
	return (
		<CardItemContainer>
			<CartItemImage src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<span>{name}</span>
				<span>
					{quantity} x &#x20AC;{price}
				</span>
			</ItemDetails>
		</CardItemContainer>
	);
});

export default CartItem;

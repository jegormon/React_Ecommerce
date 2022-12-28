import {
  CardItemContaienr,
  ItemDetails,
  CartItemImage,
} from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  console.log(cartItem);
  return (
    <CardItemContaienr>
      <CartItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x &#x20AC;{price}
        </span>
      </ItemDetails>
    </CardItemContaienr>
  );
};

export default CartItem;

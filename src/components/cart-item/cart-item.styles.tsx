import styled from 'styled-components';

type CartItemImageProps = {
	src: string;
};

export const ItemDetails = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 10px 20px;

	.name {
		font-size: 16px;
	}
`;

export const CardItemContainer = styled.div`
	width: 100%;
	display: flex;
	height: 80px;
	margin-bottom: 15px;
`;

export const CartItemImage = styled.img<CartItemImageProps>`
	width: 30%;
	background-image: ${({ src }) => `url($imageUrl)`};
`;

import styled from 'styled-components';

export const CategoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 25px;

	@media screen and (max-width: 800px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const CategoryTitle = styled.h2`
	font-size: 28px;
	margin-bottom: 25px;
	cursor: pointer;
	text-align: center;
`;

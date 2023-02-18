import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import {
	CategoryItemContainer,
	Body,
	BackgroundImage,
} from './category-item.styles';

import { Category } from '../categories/categories.component';

type CategoryItemProps = {
	category: Category;
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<CategoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</CategoryItemContainer>
	);
};

export default CategoryItem;

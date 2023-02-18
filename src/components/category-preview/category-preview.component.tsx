import { FC } from 'react';

import ProductCard from '../product-card/product-card.component';

import {
	CategoryPreviewContainer,
	CategoryTitle,
	ProductsPreviewContainer,
} from './category-preview.styles';

import { CategoryItem } from '../../store/categories/categories.types';

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<CategoryTitle to={title}>{title}</CategoryTitle>
			</h2>

			<ProductsPreviewContainer>
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</ProductsPreviewContainer>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;

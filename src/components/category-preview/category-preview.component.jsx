import ProductCard from '../product-card/product-card.component';

import {
  CaterogyPreviewContainer,
  CategoryTitle,
  ProductsPreviewContianer,
} from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {
  return (
    <CaterogyPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{title}</CategoryTitle>
      </h2>

      <ProductsPreviewContianer>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ProductsPreviewContianer>
    </CaterogyPreviewContainer>
  );
};

export default CategoryPreview;

import { useNavigate } from 'react-router-dom';

import {
  CategoryItemConteiner,
  Body,
  BackgroundImage,
} from './category-item.styles.jsx';

const CategoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <CategoryItemConteiner onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemConteiner>
  );
};

export default CategoryItem;

import './CategoryCard.module.scss';

interface CategoryCardProps {
  image: string;
  title: string;
  isBold?: boolean;
}

export const CategoryCard = ({ image, title, isBold }: CategoryCardProps) => {
  return (
    <div className="category-card">
      <div className="category-card__image-wrapper">
        <img src={image} alt={title} />
      </div>
      <h3 className={`category-card__title ${isBold ? 'bold-category' : 'normal-category'}`}>
        {title}
      </h3>
    </div>
  );
};
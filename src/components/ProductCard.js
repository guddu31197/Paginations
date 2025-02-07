const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <button>{title}</button>
    </div>
  );
};
export default ProductCard;

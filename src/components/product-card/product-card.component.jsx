import { useContext } from "react";

import "./product-card.styles.scss";
import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;

  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="product-card-container">
      <img alt={name} src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={() => addItemToCart(product)}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;

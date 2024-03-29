import { useContext } from "react";

import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartContext } from "../../context/cart.context";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;

  const { addItemToCart } = useContext(CartContext);

  return (
    <ProductCardContainer>
      <img alt={name} src={imageUrl} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => addItemToCart(product)}
      >
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;

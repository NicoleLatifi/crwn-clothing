import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../context/cart.context";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <div className="cart-items">
          {cartItems.map((item) => {
            return <CartItem cartItem={item} key={item.id} />;
          })}
        </div>
        <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
      </div>
    </div>
  );
};

export default CartDropdown;

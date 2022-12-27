import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      {products &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Shop;

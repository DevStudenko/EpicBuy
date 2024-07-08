import Product from "../Product";
import { useSelector } from "react-redux";
import { getProductsArray } from '../../../redux/products';

const ProductsList = () => {
  const products = useSelector(getProductsArray);
  // Get all available products (quantity > 0)
  const availableProducts = products.filter(product => product.quantity > 0)

  return (
    <div>
      {availableProducts
        .map(({ id, name, preview_img_url, price, avgRating, quantity }) => (
          <Product
            key={id}
            id={id}
            name={name}
            preview_img_url={preview_img_url}
            price={price}
            avgRating={avgRating}
          />
        ))}
    </div>
  );
}

export default ProductsList;

import Product from "../Product";
import { useSelector } from "react-redux";
import { getProductsArray } from '../../../redux/products';

const ProductsList = () => {
  const products = useSelector(getProductsArray);

  return (
    <div>
      {products.map(({ id, name, preview_img_url, price, avgRating }) => (
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

export default ProductsList

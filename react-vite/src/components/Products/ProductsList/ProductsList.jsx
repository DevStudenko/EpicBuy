import { useSelector } from 'react-redux';
import Product from '../Product';
import { getProductsArray } from '../../../redux/products';
import styles from './ProductsList.module.css';

const ProductsList = () => {
  const products = useSelector(getProductsArray);
  const availableProducts = products.filter(product => product.quantity > 0);

  return (
    <div className={styles.productsList}>
      {availableProducts.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          preview_img_url={product.preview_img_url}
          price={product.price}
          avgRating={product.avgRating}
        // onEdit={onEdit}
        // onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductsList;

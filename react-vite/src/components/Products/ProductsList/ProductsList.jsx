import { useSelector } from 'react-redux';
import Product from '../Product';
import { getProductsArray } from '../../../redux/products';

const ProductsList = ({ onEdit, onDelete }) => {
  const products = useSelector(getProductsArray);
  const availableProducts = products.filter(product => product.quantity > 0);

  return (
    <div>
      {availableProducts.map((product) => (
        <div key={product.id} className="product-item">
          <Product
            id={product.id}
            name={product.name}
            preview_img_url={product.preview_img_url}
            price={product.price}
            avgRating={product.avgRating}
          />
          <button onClick={() => onEdit(product)}>Update</button>
          <button onClick={() => onDelete(product)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;

import { useSelector } from 'react-redux';
import AdminProductItem from '../AdminProductItem';
import { getProductsArray } from '../../../../redux/products';
import styles from './AdminProductList.module.css';

const AdminProductList = () => {
    const products = useSelector(getProductsArray);
    const availableProducts = products.filter(product => product.quantity > 0);

    return (
        <div className={styles.adminProductsList}>
            {availableProducts.map((product) => (
                <AdminProductItem
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default AdminProductList;

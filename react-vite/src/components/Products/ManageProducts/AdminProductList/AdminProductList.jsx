import { useSelector } from 'react-redux';
import AdminProductItem from '../AdminProductItem';
import { getProductsArray } from '../../../../redux/products';
import styles from './AdminProductList.module.css';

const AdminProductList = () => {
    const products = useSelector(getProductsArray);

    return (
        <div className={styles.adminProductsList}>
            {products.map((product) => (
                <AdminProductItem
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default AdminProductList;

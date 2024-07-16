import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminProductList from './AdminProductList';
import { useModal } from '../../../context/Modal';
import CreateProduct from './CreateProduct';
import { getAllProductsThunk } from '../../../redux/products';
import styles from './ManageProducts.module.css';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);

    const handleAddProduct = () => {
        setModalContent(<CreateProduct />);
    };

    return (
        <div className={styles.manageProducts}>
            <h1>Manage Products</h1>
            <button onClick={handleAddProduct} className={styles.addProductButton}>Create Product</button>
            <AdminProductList />
        </div>
    );
};

export default ManageProducts;

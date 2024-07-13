import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AdminProductList from '../AdminProductList';
import { useModal } from '../../../context/Modal';
import CreateProduct from '../../Products/CreateProduct';
import { getAllProductsThunk } from '../../../redux/products';
import styles from './ManageProducts.module.css';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const [showInventory, setShowInventory] = useState(false);

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);

    const handleAddProduct = () => {
        setModalContent(<CreateProduct />);
    };

    const handleManageInventory = () => {
        setShowInventory(true);
    };

    return (
        <div className={styles.manageProducts}>
            <h1>Manage Products</h1>
            <button onClick={handleAddProduct} className={styles.addProductButton}>Create Product</button>
            <button onClick={handleManageInventory} className={styles.manageInventoryButton}>Manage Inventory</button>
            {showInventory && <AdminProductList />}
        </div>
    );
};

export default ManageProducts;

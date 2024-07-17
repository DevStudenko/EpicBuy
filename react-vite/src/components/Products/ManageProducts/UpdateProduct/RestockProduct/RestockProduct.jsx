import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductThunk } from '../../../../../redux/products';
import { useModal } from '../../../../../context/Modal';
import styles from './RestockProduct.module.css';

const RestockProduct = ({ product }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            quantity: parseInt(quantity),
        };

        const response = await dispatch(updateProductThunk(updatedProduct));

        if (!response.errors) {
            closeModal();
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Restock Product</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Available Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.submit}>Restock</button>
            </form>
        </div>
    );
};

export default RestockProduct;

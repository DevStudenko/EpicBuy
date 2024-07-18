import { useDispatch } from 'react-redux';
import { createProductThunk } from '../../../../redux/products';
import { useState } from 'react';
import styles from './CreateProduct.module.css';
import { useModal } from '../../../../context/Modal';

const CreateProduct = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImgUrl, setPreviewImgUrl] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!name.trim()) errors.name = 'Name cannot be empty or whitespace.';
        if (!description.trim()) errors.description = 'Description cannot be empty or whitespace.';
        if (!previewImgUrl.trim()) errors.previewImgUrl = 'Preview Image URL cannot be empty or whitespace.';
        if (price <= 0) errors.price = 'Price must be greater than 0.';
        if (quantity <= 0) errors.quantity = 'Quantity must be greater than 0.';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const newProduct = {
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            preview_img_url: previewImgUrl.trim(),
            quantity: parseInt(quantity)
        };

        const serverResponse = await dispatch(createProductThunk(newProduct));

        if (!serverResponse) {
            setErrors({ error: 'Something went wrong. Please try again.' });
        } else if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
            return;
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Product</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                {errors.name && <p className={styles.error}>{errors.name}</p>}
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className={styles.textarea}
                    />
                </label>
                {errors.description && (
                    <p className={styles.error}>{errors.description}</p>
                )}
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                {errors.price && <p className={styles.error}>{errors.price}</p>}
                <label>
                    Preview Image URL
                    <input
                        type="text"
                        value={previewImgUrl}
                        onChange={(e) => setPreviewImgUrl(e.target.value)}
                        className={styles.input}
                    />
                </label>
                {errors.previewImgUrl && (
                    <p className={styles.error}>{errors.previewImgUrl}</p>
                )}
                <label>
                    Quantity
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
                {errors.error && (
                    <p className={styles.error}>{errors.error}</p>
                )}
                <button type="submit" className={styles.submit}>Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;

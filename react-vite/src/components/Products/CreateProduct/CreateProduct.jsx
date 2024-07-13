import { useDispatch } from 'react-redux';
import { createProductThunk } from '../../../redux/products';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './CreateProduct.module.css';

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImgUrl, setPreviewImgUrl] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            preview_img_url: previewImgUrl,
            quantity: parseInt(quantity)
        };

        console.log(newProduct);
        const serverResponse = await dispatch(createProductThunk(newProduct));

        if (!serverResponse) {
            setErrors({ error: 'Something went wrong. Please try again.' });
        } else if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            navigate('/');
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
                        className={styles.input}
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

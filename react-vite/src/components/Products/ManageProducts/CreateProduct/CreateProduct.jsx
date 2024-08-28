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
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch('/api/images/new', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('Upload response:', data);

        if (response.ok) {
            setPreviewImgUrl(data.url); // Use the URL returned by the server
            setErrors({});
        } else {
            setErrors({ previewImgUrl: 'Failed to upload image. Please try again.' });
        }

        setIsUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!name.trim()) validationErrors.name = 'Name cannot be empty or whitespace.';
        if (!description.trim()) validationErrors.description = 'Description cannot be empty or whitespace.';
        if (!previewImgUrl) validationErrors.previewImgUrl = 'Image is required and must be uploaded before submitting.';
        if (price <= 0) validationErrors.price = 'Price must be greater than 0.';
        if (quantity <= 0) validationErrors.quantity = 'Quantity must be greater than 0.';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newProduct = {
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            preview_img_url: previewImgUrl,  // Use the S3 URL returned from the image upload
            quantity: parseInt(quantity)
        };

        console.log('!!!!!!!!!!!!!!!New Product', newProduct);
        const serverResponse = await dispatch(createProductThunk(newProduct));
        console.log('!!!!!!!!!!!!!!!serverReponse is: ', serverResponse);

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
                    Preview Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className={styles.input}
                    />
                    {isUploading && <p>Uploading image...</p>}
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
                <button type="submit" className={styles.submit} disabled={isUploading}>Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;

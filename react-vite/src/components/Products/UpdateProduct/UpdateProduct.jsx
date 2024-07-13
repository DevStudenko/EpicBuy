import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductThunk } from '../../../redux/products';
import styles from './UpdateProduct.module.css';

const UpdateProduct = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [previewImgUrl, setPreviewImgUrl] = useState(product.preview_img_url);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: product.id,
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      preview_img_url: previewImgUrl,
    };

    console.log('updatedProduct: ', updatedProduct)
    const serverResponse = await dispatch(updateProductThunk(updatedProduct));
    console.log('Server Res: ', serverResponse);

    if (!serverResponse) {
      setErrors({ error: 'Something went wrong. Please try again.' });
    } else if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      alert('Product updated successfully');
      onClose();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Update Product</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p className={styles.error}>{errors.name}</p>}
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p className={styles.error}>{errors.description}</p>}
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        {errors.price && <p className={styles.error}>{errors.price}</p>}
        <label>
          Quantity
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
        <label>
          Preview Image URL
          <input
            type="text"
            value={previewImgUrl}
            onChange={(e) => setPreviewImgUrl(e.target.value)}
          />
        </label>
        {errors.previewImgUrl && <p className={styles.error}>{errors.previewImgUrl}</p>}
        {errors.error && <p className={styles.error}>{errors.error}</p>}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

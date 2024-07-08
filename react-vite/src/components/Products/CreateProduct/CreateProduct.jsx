import { useDispatch } from 'react-redux';
import { createProductThunk } from '../../redux/products';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProduct.module.css';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImgUrl, setPreviewImgUrl] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      preview_img_url: previewImgUrl,
    };

    const serverResponse = await dispatch(createProductThunk(newProduct));

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Product</h1>
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
          />
        </label>
        {errors.price && <p className={styles.error}>{errors.price}</p>}
        <label>
          Preview Image URL
          <input
            type="text"
            value={previewImgUrl}
            onChange={(e) => setPreviewImgUrl(e.target.value)}
          />
        </label>
        {errors.previewImgUrl && (
          <p className={styles.error}>{errors.previewImgUrl}</p>
        )}
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;

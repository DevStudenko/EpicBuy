import { useDispatch } from 'react-redux';
import { deleteProductThunk } from '../../../../redux/products';

const ConfirmationModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteProductThunk(product.id));
    onClose();
  };

  return (
    <div className="confirmation-modal">
      <p>Are you sure you want to delete {product.name}?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default ConfirmationModal;

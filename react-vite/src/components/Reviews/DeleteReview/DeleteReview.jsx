import { useDispatch } from 'react-redux';
import { removeReviewThunk } from '../../../redux/reviews';
import { useModal } from '../../../context/Modal';
import { getProductByIdThunk } from '../../../redux/products';
import styles from './DeleteReview.module.css';


const DeleteReview = ({ review }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(removeReviewThunk(review.id));
        dispatch(getProductByIdThunk(review.product_id))
        closeModal();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Delete Review</h1>
            <p className={styles.confirm}>Are you sure you want to delete this review?</p>
            <div className={styles.buttons}>
                <button className={styles.yes} onClick={handleDelete}>Yes</button>
                <button className={styles.no} onClick={closeModal}>No</button>
            </div>
        </div>
    );
};

export default DeleteReview;

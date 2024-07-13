import { useDispatch } from 'react-redux';
import { removeReviewThunk } from '../../../redux/reviews';
import { useModal } from '../../../context/Modal';
import styles from './DeleteReview.module.css';

const DeleteReview = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(removeReviewThunk(reviewId));
        closeModal();
    };

    return (
        <div className={styles.container}>
            <h1>Delete Review</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
};

export default DeleteReview;

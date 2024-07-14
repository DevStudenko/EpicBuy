import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviewThunk } from '../../../redux/reviews';
import { useModal } from '../../../context/Modal';
import styles from './UpdateReview.module.css';
import StarRating from '../StarRating/StarRating';
import { getProductByIdThunk } from '../../../redux/products';

const UpdateReview = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const review = useSelector(state => state.review[reviewId]);
    const [rating, setRating] = useState(review.rating);
    const [reviewText, setReviewText] = useState(review.review);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedReview = { id: reviewId, rating, review: reviewText };

        const response = await dispatch(updateReviewThunk(reviewId, updatedReview));
        if (response.errors) {
            setErrors(response.errors);
        } else {
            dispatch(getProductByIdThunk(response.product_id));
            closeModal();
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Update Review</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Rating
                    <StarRating setRating={setRating} />
                </label>
                <label>
                    Review
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                {errors.review && <p className={styles.error}>{errors.review}</p>}
                <button type="submit" className={styles.submit}>Update</button>
            </form>
        </div>
    );
};

export default UpdateReview;

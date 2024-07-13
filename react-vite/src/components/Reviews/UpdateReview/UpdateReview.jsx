import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviewThunk } from '../../../redux/reviews';
import { useModal } from '../../../context/Modal';
import styles from './UpdateReview.module.css';

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
            closeModal();
        }
    };

    return (
        <div className={styles.container}>
            <h1>Update Review</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Review
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                </label>
                {errors.review && <p className={styles.error}>{errors.review}</p>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateReview;

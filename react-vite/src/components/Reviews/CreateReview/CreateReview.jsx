import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewThunk } from '../../../redux/reviews';
import { getProductByIdThunk } from '../../../redux/products';
import { useModal } from '../../../context/Modal';
import StarRating from '../StarRating/StarRating';
import styles from './CreateReview.module.css';

const CreateReview = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!review.trim()) {
            setErrors({ review: 'Review cannot be empty or whitespace.' });
            return;
        }

        if (rating <= 0) {
            setErrors({ rating: 'Rating must be provided.' });
            return;
        }

        const newReview = { product_id: productId, rating, review: review.trim() };

        const response = await dispatch(addReviewThunk(newReview));
        if (response.errors) {
            setErrors(response.errors);
        } else {
            dispatch(getProductByIdThunk(productId));
            closeModal();
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Write a Review</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Rating
                    <StarRating setRating={setRating} />
                </label>
                <label>
                    Review
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                {errors.review && <p className={styles.error}>{errors.review}</p>}
                {errors.rating && <p className={styles.error}>{errors.rating}</p>}
                <button type="submit" className={styles.submit}>Submit</button>
            </form>
        </div>
    );
};

export default CreateReview;

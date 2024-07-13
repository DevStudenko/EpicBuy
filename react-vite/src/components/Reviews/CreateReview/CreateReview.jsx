import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewThunk } from '../../../redux/reviews';
import { useModal } from '../../../context/Modal';
import styles from './CreateReview.module.css';

const CreateReview = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = { product_id: productId, rating, review };

        const response = await dispatch(addReviewThunk(newReview));
        if (response.errors) {
            setErrors(response.errors);
        } else {
            closeModal();
        }
    };

    return (
        <div className={styles.container}>
            <h1>Write a Review</h1>
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
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                {errors.review && <p className={styles.error}>{errors.review}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateReview;

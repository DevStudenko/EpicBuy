import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateReview from './UpdateReview';
import DeleteReview from './DeleteReview';
import styles from './ReviewItem.module.css';
import { IoStar } from "react-icons/io5";

const ReviewItem = ({ review }) => {
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.reviewItem}>
            <p><strong>{review.username}</strong>: {review.review}</p>
            <p>Rating: <IoStar className={styles.review__starIcon} />{review.rating ? review.rating.toFixed(1) : "New"}</p>
            {user && review.user_id === user.id && (
                <div className={styles.reviewButtons}>
                    <OpenModalButton
                        buttonText="Update"
                        modalComponent={<UpdateReview reviewId={review.id} />}
                    />
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteReview reviewId={review.id} />}
                    />
                </div>
            )}
        </div>
    );
}

export default ReviewItem;

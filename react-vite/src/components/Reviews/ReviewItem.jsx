import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateReview from './UpdateReview';
import DeleteReview from './DeleteReview';
import styles from './ReviewItem.module.css';
import { IoStar } from "react-icons/io5";

const ReviewItem = ({ review }) => {
    const user = useSelector(state => state.session.user);

    const renderStars = (rating) => {
        return (
            <div className={styles.stars}>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <IoStar
                            key={i}
                            className={styles.review__starIcon}
                            color={ratingValue <= rating ? "#ffc107" : "grey"}
                            size={20}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className={styles.reviewItem}>
            <div className={styles.reviewAuthor}>{review.username}</div>
            <div>{renderStars(review.rating)}</div>
            <p className={styles.reviewText}>{review.review}</p>
            {user && review.user_id === user.id && (
                <div className={styles.reviewButtons}>
                    <OpenModalButton
                        buttonText="Update"
                        modalComponent={<UpdateReview reviewId={review.id} />}
                        className={styles.reviewUpdate}
                    />
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteReview review={review} />}
                        className={styles.reviewDelete}
                    />
                </div>
            )}
        </div>
    );
};

export default ReviewItem;

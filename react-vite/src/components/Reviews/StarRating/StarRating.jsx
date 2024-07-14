import { useState } from "react";
import { IoStar } from "react-icons/io5";
import styles from './StarRating.module.css';

const StarRating = ({ setRating }) => {
    const [hover, setHover] = useState(null);
    const [rating, setLocalRating] = useState(null);

    const handleClick = (ratingValue) => {
        setLocalRating(ratingValue);
        setRating(ratingValue);
    };

    return (
        <div className={styles.ratingContainer}>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i} className={styles.starLabel}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleClick(ratingValue)}
                            className={styles.radioInput}
                        />
                        <IoStar
                            className={styles.star}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "grey"}
                            size={20}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;

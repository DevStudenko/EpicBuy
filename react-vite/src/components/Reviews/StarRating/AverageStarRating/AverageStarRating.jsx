import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import styles from './AverageStarRating.module.css';

const AverageStarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div className={styles.starRating}>
            {[...Array(fullStars)].map((_, i) => (
                <IoStar key={`full-${i}`} className={styles.star} color="#ffc107" />
            ))}
            {[...Array(halfStars)].map((_, i) => (
                <IoStarHalf key={`half-${i}`} className={styles.star} color="#ffc107" />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <IoStarOutline key={`empty-${i}`} className={styles.star} color="#ffc107" />
            ))}
        </div>
    );
};

export default AverageStarRating;

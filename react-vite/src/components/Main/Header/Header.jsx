import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <video autoPlay muted loop>
                <source src="https://epic-buy-bucket.s3.us-east-2.amazonaws.com/FROST+Gaming+PC.mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Header;

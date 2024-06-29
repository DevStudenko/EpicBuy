import Navigation from './Navigation';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <Navigation />
            <video autoPlay muted loop>
                <source src="/assets/video/FROST Gaming PC.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Header;

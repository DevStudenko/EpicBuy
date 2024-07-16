import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.socialIcons}>
                <a href="https://www.linkedin.com/in/denis-studenko-a822a4127" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                    <FaLinkedin size={30} />
                </a>
                <a href="https://github.com/DevStudenko" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                    <FaGithub size={30} />
                </a>
                <a href="mailto:dstudenko@gmail.com" className={styles.icon}>
                    <FaEnvelope size={30} />
                </a>
            </div>
            <p className={styles.footerText}>© 2024 Denis Studenko. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

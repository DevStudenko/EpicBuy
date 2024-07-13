import styles from './AdminProductItem.module.css';
import OpenModalButton from '../../../OpenModalButton';
import UpdateProduct from '../UpdateProduct';
import DeleteProduct from '../DeleteProduct';

const AdminProductItem = ({ product }) => {
    return (
        <div className={styles.adminProductItem}>
            <div className={styles.productDetails}>
                <img src={product.preview_img_url} alt={`${product.name}`} />
                <div>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productRating}>Rating: {product.avgRating ? product.avgRating.toFixed(1) : "New"}</div>
                    <div className={styles.productPrice}>${product.price}</div>
                </div>
            </div>
            <div className={styles.adminButtons}>
                <OpenModalButton
                    buttonText="Update"
                    modalComponent={<UpdateProduct product={product} />}
                    className={styles.updateButton}
                />
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteProduct product={product} />}
                    className={styles.deleteButton}
                />
            </div>
        </div>
    );
};

export default AdminProductItem;

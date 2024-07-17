import styles from './AdminProductItem.module.css';
import OpenModalButton from '../../../OpenModalButton';
import UpdateProduct from '../UpdateProduct';
import DeleteProduct from '../DeleteProduct';
import RestockProduct from '../UpdateProduct/RestockProduct';
import AverageStarRating from '../../../Reviews/StarRating/AverageStarRating';

const AdminProductItem = ({ product }) => {
    return (
        <div className={`${styles.adminProductItem} ${product.quantity === 0 ? styles.soldOut : ''}`}>
            <div className={styles.productDetails}>
                <img className={styles.adminProduct__img} src={product.preview_img_url} alt={`${product.name}`} />
                <div className={styles.adminProductInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productRating}>
                        {product.avgRating ? <AverageStarRating rating={product.avgRating} /> : "New"}
                    </div>
                    <div className={styles.productPrice}>${product.price}</div>
                    {product.quantity === 0 && <div className={styles.soldOutNotice}>Sold Out</div>}
                </div>
            </div>
            <div className={styles.adminButtons}>
                {product.quantity === 0 ? (
                    <OpenModalButton
                        buttonText="Restock"
                        modalComponent={<RestockProduct product={product} />}
                        className={styles.restockButton}
                    />
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminProductItem;

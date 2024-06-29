import { useSelector } from "react-redux";
import { getProductsArray } from '../../redux/products';
import { getReviewsArray } from "../../redux/reviews";
import styles from './Products.module.css'

const ProductsList = () => {
    // const dispatch = useDispatch();
    const products = useSelector(getProductsArray);
    const reviews = useSelector(getReviewsArray);

    return (
        <main className={styles.main}>
            <div className={styles.products__container}>
                {products.map(({ id, name, price, rating, preview_img_url }) => (
                    <div
                        className={styles.product}
                        title={name}
                        key={id}
                    >
                        <img src={preview_img_url} />
                        <div className={styles.product__info}>
                            <p>{name}</p>
                            <p className={styles.product__price}>{price}</p>
                            <p className={styles.product__rating}>{rating}</p>
                        </div>
                        <button>Add to Basket</button>
                    </div>
                ))}

            </div>
        </main>
    );
}

export default ProductsList

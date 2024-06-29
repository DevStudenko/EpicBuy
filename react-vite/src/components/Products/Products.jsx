import { useSelector } from "react-redux";
import { getProductsArray } from '../../redux/products';
import { IoStar } from "react-icons/io5";
import styles from './Products.module.css'

const ProductsList = () => {
    // const dispatch = useDispatch();
    const products = useSelector(getProductsArray);


    return (
        <main className={styles.main}>
            <div className={styles.products__container}>
                {products.map(({ id, name, price, avgRating, preview_img_url }) => (
                    <div
                        className={styles.product}
                        title={name}
                        key={id}
                    >
                        <img src={preview_img_url} />
                        <div className={styles.product__info}>
                            <div className={styles.product__name}>{name}</div>
                            <div className={styles.product__price}>${price}</div>
                            <div className={styles.product__rating}><IoStar className={styles.product__starIcon} />{avgRating ? avgRating.toFixed(1) : "New"}</div>
                        </div>
                        <button>Add to Basket</button>
                    </div>
                ))}

            </div>
        </main>
    );
}

export default ProductsList


import { useSelector } from "react-redux";
import { getProductsArray } from '../../redux/products';
import styles from './Products.module.css'

const ProductsList = () => {
    // const dispatch = useDispatch();
    const products = useSelector(getProductsArray)

    return (
        <main className={styles.main}>
            <div className={styles.products__container}>
                {products.map((product) => {
                    const src = product.preview_img_url;
                    return (
                        <div
                            className={styles.product}
                            title={product.name}
                            key={product.id}
                        >
                            <div className={styles.product__info}>
                                <p>{product.name}</p>
                                <p className={styles.product__price}>{product.price}</p>
                            </div>

                            <img src={src} />
                            <button>Add to Basket</button>
                        </div>
                    );
                })}

            </div>
        </main>
    );
}

export default ProductsList

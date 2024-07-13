import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import styles from "./DeleteProduct.module.css";
import { deleteProductThunk, getAllProductsThunk } from "../../../redux/products";

const DeleteProduct = ({ product }) => {
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      await dispatch(deleteProductThunk(product.id));
      await dispatch(getAllProductsThunk());
      closeModal();
    } catch (e) {
      setErrors({ error: "An unexpected error occurred" });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>You are about to delete product:</div>
      <div className={styles.product_name}>{product.name}</div>
      <div className={styles.confirm}>Are you sure?</div>
      <div className={styles.error}>{errors.error && errors.error}</div>
      <div className={styles.buttons}>
        <button onClick={onClick} className={styles.yes}>
          Yes
        </button>
        <button className={styles.no} onClick={closeModal}>
          No
        </button>
      </div>
    </main>
  );
};

export default DeleteProduct;

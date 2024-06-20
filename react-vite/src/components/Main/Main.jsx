// import styles from "./Main.module.css";
// import LoginFormModal from "../Auth/LoginFormModal";
// import SignupFormModal from "../Auth/SignupFormModal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProductsThunk } from "../../redux/products";
import ProductsList from "../Products";


function MainComponent() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch])

    return (
        <>
            <ProductsList />
        </>
    )
}

export default MainComponent

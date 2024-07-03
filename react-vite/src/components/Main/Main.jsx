// import styles from "./Main.module.css";
// import LoginFormModal from "../Auth/LoginFormModal";
// import SignupFormModal from "../Auth/SignupFormModal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialLoadThunk } from "../../redux/initial_load";
import ProductsList from "../Products/ProductsList";



function MainComponent() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(initialLoadThunk());
    }, [dispatch])

    return (
        <>
            <ProductsList />
        </>
    )
}

export default MainComponent

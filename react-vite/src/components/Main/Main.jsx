import styles from "./Main.module.css";
import LoginFormModal from "../Auth/LoginFormModal";
import SignupFormModal from "../Auth/SignupFormModal";
import { useSelector, useDispatch } from "react-redux";
import { useDebugValue, useEffect, useState } from "react";
import { getProductsArray } from "../../redux/products";
import { getAllProductsThunk } from "../../redux/products";


function MainComponent() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch])

    return (
        <div>Main</div>
    )
}

export default MainComponent

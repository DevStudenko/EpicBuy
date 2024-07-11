import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialLoadThunk } from "../../redux/initial_load";
import ProductsList from "../Products/ProductsList";
import Header from "./Header/Header";



function MainComponent() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(initialLoadThunk());
    }, [dispatch])

    return (
        <>
            <Header />
            <ProductsList />
        </>
    )
}

export default MainComponent

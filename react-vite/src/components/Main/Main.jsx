import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialLoadThunk } from "../../redux/initial_load";
import ProductsList from "../Products/ProductsList";
import Header from "./Header/Header";
import { getAllCartItemsThunk } from "../../redux/cart";
import { getPurchasesThunk } from "../../redux/purchases";
import { useSelector } from "react-redux";
import { getAllFavoritesThunk } from "../../redux/favorites";


function MainComponent() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initialLoadThunk());
        if (user) {
            dispatch(getAllCartItemsThunk());
            dispatch(getPurchasesThunk());
            dispatch(getAllFavoritesThunk());
        }
    }, [user, dispatch])

    return (
        <>
            <Header />
            <ProductsList />
        </>
    )
}

export default MainComponent

import { GET_ALL as GET_ALL_PRODUCTS } from "./products";
import { GET_ALL as GET_ALL_CART_ITEMS } from "./cart";
import { GET_ALL as GET_ALL_REVIEWS } from "./reviews";


// Action creator utility
const action = (type, payload) => ({
    type,
    payload,
});

// Initial load thunk
export const initialLoadThunk = () => async (dispatch) => {
    try {
        const response = await fetch("/api/initial_load");
        if (response.ok) {
            const data = await response.json();
            const { products, cartItems, reviews } = data;

            // Dispatch actions for each type of data
            dispatch(action(GET_ALL_PRODUCTS, products));
            dispatch(action(GET_ALL_CART_ITEMS, cartItems));
            dispatch(action(GET_ALL_REVIEWS, reviews));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

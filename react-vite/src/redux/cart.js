import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

export const GET_ALL = "cart/getAll";
export const ADD_ITEM = "cart/addItem";
export const UPDATE_ITEM = "cart/updateItem";
export const DELETE_ITEM = "cart/deleteItem";

//! --------------------------------------------------------------------
//*                         Action Creator
//! --------------------------------------------------------------------

const action = (type, payload) => ({
    type,
    payload,
});

//! --------------------------------------------------------------------
//*                             Thunks
//! --------------------------------------------------------------------

export const getAllCartItemsThunk = () => async (dispatch) => {
    try {
        const response = await fetch("/api/cart");
        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_ALL, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const addItemToCartThunk = (itemData) => async (dispatch) => {
    try {
        const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(ADD_ITEM, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateCartItemThunk = (cartItemId, quantity) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cart/${cartItemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(UPDATE_ITEM, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const removeCartItemThunk = (cartItemId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cart/${cartItemId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(action(DELETE_ITEM, cartItemId));
        }
    } catch (error) {
        console.log(error);
    }
};

//! --------------------------------------------------------------------
//*                            Selectors
//! --------------------------------------------------------------------

export const getCartItemsArray = createSelector(
    (state) => state.cart,
    (cart) => Object.values(cart)
);

//! --------------------------------------------------------------------
//*                            Reducer
//! --------------------------------------------------------------------

const initialState = {};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL: {
            const newState = {};
            action.payload.forEach((item) => {
                newState[item.id] = item;
            });
            return newState;
        }
        case ADD_ITEM: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case UPDATE_ITEM: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case DELETE_ITEM: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
};

export default cartReducer;

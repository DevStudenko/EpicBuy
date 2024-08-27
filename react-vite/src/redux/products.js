import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

export const GET_ALL = "products/getAll";
export const GET_ONE = "products/getById";
export const CREATE = "products/create";
export const UPDATE = "products/update";
export const DELETE = "products/delete";

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

export const getAllProductsThunk = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/products`);
        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_ALL, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

//! --------------------------------------------------------------------
export const createProductThunk = (productData) => async (dispatch) => {
    try {
        console.log(productData);
        const response = await fetch("/api/products", {
            method: "POST",
            body: productData,
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(CREATE, data));
            return data;
        } else {
            const errorData = await response.json();
            return errorData.errors;
        }
    } catch (error) {
        console.log(error);
    }
};


//! --------------------------------------------------------------------

export const deleteProductThunk = (product) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${product.id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            dispatch(action(DELETE, product));
        }
    } catch (error) {
        console.log(error);
    }
};

//! --------------------------------------------------------------------

export const updateProductThunk = (productId, formData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(UPDATE, data));
            return data;
        } else {
            const errorData = await response.json();
            return errorData.errors;
        }
    } catch (error) {
        console.log(error);
    }
};

//! --------------------------------------------------------------------
export const getProductByIdThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_ONE, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

//! --------------------------------------------------------------------
//*                            Selectors
//! --------------------------------------------------------------------
export const getProductsArray = createSelector(
    (state) => state.product,
    (product) => {
        let arr = [];
        for (const key in product) {
            if (Number.isInteger(Number(key))) {
                arr.push(product[key]);
            }
        }
        return arr;
    }
);

//! --------------------------------------------------------------------
//*                            Reducer
//! --------------------------------------------------------------------

const initialState = {};
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL: {
            const newState = { ...state };
            action.payload.forEach((product) => (newState[product.id] = product));
            return newState;
        }
        case CREATE:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case GET_ONE: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case DELETE: {
            let newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
};

export default productReducer;

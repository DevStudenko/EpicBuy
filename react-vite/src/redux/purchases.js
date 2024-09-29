import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------
const MAKE_PURCHASE = 'purchases/makePurchase';
const GET_ALL = 'purchases/getPurchases';

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

export const purchaseItemsThunk = (cartItems) => async (dispatch) => {
    try {
        const response = await fetch('/api/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(MAKE_PURCHASE, data));
            return data;
        } else {
            const error = await response.json();
            console.error('Error purchasing items:', error.message);
            return { errors: error.message };
        }
    } catch (error) {
        console.error('Error purchasing items:', error);
        return { errors: 'Something went wrong. Please try again.' };
    }
};
//! --------------------------------------------------------------------

export const getPurchasesThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/purchases');

        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_ALL, data));
            return data;
        } else {
            const error = await response.json();
            console.error('Error fetching purchases:', error.message);
            return { errors: error.message };
        }
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return { errors: 'Something went wrong. Please try again.' };
    }
};

//! --------------------------------------------------------------------
//*                            Selectors
//! --------------------------------------------------------------------

export const getPurchasesArray = createSelector(
    (state) => state.purchase,
    (purchases) => Object.values(purchases)
);

//! --------------------------------------------------------------------
//*                            Reducer
//! --------------------------------------------------------------------
const initialState = {};
const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL: {
            const newState = { ...state };
            action.payload.forEach((purchase) => (newState[purchase.id] = purchase));
            return newState;
        }
        case MAKE_PURCHASE:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

export default purchaseReducer;

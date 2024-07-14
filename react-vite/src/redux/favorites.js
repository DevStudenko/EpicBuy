import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

export const GET_ALL_FAVORITES = "favorites/getAll";
export const ADD_FAVORITE = "favorites/add";
export const REMOVE_FAVORITE = "favorites/remove";

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
export const getAllFavoritesThunk = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/favorites`);
        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_ALL_FAVORITES, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
//! --------------------------------------------------------------------
export const addFavoriteThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/favorites/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: productId }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(ADD_FAVORITE, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
//! --------------------------------------------------------------------
export const removeFavoriteThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/favorites/${productId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(action(REMOVE_FAVORITE, productId));
        }
    } catch (error) {
        console.log(error);
    }
};

//! --------------------------------------------------------------------
//*                            Selectors
//! --------------------------------------------------------------------
export const getFavoritesArray = createSelector(
    (state) => state.favorite,
    (favorites) => Object.values(favorites)
);

//! --------------------------------------------------------------------
//*                            Reducer
//! --------------------------------------------------------------------

const initialState = {};

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FAVORITES: {
            const newState = {};
            action.payload.forEach((favorite) => {
                newState[favorite.id] = favorite;
            });
            return newState;
        }
        case ADD_FAVORITE: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case REMOVE_FAVORITE: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
};

export default favoriteReducer;

import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

const GET_ALL = "reviews/getAll";
const ADD_REVIEW = "reviews/addReview";
const UPDATE_REVIEW = "reviews/updateReview";
const DELETE_REVIEW = "reviews/deleteReview";

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

export const getAllReviewsThunk = () => async (dispatch) => {
    try {
        const response = await fetch("/api/reviews");
        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_ALL, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const addReviewThunk = (reviewData) => async (dispatch) => {
    try {
        const response = await fetch("/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(ADD_REVIEW, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateReviewThunk = (reviewId, reviewData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(UPDATE_REVIEW, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const removeReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(action(DELETE_REVIEW, reviewId));
        }
    } catch (error) {
        console.log(error);
    }
};

//! --------------------------------------------------------------------
//*                            Selectors
//! --------------------------------------------------------------------

export const getReviewsArray = createSelector(
    (state) => state.reviews,
    (reviews) => Object.values(reviews)
);

//! --------------------------------------------------------------------
//*                            Reducer
//! --------------------------------------------------------------------

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL: {
            const newState = {};
            action.payload.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        }
        case ADD_REVIEW: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case UPDATE_REVIEW: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;

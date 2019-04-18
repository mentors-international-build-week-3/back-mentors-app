import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";



// creates a new user
export const signupUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => history.push("/login")) // re-directs to the login page if signup was successful
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


// gives the user an auth token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
        // saves auth token to localStorage

        // sets auth token to localStorage
        const { token } = res.data;

        localStorage.setItem("jwtToken", token);

        // sets auth token to Authorization header
        setAuthToken(token);

        // decodes auth token to retrieve user's information
        const decoded = jwt_decode(token);

        // sets the current user
        dispatch(setCurrentUser(decoded));    
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


// sets the user's state to logged in
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


// sets the user's state to loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};


// logs the user out
export const logoutUser = () => dispatch => {

    // removes the auth token from local storage
    localStorage.removeItem("jwtToken");

    // removes the auth header for future requests
    setAuthToken(false);

    // sets the current user to an empty object {}
    // this will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
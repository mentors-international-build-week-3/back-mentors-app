// sets or deletes Authorization header for our axios requests
// depending on whether or not a user is logged in

import axios from 'axios';

const setAuthToken = token => {
    if (token) {
      // Applies auth token to every request if user is logged in
      axios.defaults.headers.common["Authorization"] = token;

    } else {
      // Delete auth header when user is not logged in
      delete axios.defaults.headers.common["Authorization"];

    }

};
  export default setAuthToken;
var config = require('./../../config');

export const loggedIn = (payload) => ({
  type: 'FETCH_USER_FULLFILLED',
  payload
});

export const logInError = (payload) => ({
  type: 'LOG_IN_ERROR',
  payload: "Verifique los datos ingresados."
});

export const logOut = (payload) => ({
  type: 'LOG_OUT',
  payload
});


export const logIn = (email, password) => ({
  type: 'API',
  payload: {
    url: config.api.url+ '/login',
    type: 'POST',
    params: {
        "user": {
            "email": email,
            "password": password
        }
    },
    success: ({ data }) => loggedIn(data),
    handleError: ({ data }) => logInError(data),
  }
});

/**
 * If the user is already logged in we skip the login form.
 */
export const logInSession = (payload) => ({
  type: 'FETCH_USER_SESSION',
  payload
});


export const registerUser = (name, email, password) => ({
  type: 'API',
  payload: {
    url: config.api.url+ '/users',
    type: 'POST',
    params: {
        "user": {
            "name": name,
            "email": email,
            "password": password
        }
    },
    success: ({ data }) => loggedIn(data),
  }
});

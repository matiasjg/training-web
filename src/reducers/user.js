let defaultState = {
    user: null,
    logged: false,
    error: null
}

export default function reducer(state=defaultState, action) {
    switch(action.type) {
        case 'API':
            return {...state, logged: false, user: null, error: null}
        case 'FETCH_USER_SESSION':
            return {...state, logged: true, user: JSON.parse(sessionStorage.getItem('user')), error: null}
        case 'FETCH_USER_FULLFILLED':
            return {...state, logged: true, user: action.payload, error: null}
        case 'LOG_IN_ERROR':
            console.log('logerror', action);
            return {...state, logged: false, user: null, error: action.payload}
        case 'LOG_OUT':
            return {...state, logged: false, user: null, error: null}
        default:
            return state;
    }
}

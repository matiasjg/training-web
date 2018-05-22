const session = ({ dispatch, getState }) => next => action => {

    if (action.type === 'FETCH_USER_FULLFILLED') {
        sessionStorage.setItem('user', JSON.stringify(action.payload));
    }

    if (action.type === 'LOG_OUT') {
        sessionStorage.setItem('user', null);
    }


    next(action);

};

export default session;

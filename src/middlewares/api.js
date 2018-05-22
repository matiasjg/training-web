import axios from "axios"

const api = ({ dispatch, getState }) => next => action => {

    if (action.type === 'API') {
        const { url, success, type, params, handleError } = action.payload;

        let call = null;
        if (type === 'GET') {
            call = axios.get(url);
        } else if (type === 'POST') {
            if (params) {
                call = axios.post(url, params);
            } else {
                call = axios.post(url);
            }
        }

        call.then((response) => {
            dispatch(success(response));
        });

        if (handleError) {
            call.catch(error => {
                dispatch(handleError(error))
            });
        } else {
            call.catch(error => console.log(error));
        }
    } else {
        next(action);
    }
};

export default api;

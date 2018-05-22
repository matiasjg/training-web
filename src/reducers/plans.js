let defaultState = {
    list: [],
    fetched: false
}

export default function reducer(state=defaultState, action) {
    switch(action.type) {
        case 'API':
            return {...state, fetched: false}
        case 'FETCH_PLANS_FULLFILLED':
            return {...state, fetched: true, list: action.payload}
        default:
            return state
    }
}

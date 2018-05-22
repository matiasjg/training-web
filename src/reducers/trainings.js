let defaultState = {
    list: [],
    fetched: false,
    selectedTraining: null
}

export default function reducer(state=defaultState, action) {

    switch(action.type) {
        case 'API':
            return {...state, fetched: false}
        case 'FETCH_TRAININGS_FULLFILLED':
            return {...state, fetched: true, list: action.payload, selectedTraining: null}
        case 'FETCH_TRAINING_FULLFILLED':
            return {...state, selectedTraining: action.payload}
        case 'CLEAN_TRAININGS':
            return {...state, selectedTraining: null, list: [], fetched: false}
        default:
            return state
    }
}

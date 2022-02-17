import { GET_POKES, GET_DETAILS, GET_SEARCH } from './actions.js'


const initialState = {
    pokesLoaded: [],
    detailsPokes: {},
    searchResults: []
}

function pokesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKES:
            return {
                ...state,
                pokesLoaded: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                detailsPokes: action.payload
            }
        case GET_SEARCH:
            return {
                ...state,
                searchResults: action.payload
            }
        default:
            break;
    }
}

export default pokesReducer
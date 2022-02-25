import { GET_POKES, GET_DETAILS, GET_SEARCH, SET_STRING, FETCH_TYPES, SET_OPTIONS } from './actions.js'


const initialState = {
    pokesLoaded: [],
    detailsPokes: {},
    searchResults: [],
    typesFromDB: [],
    saveSearch: '',
    optionsSelected: {}
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
        case SET_STRING:
            return {
                ...state,
                saveSearch: action.payload
            }
        case FETCH_TYPES:
            return {
                ...state,
                typesFromDB: action.payload
            }
        case SET_OPTIONS:
            return {
                ...state,
                optionsSelected: action.payload
            }
        default:
            break;
    }
}

export default pokesReducer
import axios from 'axios'

export const GET_POKES = 'GET_POKES'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_SEARCH = 'GET_SEARCH'
export const SET_STRING = 'SET_STRING'
export const FETCH_TYPES = 'FETCH_TYPES'
export const SET_OPTIONS = 'SET_OPTIONS'


export function getAllPokes(filters) {
    return async dispatch => {

        // filters = {
        //     isApi: filters?.isApi,
        //     isDataBase: filters?.isDataBase,
        //     ...filters
        // }
        console.log(filters)
        const stringFilters = new URLSearchParams(filters).toString()
        console.log(stringFilters)

        const request = await axios.get(`http://localhost:3001/pokemons${stringFilters ? '?' + stringFilters : ''}`)

        dispatch({ type: "GET_POKES", payload: request.data })
        console.log('despachado')
    }
}

export function getDetails(id) {
    return async dispatch => {
        const request = await axios.get(`http://localhost:3001/pokemons/${id}`)
        dispatch({ type: 'GET_DETAILS', payload: request.data })
    }
}

export function getSearch(string, filters) {
    return async dispatch => {

        // filters = {
        //     isApi: filters?.isApi,
        //     isDataBase: filters?.isDataBase,
        //     ...filters
        // }

        const stringFilters = new URLSearchParams(filters).toString()

        if (string) {
            const request = await axios.get(`http://localhost:3001/pokemons?name=${string}${stringFilters ? "&" + stringFilters : ''}`)

            if (request.data.length) {
                dispatch({ type: 'GET_SEARCH', payload: request.data })
            }
            // else {
            //     dispatch({ type: 'GET_SEARCH', payload: 'No results.' })
            // }
        }
        else { // sirve para "vaciar" el estado (Clear)
            dispatch({ type: 'GET_SEARCH', payload: [] })
        }
    }
}

export function saveSearch(string) {
    return async dispatch => {
        dispatch({ type: 'SET_STRING', payload: string })
    }
}

//FILTERS

export function fetchAndMapTypes() {
    return async dispatch => {
        const request = await axios.get('http://localhost:3001/Types')
        let array = request.data
        // .map((type) => type.name).sort((a, b) =>
        //     a.localeCompare(b)).filter(filter => filter !== 'undefined')
        dispatch({ type: "FETCH_TYPES", payload: array })
    };
}

export function setOptionsSelected(isApi, isDataBase, type, order, attack) {
    return function (dispatch) {
        let obj = {}
        return (
            obj = {
                isApi: isApi,
                isDataBase: isDataBase,
                type: type,
                order: order,
                attack: attack
            },
            dispatch({ type: "SET_OPTIONS", payload: obj }))

    }
}
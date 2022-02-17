import axios from 'axios'

export const GET_POKES = 'GET_POKES'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_SEARCH = 'GET_SEARCH'


export function getAllPokes() {
    return async dispatch => {
        const request = await axios.get('http://localhost:3001/pokemons')
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

export function getSearch(string) {
    return async dispatch => {
        const request = await axios.get(`http://localhost:3001/pokemons`)
        let result = [];
        if (string) {
            result = request.data.filter(pokemon => pokemon.name.toLowerCase().includes(string.toLowerCase()))
            if (result.length) {
                dispatch({ type: 'GET_SEARCH', payload: result })
            }
            else {
                result = 'No results.'
                dispatch({ type: 'GET_SEARCH', payload: result })
            }
        }
        else {
            dispatch({ type: 'GET_SEARCH', payload: result })
        }
    }
}

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { getSearch, saveSearch } from '../../redux/actions';
import { Link } from 'react-router-dom'



function SearchBar({ searchResults, getSearchResult, setSaveSearch, saveSearch, optionsSelected }) {
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (typeof searchResults === 'string') return alert('No Results.')
    }, [searchResults])

    function handleChange(e) {
        // se le pasa la string de busqueda y el objeto de filtros
        setSearch(e.target.value, optionsSelected)
        setSaveSearch(e.target.value)
    }

    function handleClear() {
        setSearch('')
        getSearchResult('')
        setSaveSearch('')
    }

    return (
        <div>
            <input type="text" placeholder="Search Pokemon" value={search} onChange={handleChange} />
            <button type="button" className="botonBuscar" onClick={() => getSearchResult(search)}> Search </button>
            <button type="button" className="clearButton" onClick={handleClear}> Clear </button>
            <span>&nbsp;
                <Link to="/pokecreator">
                    <button className='button' > Create A New Pokemon! </button>
                </Link>
            </span>
        </div>
    )
}

export default connect(
    state => ({
        searchResults: state?.searchResults,
        saveSearch: state?.saveSearch,
        optionsSelected: state?.optionsSelected
    }),

    dispatch => ({
        getSearchResult: (string) => dispatch(getSearch(string)),
        setSaveSearch: (string) => dispatch(saveSearch(string))
    })
)(SearchBar)
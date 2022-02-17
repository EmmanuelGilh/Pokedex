import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { getSearch } from '../../redux/actions';


function SearchBar({ searchResults, getSearchResult }) {
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (typeof searchResults === 'string') return alert('No Results.')
    }, [searchResults])

    function handleChange(e) {
        setSearch(e.target.value)
    }

    function handleClear() {
        setSearch('')
        getSearchResult('')
    }

    return (
        <div>
            <input type="text" placeholder="Search Pokemon" value={search} onChange={e => handleChange(e)} />
            <button type="button" className="botonBuscar" onClick={() => getSearchResult(search)}> Search </button>
            <button type="button" className="clearButton" onClick={() => handleClear()}> Clear </button>
        </div>
    )
}

export default connect(
    state => ({
        searchResults: state?.searchResults
    }),

    dispatch => ({
        getSearchResult: (string) => dispatch(getSearch(string)),

    })
)(SearchBar)
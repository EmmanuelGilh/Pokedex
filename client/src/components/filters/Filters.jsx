import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchAndMapTypes, setOptionsSelected, saveSearch, getAllPokes, getSearch } from '../../redux/actions'


function Filters({
    typesFromDB, fetchAndMapTypes,
    setOptionsSelected, optionsSelected,
    saveSearch, setSaveSearch,
    getAllPokes, getSearch
}) {

    const [isApi, setIsApi] = useState(true)
    const [isDataBase, setIsDataBase] = useState(true)
    const [type, setType] = useState('All')
    const [order, setOrder] = useState('Default')
    const [attack, setAttack] = useState('Default')


    useEffect(() => {
        if (!typesFromDB) {
            fetchAndMapTypes()
        }
    }, [typesFromDB, fetchAndMapTypes])

    useEffect(() => {
        setOptionsSelected(isApi, isDataBase, type, order, attack)
    }, [isApi, isDataBase, type, order, attack, setOptionsSelected])

    let id = 0

    const handleSubmit = (event) => {
        event.preventDefault();
        const filters = {
            isApi: isApi === true ? 'true' : 'false',
            isDataBase: isDataBase === true ? 'true' : 'false',
            type, order, attack
        }
        if (saveSearch) {
            return getSearch(saveSearch, filters)
        }
        getAllPokes(filters)
    }

    const handleClear = () => {
        if (saveSearch) {
            return getSearch(saveSearch)
        }
        getAllPokes()
    }

    const handleCheckBox = (event) => {
        let { name, checked } = event.target
        if (name === 'api') {
            setIsApi(checked)
            return
        }
        if (name === 'db') {
            setIsDataBase(checked)
        }
    }

    return (<Fragment>
        <form onSubmit={handleSubmit}>
            <div className='buttons'>
                <span className="button-row">Results from: </span>
                <input type="checkbox" name='api' checked={isApi} onChange={handleCheckBox} />
                <label>API</label>

                <input type="checkbox" name='db' checked={isDataBase} onChange={handleCheckBox} />
                <label>DB</label>
                <span className='mini-splitter'>&nbsp;</span>

                <span className="button-row">Sort by: </span>
                <label>Type:</label>
                <select name="Type" id='Types' onChange={e => setType(e.target.value)}>
                    <option value="All">All</option>
                    {
                        typesFromDB?.map(t => <option key={id++} value={t}>{t}</option>)
                    }
                </select>
                <span className='mini-splitter'>&nbsp;</span>

                <label>Order:</label>
                <select name="Order" id="Order" onChange={e => setOrder(e.target.value)}>
                    <option value="Default">Default</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
                <span className='mini-splitter'>&nbsp;</span>

                <label>Attack:</label>
                <select name="Attack" id='attack' onChange={e => setAttack(e.target.value)}>
                    <option value="Default">Default</option>
                    <option value="Stronger">Stronger First</option>
                    <option value="Weaker">Weaker First</option>
                </select>
                <button type="submit">Apply Filters</button>

            </div>
        </form>
        <button onClick={handleClear}>Clear Filters</button>
    </Fragment>)
}

export default connect(
    state => ({
        typesFromDB: state?.typesFromDB,
        optionsSelected: state?.optionsSelected,
        saveSearch: state?.saveSearch
    }),

    dispatch => ({
        fetchAndMapTypes: () => dispatch(fetchAndMapTypes()),
        setOptionsSelected: (isApi, isDataBase, type, order, attack) => dispatch(setOptionsSelected(isApi, isDataBase, type, order, attack)),
        setSaveSearch: (string) => dispatch(saveSearch(string)),
        getAllPokes: (filters) => dispatch(getAllPokes(filters)),
        getSearch: (string, filters) => dispatch(getSearch(string, filters))
    })
)(Filters)
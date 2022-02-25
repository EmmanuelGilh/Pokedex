import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchAndMapTypes, setOptionsSelected } from '../../redux/actions'

function Filters({ typesFromDB, fetchAndMapTypes, setOptionsSelected, optionsSelected }) {
    const [type, setType] = useState('All')
    const [allTypes, setAllTypes] = useState([])
    const [order, setOrder] = useState('Default')
    const [attack, setAttack] = useState('All')

    useEffect(() => {
        if (!typesFromDB?.length) {
            fetchAndMapTypes()
        }
    }, [typesFromDB, fetchAndMapTypes])

    useEffect(() => {
        setOptionsSelected(type, order, attack)
    }, [type, order, attack, setOptionsSelected])

    useEffect(() => {
        setAllTypes(typesFromDB)
    }, [typesFromDB])


    let id = 0


    return (
        <div>
            <div className='buttons'>
                <span className="button-row">Results from: </span>
                <input type="checkbox" />
                <label>API</label>

                <input type="checkbox" />
                <label>DB</label>
                <span className='mini-splitter'>&nbsp;</span>

                <span className="button-row">Sort by: </span>
                <label>Type:</label>
                <select name="Type" id='Types' onChange={e => setType(e.target.value)}>
                    <option value="All">All</option>
                    {
                        allTypes?.map(t => <option key={id++} value={t}>{t}</option>)
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
                    <option value="Lightest-first">Stronger First</option>
                    <option value="Heaviest-first">Weaker First</option>
                </select>
            </div>
        </div>
    )
}

export default connect(
    state => ({
        types: state?.typesFromDB,
        optionsSelected: state?.optionsSelected
    }),

    dispatch => ({
        fetchAndMapTypes: () => dispatch(fetchAndMapTypes()),
        setOptionsSelected: () => dispatch(setOptionsSelected)
    })
)(Filters)
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './PokeCreator.module.css';
import { Link } from 'react-router-dom';
import { fetchAndMapTypes } from '../../redux/actions'
import pokemonCreado from '../../media/pokemonCreado.gif'



function PokeCreator({ typesFromDB, fetchAndMapTypes }) {
    const [editing, setEditing] = useState(true)
    const [types, setTypes] = useState([])
    const [state, setState] = useState({
        name: '',
        type: [],
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: 'img',
    })

    useEffect(() => {
        setEditing(true)
    }, [])

    useEffect(() => {
        if (!typesFromDB) {
            fetchAndMapTypes()
        }
    }, [typesFromDB, fetchAndMapTypes])

    function onChange(event) {
        let { name: inputName, value: inputValue } = event.target

        const regexLetras = /^[a-zA-Z]+$|^$/;
        const regexNum = /^[0-9]+$|^$/;

        if (inputName === 'name') {
            if (!regexLetras.test(inputValue)) {
                event.preventDefault()
                return
            }
        }

        const inputsNumericos = ['hp', 'attack', 'speed', 'defense', 'height', 'weight']

        if (inputsNumericos.includes(inputName)) {
            if (!regexNum.test(inputValue)) {
                event.preventDefault()
                return
            }
        }

        setState({
            ...state,
            [inputName]: inputValue
        });
    }

    function handleTypes(e) {
        e.preventDefault();

        const select = document.getElementById('type')
        const value = select.options[select.selectedIndex].value;


        if (types.includes(value)) {
            return alert('Type already on use')
        }

        setTypes([...types, value])

    }

    function removeType(event) {
        event.preventDefault();
        const typesFiltered = types.filter(el => el !== event.target.value)
        setTypes(typesFiltered)
    }

    let id = 0

    function handleSubmit(e) {
        e.preventDefault();



        if (types.length && state.name.length && state.hp.length && state.attack.length &&
            state.defense.length && state.speed.length && state.height.length && state.weight.length) {
            setEditing(false)
            fetch('http://localhost:3001/creator', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    ...state,
                    type: types
                })
            })
            setTypes([])
            setState({
                name: '',
                type: [],
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                image: 'img',
            })
        }
        else alert('All fields are required.')
    }

    return (
        (editing) ? (
            <div className={styles.mainstudio} >
                <h3 className='creation-title'>Pokemon Creation LAB</h3>
                <p className='alert'>**All fields are required.</p>
                <form className='form'>
                    <br />

                    <div>
                        <label className='element'>Name: </label>
                        <input className='field' type="text" size='10' value={state.name} name="name" placeholder='New Pokemon' autoComplete='off' onChange={onChange} />
                    </div>
                    <br />

                    <div>
                        <label className='element'>Type: </label>
                        <select name='type' id='type' >
                            <option>{typesFromDB ? 'Select Type' : 'Loading...'}</option>
                            {
                                typesFromDB?.map(t => <option key={id++} value={t}>{t}</option>)
                            }
                        </select>
                        <button onClick={handleTypes}> Add Type </button>
                        {types.length > 0 && types.map(type => <button key={id++} value={type} onClick={event => removeType(event)}>  {type} </button>)}
                    </div>
                    <br />

                    <div>
                        <label className='element'>HP: </label>
                        <input className='field' type="text" size='10' value={state.hp} name="hp" placeholder='80' autoComplete='off' onChange={onChange} />
                    </div>
                    <br />

                    <div>
                        <label className='element'>Attack: </label>
                        <input className='field' type="text" size='10' value={state.attack} name="attack" placeholder='70' autoComplete='off' onChange={onChange} />
                    </div>
                    <br />

                    <div>
                        <label className='element'>Defense: </label>
                        <input className='field' type="text" size='10' value={state.defense} name="defense" placeholder='60' autoComplete='off' onChange={onChange} />
                    </div>
                    <br />

                    <div>
                        <label className='element'>Speed: </label>
                        <input className='field' type="text" size='10' value={state.speed} name="speed" placeholder='70' autoComplete='off' onChange={onChange} />
                    </div>
                    <br />

                    <div>
                        <label className='element'>Height: </label>
                        <input className='field' type="text" size='10' value={state.height} name="height" placeholder='15' autoComplete='off' onChange={onChange} />
                    </div>
                    <br />

                    <div>
                        <label className='element'>Weight: </label>
                        <input className='field' type="text" size='10' value={state.weight} name="weight" placeholder='100' autoComplete='off' onChange={onChange} />
                    </div>
                    <br />



                </form>
                <button className='button create-btn' onClick={handleSubmit}>Create!</button>
                <Link to='/pokemons'>
                    <button className='button'> Back To Home </button>
                </Link>
            </div>
        ) : (
            <div className='success'>
                <img className='successGif' src={pokemonCreado} alt="successGif" />
                <h1>Success!</h1>
                <Link to='/pokemons'>
                    <button className='button'> Back To Home </button>
                </Link>
            </div>
        )
    )
}

export default connect(
    state => ({
        typesFromDB: state?.typesFromDB,
    }),

    dispatch => ({
        fetchAndMapTypes: () => dispatch(fetchAndMapTypes()),
    })
)(PokeCreator)
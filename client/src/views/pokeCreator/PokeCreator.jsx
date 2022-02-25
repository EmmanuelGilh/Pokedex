import React from 'react'
import styles from './PokeCreator.module.css';
import { Link } from 'react-router-dom';


export default function DogCreator() {
    return (
        <div className={styles.mainstudio}>
            <h3 className='creation-title'>Pokemon Creation Studio</h3>
            <p className='alert'>**All fields are required.</p>
            <form className='form'>
                <br />

                <div>
                    <label className='element'>Name:</label>
                    <input className='field' type="text" />
                </div>
                <br />

                <div>
                    <label className='element'>Type:</label>
                    <input className='field' type="text" />
                </div>
                <br />

                <div>
                    <label className='element'>HP:</label>
                    <input className='field' type="text" />
                </div>
                <br />

                <div>
                    <label className='element'>Attack:</label>
                    <input className='field' type="text" />
                </div>
                <br />

                <div>
                    <label className='element'>Defense:</label>
                    <input className='field' type="text" />
                </div>
                <br />

                <div>
                    <label className='element'>Speed:</label>
                    <input className='field' type="text" />
                </div>
                <br />

                <div>
                    <label className='element'>Height:</label>
                    <input className='field' type="text" />
                </div>
                <br />

                <div>
                    <label className='element'>Weight:</label>
                    <input className='field' type="text" />
                </div>
                <br />



            </form>
            <Link to='/pokemons'>
                <button className='button'> Back To Home </button>
            </Link>
        </div>
    )
}

import React from 'react';
import styles from './Card.module.css';
import placeholder from '../../media/whos-that-poke.gif'
import { useNavigate } from 'react-router-dom'


export default function Card({ id, name, image, type }) {

    const navigate = useNavigate()


    return (
        <div className={styles.pokeCard}>

            <img className={styles.image} src={image === 'gif' ? placeholder : image} alt={name} onClick={() => navigate(`/${id}/details`)} />


            <h2>
                #{id.toString().padStart(3, 0)} {name.toUpperCase()}
                <br />Type: {type}
            </h2>
            {/* <h3>
                HP: {hp}
            </h3>
            <h3>
                Attack: {attack}
            </h3>
            <h3>
                Defense: {defense}
            </h3>
            <h3>
                Speed: {speed}
            </h3>
            <h3>
                Height: {height}
            </h3>
            <h3>
                Weight: {weight}
            </h3> */}
        </div>
    )
}

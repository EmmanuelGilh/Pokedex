import React from 'react';
import styles from './Card.module.css';
import placeholder from '../../media/whosthatpoke.gif'
import { useNavigate } from 'react-router-dom'


export default function Card({ id, name, image, type, getDetails }) {

    const navigate = useNavigate()

    function goToDetails() {
        navigate(`/${id}/details`)
        getDetails && getDetails(id)
    }

    return (
        <div className={styles.pokeCard}>

            <img className={styles.image} src={image === 'img' ? placeholder : image} alt={name} onClick={goToDetails} />


            <h2>
                #{id.toString().padStart(3, 0)} {name.toUpperCase()}
                <br />Type: {type}
            </h2>
        </div>
    )
}

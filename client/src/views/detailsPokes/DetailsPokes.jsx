import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './DetailsPokes.module.css';
import pokeballGIF from '../../media/pokeballGIF.gif'



function DetailsPokes({ pokeDetails }) {

    const [loading, setLoading] = useState(true);
    // const [display, setDisplay] = useState({});

    const { id } = useParams()


    useEffect(() => {
        if (pokeDetails && pokeDetails.id === parseInt(id)) // si ya tengo una respuesta del back
            setLoading(false)
    }, [pokeDetails, id])

    return (
        <div className={styles.bg}>
            {loading ? <img src={pokeballGIF} alt='gif carga' />
                : (
                    <div className={styles.cardDetail}>
                        <img className={styles.image} src={pokeDetails?.image} alt={pokeDetails?.name} />
                        <h2>#{!!pokeDetails?.id ? pokeDetails.id.toString().padStart(3, 0) : ""}
                            <br />NAME: {!!pokeDetails.name ? pokeDetails.name.toUpperCase() : ""}
                            <br />Type: {!!pokeDetails?.type ? pokeDetails.type.join(', ').toUpperCase() : ""}
                        </h2>
                        <h3>STATS:
                            <br />HP: {pokeDetails?.hp}
                            <br />Attack: {pokeDetails?.attack}
                            <br />Defense: {pokeDetails?.defense}
                            <br />Speed: {pokeDetails?.speed}
                            <br />Height: {pokeDetails?.height}
                            <br />Weight: {pokeDetails?.weight}
                        </h3>
                    </div>
                )
            }
            <div>
                <Link to="/pokemons">
                    <button className='button' > Back to Home </button>
                </Link>
            </div>
        </div>
    )
}

// NAME: {!!pokeDetails.name ? <p>{pokeDetails.name.toUpperCase()}</p> : <p className="clasePropia">cargando...</p>}


export default connect(
    state => ({
        pokeDetails: state?.detailsPokes
    }),

)(DetailsPokes)
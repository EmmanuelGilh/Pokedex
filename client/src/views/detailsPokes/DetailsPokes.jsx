import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getDetails } from '../../redux/actions';



function DetailsPokes({ getDetails, pokeDetails }) {

    const [loading, setLoading] = useState(true);
    // const [display, setDisplay] = useState({});

    const { id } = useParams()



    useEffect(() => {
        if (!id || (pokeDetails && Object.entries(pokeDetails)?.length)) { // si no hay id o si ya tengo una respuesta del back
            return;
        }

        getDetails(id)
    }, [id, getDetails, pokeDetails])

    useEffect(() => {
        if (pokeDetails) // si ya tengo una respuesta del back
            setLoading(false)
    }, [pokeDetails])

    return (
        <div>
            <p>{loading ? 'cargando' : pokeDetails?.name.toUpperCase()}</p>

            <div>
                <Link to="/pokemons">
                    <button className='button' > Back to Home </button>
                </Link>
            </div>
        </div>
    )
}


export default connect(
    state => ({
        pokeDetails: state?.detailsPokes
    }),

    dispatch => ({
        getDetails: (id) => dispatch(getDetails(id)),
    })
)(DetailsPokes)
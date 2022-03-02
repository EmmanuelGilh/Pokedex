import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAllPokes, getSearch, getDetails, setOptionsSelected } from '../../redux/actions'
import Card from './Card'
import styles from './Collection.module.css';
import pokeballGIF from '../../media/pokeballGIF.gif'
import Footer from '../footer/Footer';



function Collection({ pokemons, getAllPokes, searchResults, getDetails, optionsSelected }) {

    const [display, setDisplay] = useState([]);
    const [, setLoading] = useState(true);
    const [finalDisplay, setFinalDisplay] = useState([]) // display cortado
    const [page, setPage] = useState(1);

    const cardsPerPage = 12;


    //get inicial
    useEffect(() => {
        if (!pokemons) {
            return getAllPokes();
        }
    }, [pokemons, getAllPokes])


    //setea display
    useEffect(() => {
        if (Array.isArray(searchResults) && searchResults.length) {
            return setDisplay(searchResults)
        }

        else if (pokemons && pokemons.length) {
            return setDisplay(pokemons);
        }
    }, [pokemons, searchResults])


    // Paginado
    let index = 0
    const paginate = (pageNumber) => setPage(pageNumber)
    useEffect(() => {
        const indexOfLastPost = page * cardsPerPage
        const indexOfFirstPost = indexOfLastPost - cardsPerPage
        setFinalDisplay(display.slice(indexOfFirstPost, indexOfLastPost))
    }, [display, page, cardsPerPage])


    //loading
    useEffect(() => {
        if (Array.isArray(finalDisplay) && finalDisplay.length > 0) {
            return setLoading(false);
        }
        setLoading(true)
    }, [finalDisplay])


    function Body() {
        if (Array.isArray(finalDisplay) && finalDisplay.length > 0 && typeof finalDisplay[0] !== 'string') {
            return <>
                <div className={styles.cards}>
                    {
                        finalDisplay.map(poke => <Card
                            key={index++}
                            id={poke.id}
                            name={poke.name}
                            image={poke.image}
                            type={!!poke?.type ? poke.type.join(', ').toUpperCase() : ""}
                            getDetails={getDetails}
                        />)
                    }
                </div>
                <Footer
                    cardsPerPage={cardsPerPage}
                    totalPosts={display?.length}
                    paginate={paginate}
                />
            </>
        }

        if (Array.isArray(finalDisplay) && typeof finalDisplay[0] === 'string') {
            return <p>{finalDisplay[0]}</p>
        }

        return <img src={pokeballGIF} alt='gif carga' />
    }

    return (
        <Body />
    )
}

export default connect(
    state => ({
        pokemons: state?.pokesLoaded,
        searchResults: state?.searchResults,
        optionsSelected: state?.optionsSelected
    }),

    dispatch => ({
        getAllPokes: () => dispatch(getAllPokes()),
        getSearch: (string) => dispatch(getSearch(string)),
        getDetails: (id) => dispatch(getDetails(id)),
        setOptionsSelected: () => dispatch(setOptionsSelected)
    })
)(Collection)
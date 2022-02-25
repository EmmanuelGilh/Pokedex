import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllPokes, getSearch, getDetails, setOptionsSelected } from '../../redux/actions'
import Card from './Card'
import styles from './Collection.module.css';
import pokeballGIF from '../../media/pokeballGIF.gif'
import Footer from '../footer/Footer';



function Collection({ pokemons, getAllPokes, searchResults, getDetails, optionsSelected }) {

    const [display, setDisplay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [finalDisplay, setFinalDisplay] = useState([]) // display cortado
    const [page, setPage] = useState(1);
    const [cardsPerPage] = useState(12);


    //get inicial
    useEffect(() => {
        if (!pokemons) {
            return getAllPokes();
        }
    }, [pokemons, getAllPokes])


    //setea display
    useEffect(() => {
        // if (display.length) {
        //     return;
        // }

        if (Array.isArray(searchResults) && searchResults.length) {
            return setDisplay(searchResults)
        }

        else if (pokemons && pokemons.length) {
            return setDisplay(pokemons);
        }
    }, [pokemons, searchResults])


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////Sources and Filter functions ////////////////////////////////////////////////


    // function filterAlpha(array) {
    //     if (optionsSelected?.order === 'asc') {
    //         let asc = [...array]
    //         asc.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    //         return asc;
    //     }
    //     else if (optionsSelected?.order === 'desc') {
    //         let desc = [...array]
    //         desc.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
    //         return desc;
    //     }
    //     else return array
    // }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // useEffect(() => {
    //     if (Array.isArray(searchResults) && searchResults.length) {
    //         console.log('si')
    //         let array = filterAlpha(array)
    //         setDisplay(array)
    //     }
    //     else {
    //         console.log("no")
    //         let array = display
    //         array = filterAlpha(array)
    //         setDisplay(array)
    //     }
    // }, [searchResults, optionsSelected, filterAlpha, display])




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
        if (finalDisplay.length) {
            return setLoading(false);
        }
        setLoading(true)
    }, [finalDisplay])

    // useEffect(() => {

    //     // else {
    //     //     return setDisplay(pokemons);
    //     // }
    // }, [searchResults, display, pokemons])





    return (
        <div>
            {
                loading ? (
                    <img src={pokeballGIF}
                        alt='gif carga' />
                ) : (
                    Array.isArray(finalDisplay) && finalDisplay.length > 0 ? (
                        <>
                            <div className={styles.cards}>
                                {
                                    finalDisplay.map(poke => <Card
                                        key={index++}
                                        id={poke.id}
                                        name={poke.name}
                                        image={poke.image}
                                        type={!!poke?.type ? poke.type.join(', ').toUpperCase() : ""}
                                        getDetails={getDetails}
                                    // hp={poke.hp}
                                    // attack={poke.attack}
                                    // defense={poke.defense}
                                    // speed={poke.speed}
                                    // height={poke.height}
                                    // weight={poke.weight}
                                    />)
                                }
                            </div>
                            <Footer
                                cardsPerPage={cardsPerPage}
                                totalPosts={display?.length}
                                paginate={paginate}
                            />
                        </>
                    ) : (
                        <p> No Results.</p>
                    )
                )
            }
        </div>
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
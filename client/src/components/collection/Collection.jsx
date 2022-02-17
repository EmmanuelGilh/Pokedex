import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllPokes } from '../../redux/actions'
import Card from './Card'
import styles from './Collection.module.css';
// import Footer from '../footer/Footer';



function Collection({ pokemons, getAllPokes }) {

    const [display, setDisplay] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [page, setPage] = useState(1);
    // const [cardsPerPage] = useState(9);

    //get inicial
    useEffect(() => {
        if (!pokemons) {
            return getAllPokes();
        }
    }, [pokemons, getAllPokes])

    // setea display
    useEffect(() => {
        if (display.length) {
            return;
        }

        // if ((searchResults && searchResults.length) && display.length === 0){
        //     return setDisplay(searchResults);
        // } 
        if ((pokemons && pokemons.length) && display.length === 0) {
            return setDisplay(pokemons);
        }
    }, [pokemons, display])


    //loading
    useEffect(() => {
        if (display.length) {
            return setLoading(false);
        }
        setLoading(true)
    }, [display])

    let index = 0

    // Paginado
    // const paginate = (pageNumber) => setPage(pageNumber)
    // useEffect(() => {
    //     const indexOfLastPost = page * cardsPerPage
    //     const indexOfFirstPost = indexOfLastPost - cardsPerPage
    //     setDisplay(display.slice(indexOfFirstPost, indexOfLastPost))
    // }, [display, page, cardsPerPage])


    // useEffect(() => {
    //     if (display.length) setLoading(false)
    // }, [display])



    return (
        <div>
            {
                loading ? (
                    'loading...'
                ) : (
                    Array.isArray(display) && display.length > 0 ? (
                        <>
                            <div className={styles.cards}>
                                {
                                    display.map(poke => <Card
                                        key={index++}
                                        id={poke.id}
                                        name={poke.name}
                                        image={poke.image}
                                        type={poke.type.join(', ')}
                                    // hp={poke.hp}
                                    // attack={poke.attack}
                                    // defense={poke.defense}
                                    // speed={poke.speed}
                                    // height={poke.height}
                                    // weight={poke.weight}
                                    />)
                                }
                            </div>
                            {/* <Footer
                                cardsPerPage={cardsPerPage}
                                totalPosts={display?.length}
                                paginate={paginate}
                            /> */}
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
        pokemons: state?.pokesLoaded
    }),

    dispatch => ({
        getAllPokes: () => dispatch(getAllPokes()),
    })
)(Collection)
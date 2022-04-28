import React from 'react';
import './Landing.css';
import Slider from './Slider';
import VsPoke from '../../media/VsPoke.JPG'
import Pokedex from '../../media/pokedex.JPG'
import PokeballGo from '../../media/pokeballGo.jpg'
import { useInView } from "react-intersection-observer";
import { useNavigate } from 'react-router-dom'




export default function Landing() {

    const { ref, inView } = useInView({
        threshold: 0.4,
    });
    const navigate = useNavigate()



    function goToPokes() {
        navigate(`/pokemons`)
    }

    const renderContent = () => {
        return <div class="imagenB text-center">
            <img src={PokeballGo} alt="PokeballGo" class="imagenB" className={inView ? 'slider sliderZoom' : 'slider'} ref={ref} onClick={goToPokes} />
        </div>
    }

    return (
        <div>
            <div className='banner'>
                <img src={VsPoke} alt='VsPoke' className='banner_image' />
                <h1 className='primerTexto'>POKEDEX </h1>
            </div>
            <div>
                <Slider imageSrc={Pokedex} title={' "POKEDEX" is a single-page Full-stack web application about Pokemon made by Emmanuel Gil. It was made employing the following technologies: React, Redux, Express, Sequelize and PostgreSQL.'} />
            </div>
            <div >
                {renderContent()}
            </div>
            {/* <video autoPlay loop muted className={styles.videoF}>
                < source src={bgVideo} type='video/mp4' />
            </video>
            <div className={styles.welcomeDiv}>
                <span className={styles.welcome_text}> <b>"POKEDEX"</b> is a single-page <b>Full-stack</b> web application about <b>Pokemon</b> made by <b>Emmanuel Gil</b>. It was made employing the following
                    technologies: <b>React, Redux, Express, Sequelize and Postgres</b>.</span>
                <Link to='/pokemons'>
                    <button className={styles.welcomeButton}><b>Let's catch'em all!</b></button>
                </Link>
            </div> */}
        </div>
    )
}



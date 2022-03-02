import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import bgVideo from '../../media/Pokemon-theme.mp4'



export default function Landing() {
    return (
        <div className={styles.wrapper}>
            <video autoPlay loop muted className={styles.videoF}>
                < source src={bgVideo} type='video/mp4' />
            </video>
            <div className={styles.welcomeDiv}>
                <span className={styles.welcome_text}> <b>"POKEDEX"</b> is a single-page <b>Full-stack</b> web application about <b>Pokemon</b> made by <b>Emmanuel Gil</b>. It was made employing the following
                    technologies: <b>React, Redux, Express, Sequelize and Postgres</b>.</span>
                <Link to='/pokemons'>
                    <button className={styles.welcomeButton}><b>Let's catch'em all!</b></button>
                </Link>
            </div>
        </div>
    )
}



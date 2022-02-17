import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';



export default function Landing() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.welcomeDiv}>
                <span className={styles.welcome_text}> <b>"POKEDEX"</b> is a single-page <b>Full-stack</b> web application about <b>Pokemon</b> made by <b>Emmanuel Gil</b>. It was made employing the following
                    technologies: <b>React, Redux, Express, Sequelize and Postgres</b>.</span>
            </div>
            <Link to='/pokemons'>
                <button className={styles.welcomeButton}><b>Let's catch'em all!</b></button>
            </Link>
        </div>
    )
}



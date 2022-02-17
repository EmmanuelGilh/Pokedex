import React from 'react';
import styles from './Header.module.css';
import SearchBar from '../searchBar/SearchBar'


export default function Header() {
    return (
        <div>
            <h1 className={styles.title}> <b>POKEDEX</b></h1>
            <span className='searchbar'> <SearchBar /> </span>
        </div>
    )
}
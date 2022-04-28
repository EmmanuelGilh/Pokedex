import React from 'react';
import Header from '../../components/header/Header.jsx';
import Collection from '../../components/collection/Collection.jsx';
import Filters from '../../components/filters/Filters';
import styles from './Home.module.css';


export default function Home() {
    return (
        <div className={styles.wrapper}>
            <Header classsName={styles.header} />
            <Filters />
            <Collection />
        </div>
    )
}

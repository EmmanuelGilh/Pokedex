import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ cardsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];
    for (let n = 1; n <= Math.ceil(totalPosts / cardsPerPage); n++) {
        pageNumbers.push(n);
    }

    return (
        <div class="text-center">
            <div>
                {pageNumbers.map(number => (
                    <span className={styles.pagination}
                        key={number}
                        onClick={() => paginate(number)}
                    >
                        &nbsp;{number}&nbsp;
                    </span>)
                )
                }
            </div>
        </div>
    )
}
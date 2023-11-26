import { FC } from 'react'
import styles from './Pagination.module.css'


interface Props {
    currentPage: number,
    totalPages: number,
    onPageChange: (pageNumber: number) => void
}

const Pagination: FC<Props> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages < 2) {
        return
    }

    const changePage = (page: number) => {
        window.scrollTo({ top: 0, left: 0 })
        onPageChange(page)
    }

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage === 1) {
        endPage = Math.min(totalPages, 4);
    }

    if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 3);
    }

    return (
        <div className={styles.pagination}>

            {startPage > 1 && (
                <button onClick={() => changePage(1)}>1</button>
            )}

            {startPage > 2 && <span className={styles.ellipsis}>...</span>}

            {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={pageNumber === currentPage ? styles.active : ''}
                    onClick={() => changePage(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}

            {endPage < totalPages - 1 && <span className={styles.ellipsis}>...</span>}

            {endPage < totalPages && (
                <button onClick={() => changePage(totalPages)}>{totalPages}</button>
            )}
        </div>
    );
}

export default Pagination;

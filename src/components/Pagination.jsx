import { useState, useMemo } from "react";
import { SlArrowLeft , SlArrowRight } from "react-icons/sl";

function Pagination({ totalItems, itemsPerPage, onPageData }) {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = useMemo(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages]);

    const goToPage = (page) => {
        setCurrentPage(page);
        onPageData(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    return (
        <div className="pagination">

            <button onClick={prevPage}>
                <SlArrowLeft />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={page === currentPage ? "active" : ""}
                >
                    {page}
                </button>
            ))}

            <button onClick={nextPage}>
                <SlArrowRight />
            </button>

        </div>
    );
}

export default Pagination;

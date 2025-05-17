import { useEffect, useState } from "react";
import { ProductCard } from "./productCard";
import clsx from "clsx";

const LIMIT = 30;

export const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProducts = async (currentPage) => {
        const url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${
            currentPage * LIMIT
        }&select=title,description,price,discountPercentage,thumbnail`;
        const apiFetch = await fetch(url);
        const response = await apiFetch.json();
        setProducts(response.products);
        setTotalPages(Math.round(response.total/LIMIT)+1);
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Only handle if no input elements are focused
            if (document.activeElement?.tagName === 'INPUT') return;

            switch (event.key) {
                case 'ArrowLeft':
                    // Go to previous page if not on first page
                    if (currentPage > 0) {
                        setCurrentPage(prev => prev - 1);
                    }
                    break;
                case 'ArrowRight':
                    // Go to next page if not on last page
                    if (currentPage < totalPages - 1) {
                        setCurrentPage(prev => prev + 1);
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPage, totalPages]);

    return (
        <div className="flex flex-col min-h-screen p-4">
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination controls - fixed at bottom with enhanced styling */}
            <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-800/95 py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-center items-center gap-3 max-w-screen-lg mx-auto px-4">
                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 0}
                        aria-label="Previous page"
                        className={clsx(
                            "px-5 py-2.5 rounded-lg border-2 font-medium transition-all",
                            currentPage === 0
                                ? "cursor-not-allowed text-gray-300 border-gray-200 bg-gray-50"
                                : "text-gray-700 border-gray-300 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 active:scale-95 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                        )}
                    >
                        Previous
                    </button>
                    <div className="flex gap-2 overflow-x-auto px-2" role="navigation" aria-label="Pagination">
                        {Array.from({ length: totalPages }).map((_, page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                disabled={currentPage === page}
                                aria-label={`Page ${page + 1}${currentPage === page ? ', current page' : ''}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                                className={clsx(
                                    "w-11 h-11 rounded-lg font-medium transition-all",
                                    currentPage === page
                                        ? "bg-blue-500 text-white cursor-not-allowed shadow-lg scale-110 hover:bg-blue-500"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 active:scale-95 dark:text-white dark:hover:bg-gray-700"
                                )}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages - 1}
                        aria-label="Next page"
                        className={clsx(
                            "px-5 py-2.5 rounded-lg border-2 font-medium transition-all",
                            currentPage === totalPages - 1
                                ? "cursor-not-allowed text-gray-300 border-gray-200 bg-gray-50"
                                : "text-gray-700 border-gray-300 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 active:scale-95 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                        )}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

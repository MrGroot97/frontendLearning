import { useEffect, useState } from "react";
import { ProductCard } from "./productCard";
import clsx from "clsx";

const LIMIT = 10;

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
    return (
        <div className="grid grid-cols-4 gap-5 bg-white text-black p-5">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            <div className="col-span-4 flex justify-center items-center gap-1">
                <span
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                        clsx(
                            "px-4 py-2",
                            currentPage === 0
                                ? "cursor-not-allowed text-slate-300"
                                : "text-black cursor-pointer hover:text-blue-300 hover:underline"
                        )
                    }
                >
                    Previous
                </span>
                    {Array.from({ length: totalPages }).map((_,page) => (
                        <span
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={
                                clsx(
                                    "p-2 rounded-md",
                                    currentPage === page
                                        ? "text-blue-500 font-semibold underline cursor-not-allowed"
                                        : "text-black cursor-pointer hover:text-blue-300 hover:underline"
                                )
                            }
                        >
                            {page + 1}
                        </span>
                    ))}
                <span
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                        clsx(
                            "px-4 py-2",
                            currentPage === totalPages - 1
                                ? "cursor-not-allowed text-slate-300"
                                : "text-black cursor-pointer hover:text-blue-300 hover:underline"
                        )
                    }
                >
                    Next
                </span>
            </div>
        </div>
    );
};

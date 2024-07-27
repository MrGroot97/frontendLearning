import reactLogo from "../assets/react.svg";

const header = () => {
    return (
        <div className="sticky top-0 flex z-10 justify-between items-center bg-[#242424] text-white">
            <a href="/">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <div>
                <nav className="flex justify-between items-center p-4 gap-5">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/infinite-scroll">Infinite Scroll</a>
                    <a href="/image-slider">Image slider</a>
                    <a href="/confluence-tree-structure">
                        Confluence File system
                    </a>
                    <a href="/pagination">Pagination</a>
                    <a href="/sticky-notes">Sticky Notes</a>
                </nav>
            </div>
        </div>
    );
};

export default header;

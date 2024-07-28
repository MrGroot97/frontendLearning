import "./App.css";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InfiniteScroll } from "./components/infiniteScroll";
import { ImageSlider } from "./components/imageSlider";
import { ConfluenceTreeStructure } from "./components/confluenceTreeStructure";
import { Pagination } from "./components/pagination";
import { StickyNote } from "./components/stickyNotes";
import LLDInterviewQuestions  from "./lldInterviewQuestions";

function App() {
    return (
        <>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="mx-10">
                                Abhi to party shuru hui hai
                            </div>
                        }
                    />
                    <Route
                        path="/lld-interview-questions"
                        element={<LLDInterviewQuestions />}
                    />
                    <Route path="/about" element={<div>About</div>} />
                    <Route path="/contact" element={<div>Contact</div>} />
                    <Route
                        path="/infinite-scroll"
                        element={<InfiniteScroll />}
                    />
                    <Route
                        path="/confluence-tree-structure"
                        element={<ConfluenceTreeStructure />}
                    />
                    <Route path="/pagination" element={<Pagination />} />
                    <Route path="/image-slider" element={<ImageSlider />} />
                    <Route path="/sticky-notes" element={<StickyNote />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

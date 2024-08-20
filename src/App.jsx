import "./App.css";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InfiniteScroll } from "./components/infiniteScroll";
import { ImageSlider } from "./components/imageSlider";
import { ConfluenceTreeStructure } from "./components/confluenceTreeStructure";
import { Pagination } from "./components/pagination";
import { StickyNote } from "./components/stickyNotes";
import LLDInterviewQuestions from "./lldInterviewQuestions";
import Home from "./components/home";
import ContactMe from "./components/contantPage";
import SignMaker from "./components/signMaker";
import Footer from "./footer"

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main className="mt-24">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign-maker" element={<SignMaker />} />
                        <Route
                            path="/lld-interview-questions"
                            element={<LLDInterviewQuestions />}
                        />
                        <Route path="/contact" element={<ContactMe />} />
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
                </main>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;

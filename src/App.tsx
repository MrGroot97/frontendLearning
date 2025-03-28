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
import Footer from "./footer";
import { FC } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

/**
 * Main application component that sets up routing and layout
 */
const App: FC = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <BrowserRouter>
          <Header />
          <div className="content-wrapper">
            <main className="px-4 md:px-8 max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-maker" element={<SignMaker />} />
                <Route
                  path="/lld-interview-questions"
                  element={<LLDInterviewQuestions />}
                />
                <Route path="/contact" element={<ContactMe />} />
                <Route path="/infinite-scroll" element={<InfiniteScroll />} />
                <Route
                  path="/confluence-tree-structure"
                  element={<ConfluenceTreeStructure />}
                />
                <Route path="/pagination" element={<Pagination />} />
                <Route path="/image-slider" element={<ImageSlider />} />
                <Route path="/sticky-notes" element={<StickyNote />} />
                <Route
                  path="*"
                  element={
                    <div className="text-center py-20">
                      <h1 className="text-4xl font-bold text-red-500">404</h1>
                      <p className="mt-4 text-lg">Page not found</p>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;

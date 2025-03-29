import "./App.css";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LLDInterviewQuestions from "./lldInterviewQuestions";
import Home from "./components/home";
import ContactMe from "./components/contantPage";
import Footer from "./footer";
import { FC } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import UtilityDocs from "./components/utilities/UtilityDocs";

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
                <Route
                  path="/lld-interview-questions"
                  element={<LLDInterviewQuestions />}
                />
                <Route path="/contact" element={<ContactMe />} />
                <Route path="/utilities" element={<UtilityDocs />} />
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

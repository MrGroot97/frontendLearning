import "./App.css";
import Header from "./components/header";
import UberBoxSelector from "./components/uberBoxSelector";
import CountryGameMicrosoft from "./components/countryGameMicrosoft";
import TypeAhead from "./components/typeAhead";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InfiniteScroll } from "./components/infiniteScroll";
import { Accordian } from "./components/accordian";
import { NestedComments } from "./components/nestedComments";
import { ImageSlider } from "./components/imageSlider";
import { AltassianChart } from "./components/atlassianChart";
import { ConfluenceTreeStructure } from "./components/confluenceTreeStructure";
import { Pagination } from "./components/pagination";
import { LiveStreamChat } from "./components/youtubeLiveStremChat";
import { TransferList } from "./components/transferListMeta";
import { ComponentHoc } from "./components/componentHoc";
import { CurrencyConverter } from "./components/currencyConverter";
import { StickyNote } from "./components/stickyNotes";
import { InputComponent } from "./components/forwardRefComponent";
import { PopupDemo } from "./components/popup";

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="mx-10">
                                <ComponentHoc title="Uber Box Selector">
                                    <UberBoxSelector />
                                </ComponentHoc>

                                <ComponentHoc title="Country Game Microsoft">
                                    <CountryGameMicrosoft />
                                </ComponentHoc>

                                <ComponentHoc title="typeAhead/AutoSuggestions">
                                    <TypeAhead />
                                </ComponentHoc>

                                <ComponentHoc title="Accordian">
                                    <Accordian />
                                </ComponentHoc>

                                <ComponentHoc title="Nested Comments">
                                    <NestedComments />
                                </ComponentHoc>
                                <ComponentHoc title="Atlassian Chart">
                                    <AltassianChart />
                                </ComponentHoc>
                                <ComponentHoc title="LiveStreamChat">
                                    <LiveStreamChat />
                                </ComponentHoc>
                                <ComponentHoc title="TransferList Meta">
                                    <TransferList />
                                </ComponentHoc>
                                <ComponentHoc title="Currency converter">
                                    <CurrencyConverter />
                                </ComponentHoc>
                                <ComponentHoc title="ForwardRef based InputComponent">
                                    <InputComponent />
                                </ComponentHoc>
                                <ComponentHoc title="Portal Popup">
                                    <PopupDemo />
                                </ComponentHoc>

                            </div>
                        }
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

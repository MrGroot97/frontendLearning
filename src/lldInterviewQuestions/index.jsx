import { InputComponent } from "../components/forwardRefComponent";
import { PopupDemo } from "../components/popup";
import UberBoxSelector from "../components/uberBoxSelector";
import CountryGameMicrosoft from "../components/countryGameMicrosoft";
import TypeAhead from "../components/typeAhead";
import { Accordian } from "../components/accordian";
import { NestedComments } from "../components/nestedComments";
import { LiveStreamChat } from "../components/youtubeLiveStremChat";
import { TransferList } from "../components/transferListMeta";
import { ComponentHoc } from "../components/componentHoc";
import { CurrencyConverter } from "../components/currencyConverter";
import { AltassianChart } from "../components/atlassianChart";

const LLDInterviewQuestions = () => {
    return (
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
    );
};

export default LLDInterviewQuestions;

/* eslint-disable react/prop-types */
import clsx from "clsx";


export const AccordianItem = (props) => {
    const { title, content, isOpen, setIsOpen } = props;
    const titleStyle = clsx("flex justify-between items-center p-2 cursor-pointer", isOpen ? "bg-blue-300" : "bg-slate-200");
    return (
        <div className="border border-gray-300" onClick={setIsOpen}>
            <div className={titleStyle}>
                <h1 className="text-lg font-semibold">{title}</h1>
                <span className="text-sm">+</span>
            </div>
            {isOpen ? <div className="p-2">
                <p>{content}</p>
            </div> : null}
        </div>
    );
};
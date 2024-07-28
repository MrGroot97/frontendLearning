import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import clsx from "clsx";
import CustomLink from "../customLink";

const Dropdown = ({ items, onSelect = ()=>void 0 }) => {
    const [showList, setShowList] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleDropdown = () => {
        setShowList(!showList);
    };

    const handleClickOutside = (e) => {
        if (e.target.id !== "menu-button") {
            setShowList(false);
        }
    };

    const onItemSelect= (e, item) => {
        setSelectedItem(item);
        setShowList(false);
        onSelect();
    }

    useEffect(() => {
        if(items.length) setSelectedItem(items[0]);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const menuItemsContainerClasses = clsx(
        "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
        {
            hidden: !showList,
        }
    );

    console.log("selectedItem", showList, selectedItem);
    if (!selectedItem) return null;
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={handleDropdown}
                >
                    {selectedItem.label}
                    {showList ? <BsChevronUp /> :<BsChevronDown />}
                </button>
                <div
                    className={menuItemsContainerClasses}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {items.map((item, idx) => (
                            <CustomLink
                                to={item.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                tabIndex="-1"
                                id={`menu-item-${idx}`}
                                key={item.label}
                                onClick={(e) => onItemSelect(e, item)}
                            >
                                {item.label}
                            </CustomLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;

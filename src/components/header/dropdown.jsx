import { BsChevronDown } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import CustomLink from "../customLink";
import { useLocation } from "react-router-dom";

const Dropdown = ({
  items = [],
  label = "Select",
  onSelect = () => void 0,
}) => {
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  let location = useLocation();
  const menuRef = useRef();

  useEffect(() => {
    setSelectedItem(items.find((item) => item.href === location.pathname));
    // Update document title without console logging
    document.title =
      location.pathname !== "/"
        ? `Engineer Babu - ${location.pathname.replace("/", "")}`
        : "Engineer Babu";
  }, [location, items]);

  const handleDropdown = () => {
    setShowList((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    // Check if the click was outside the menu
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowList(false);
    }
  };

  const onItemSelect = (e, item) => {
    setSelectedItem(item);
    setShowList(false);
    onSelect();
  };

  useEffect(() => {
    if (items.length) setSelectedItem(items[0]);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [items]);

  const menuItemsContainerClasses = clsx(
    "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md shadow-lg border focus:outline-none transition-colors duration-200",
    {
      hidden: !showList,
    }
  );

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
          id="menu-button"
          aria-expanded={showList}
          aria-haspopup="true"
          onClick={handleDropdown}
          ref={menuRef}
        >
          {selectedItem?.label || label}
          <BsChevronDown
            className={`transition-transform duration-300 ${
              showList ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`${menuItemsContainerClasses} dropdown-menu`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {items.map((item, idx) => (
              <CustomLink
                to={item.href}
                className="block px-4 py-2 text-sm transition-colors dropdown-item"
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

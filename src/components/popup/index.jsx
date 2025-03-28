import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";

export const PortalPopup = ({ open, children, onClose, title }) => {
  const targetElement = document.getElementById("portal");
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup">
        <button
          className="popup-close"
          onClick={onClose}
          aria-label="Close popup"
        >
          <span className="leading-none">&times;</span>
        </button>
        {title && <h2>{title}</h2>}
        <div className="popup-content">{children}</div>
      </div>
    </>,
    targetElement
  );
};

export const PopupDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center py-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm"
      >
        Open Popup
      </button>
      <PortalPopup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Popup Demo"
      >
        <p>
          This is a themed popup that adapts to both light and dark modes. It
          demonstrates the use of CSS variables to maintain visual consistency
          with the rest of the application.
        </p>
        <p>
          The popup includes proper styling for headings, paragraphs, and an
          optional close button in the corner.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm"
          >
            Close
          </button>
        </div>
      </PortalPopup>
    </div>
  );
};

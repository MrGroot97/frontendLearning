import ReactDOM from 'react-dom';
import { useState } from 'react';
import './index.css';

export const PortalPopup = ({ open, children, onClose }) => {
    const targetElement = document.getElementById('portal');
    if (!open) return null;
    return ReactDOM.createPortal(
        <>
            <div className="popup-overlay" onClick={onClose}></div>
            <div className="popup">
                {children}
            </div>
        </>,
        targetElement
    );
}


export const PopupDemo = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="bg-slate-400 px-2 rounded-md text-blue-100" >Open Popup</button>
            <PortalPopup open={isOpen} onClose={() => setIsOpen(false)}>
                <h1>Popup Title</h1>
                <p>This is a popup content</p>
            </PortalPopup>
        </div>
    );
}
import clsx from "clsx";
import "./accordion.css"; // Import the CSS file we'll create

export const AccordianItem = (props) => {
  const { title, content, isOpen, setIsOpen } = props;
  const titleStyle = clsx(
    "accordion-header flex justify-between items-center p-3 cursor-pointer w-full text-left",
    isOpen ? "accordion-active" : ""
  );

  return (
    <div className="accordion-item mb-2">
      <button
        className={titleStyle}
        onClick={setIsOpen}
        aria-expanded={isOpen}
        type="button"
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={clsx(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="accordion-content py-4 px-4">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

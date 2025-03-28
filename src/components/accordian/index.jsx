import { useEffect, useState } from "react";
import { accordianData } from "./staticData";
import { AccordianItem } from "./accordianItem";
import "./accordion.css";

export const Accordian = () => {
  const [accordingData, setAccordingData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setAccordingData(accordianData);
  }, []);

  if (accordingData.length === 0) return null;

  return (
    <div className="accordion-container py-6 px-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">FAQ Accordion</h2>
      <div className="space-y-3">
        {accordingData.map((item, index) => (
          <AccordianItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={activeIndex === index}
            setIsOpen={() => {
              if (activeIndex === index) {
                setActiveIndex(-1);
              } else {
                setActiveIndex(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { accordianData } from "./staticData";
import { AccordianItem } from "./accordianItem";

export const Accordian = () => {
  const [accordingData, setAccordingData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setAccordingData(accordianData);
  }, []);

  if (accordingData.length === 0) return null;
  return (
    <div className="py-5 mx-[30px]">
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
  );
};

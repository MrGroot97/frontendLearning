import clsx from "clsx";
import { data as countryData } from "./data";
import { useEffect, useMemo, useState } from "react";

const initialData = () => {
  const randomizeCountries = Object.keys(countryData).sort(
    () => Math.random() - 0.5
  );
  const randomizeCapitals = Object.values(countryData).sort(
    () => Math.random() - 0.5
  );
  return [...randomizeCountries, ...randomizeCapitals];
};

const index = () => {
  const [randomizeCountryData, setRandomizeCountryData] = useState([]);
  const [stackData, setStackData] = useState([]);
  const [isCountryCapitalMatch, setIsCountryCapitalMatch] = useState(false);

  useEffect(() => {
    const randomizeData = initialData();
    setRandomizeCountryData(randomizeData);
  }, [countryData]);

  const handleClick = (e) => {
    const { target } = e;
    const { value } = target.dataset;
    if(stackData.length === 2) return;
    if(stackData.length === 1) {
      const currentStackData = stackData[0];
      const isCountryCapitalMatch = countryData[currentStackData] === value || countryData[value] === currentStackData;
      setIsCountryCapitalMatch(isCountryCapitalMatch);
      const timeout = setTimeout(() => {
        isCountryCapitalMatch && setRandomizeCountryData(
          prev => {
            const newData = [...prev];
            if(newData.length === 2) {
              return initialData();
            }
            const updatedData = newData.filter(item => item !== currentStackData && item !== value);
            return updatedData;
          }
        )
        setStackData([]);
        setIsCountryCapitalMatch(false);
        clearTimeout(timeout);
      }, 1000);
    }
    setStackData([...stackData, value]);
  };

  const countryMatchedData = useMemo(() => {
    if(stackData.length <2) return [];
    const isFirstItemCountry = !!countryData[stackData[0]];
    const country = isFirstItemCountry ? stackData[0] : stackData[1];
    const capital = isFirstItemCountry ? stackData[1] : stackData[0];
    return [country, capital];
  }, [stackData]);
  return (
    <div className="bg-white p-5">
      <div className="flex gap-1 p-2 m-3 border border-solid border-blue-200 flex-wrap text-black" onClick={handleClick}>
        {randomizeCountryData.map((item, i) => {
          const itemStyle = clsx("py-2 px-4 border border-black rounded-lg",
            stackData.includes(item) && stackData.length === 2 && isCountryCapitalMatch && "bg-green-400",
            stackData.includes(item) && stackData.length === 2 && !isCountryCapitalMatch && "bg-red-400",
            stackData.includes(item) && stackData.length === 1  && "bg-blue-200",
          );
          return (
            <div
              key={i}
              className={itemStyle}
              data-value={item}
            >
              {item}
            </div>
          );
        })}
      </div>
      {countryMatchedData.length && isCountryCapitalMatch ? <p className="text-green-700 py-2">you are Correct! {countryMatchedData[0]} capital is {countryMatchedData[1]}</p> : null}
    </div>
  );
};

export default index;

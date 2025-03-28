import clsx from "clsx";
import { useEffect, useState, useRef, useMemo } from "react";

export const box = (props) => {
  const { data } = props;
  const cols = useMemo(() => data[0].length, [data]);
  const [boxdata, setBoxData] = useState(null);
  const [loadData, setLoadData] = useState(new Set());
  const [isUnloaded, setIsUnloaded] = useState(false);
  const loadRef = useRef(null);

  useEffect(() => {
    const newData = data.map((row) => row.map((item) => item));
    setBoxData(newData);
  }, [data]);

  const boxStyle = useMemo(() => clsx("grid mx-auto gap-5 w-fit"), []);

  const unload = () => {
    const keys = Array.from(loadData.keys());
    const removeNext = () => {
      if (keys.length === 0) {
        setIsUnloaded(false);
        loadRef.current = null;
        return;
      }
      const currentKey = keys.shift();
      const [row, col] = currentKey;
      const newData = [...boxdata];
      newData[row][col] = 1;
      setBoxData(newData);
      setLoadData((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentKey);
        return newSet;
      });
      loadRef.current = setTimeout(() => {
        removeNext();
      }, 1000);
    };
    loadRef.current = setTimeout(() => {
      removeNext();
    }, 100);
  };

  const onBoxClick = (e) => {
    const { target } = e;
    const { row, col, status } = target.dataset;
    if (status === "bg-transparent" || isUnloaded) return;
    const newData = [...boxdata];
    newData[row][col] = 0;
    setLoadData(loadData.add([row, col]));
    setBoxData(newData);
    // need to unload when box is full
    const isEveryBoxFull = newData.every((row) =>
      row.every((item) => item === 0)
    );
    if (isEveryBoxFull) {
      setIsUnloaded(true);
      unload();
    }
  };

  if (!boxdata) return null;
  return (
    <div
      className={boxStyle}
      onClick={(e) => onBoxClick(e)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {boxdata.map((row, rowIndex) =>
        row.map((item, colIndex) => {
          const status =
            data[rowIndex][colIndex] === 0
              ? "bg-transparent"
              : "border border-black";
          const changedStatus =
            data[rowIndex][colIndex] === 1
              ? boxdata[rowIndex][colIndex] === 0
                ? "bg-green-600"
                : "bg-white"
              : "";
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={clsx("w-14 h-14", status, changedStatus)}
              data-status={status}
              data-row={rowIndex}
              data-col={colIndex}
            />
          );
        })
      )}
    </div>
  );
};

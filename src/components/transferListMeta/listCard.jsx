const staticList = [
  {
    id: 1,
    title: "1",
  },
  {
    id: 2,
    title: "2",
  },
  {
    id: 3,
    title: "3",
  },
  {
    id: 4,
    title: "4",
  },
  {
    id: 5,
    title: "5",
  },
];
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Listcard } from "./card";

export const ListCard = () => {
  const [mapList, setMapList] = useState(new Map());

  useEffect(() => {
    const map = new Map();
    map.set(1, staticList);
    map.set(2, []);
    setMapList(map);
  }, []);

  const handleOnChange = (id, checked, listKey) => {
    setMapList((prev) => {
      const map = new Map(prev);
      const list = map.get(listKey);
      const index = list.findIndex((item) => item.id === id);
      const item = list[index];
      const newList = [...list];
      newList[index] = { ...item, checked };
      map.set(listKey, newList);
      return map;
    });
  };

  const moveRight = () => {
    setMapList((prev) => {
      const map = new Map(prev);
      const list1 = map.get(1);
      const list2 = map.get(2);
      const selectedList = list1
        .filter((item) => item.checked)
        .map((item) => ({ ...item, checked: false }));
      const newList1 = list1.filter((item) => !item.checked);
      const newList2 = [...list2, ...selectedList];
      map.set(1, newList1);
      map.set(2, newList2);
      return map;
    });
  };

  const moveLeft = () => {
    setMapList((prev) => {
      const map = new Map(prev);
      const list1 = map.get(1);
      const list2 = map.get(2);
      const selectedList = list2
        .filter((item) => item.checked)
        .map((item) => ({ ...item, checked: false }));
      const newList2 = list2.filter((item) => !item.checked);
      const newList1 = [...list1, ...selectedList];
      map.set(1, newList1);
      map.set(2, newList2);
      return map;
    });
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-xl font-medium text-center mb-4 text-gray-800 dark:text-gray-100">
        Transfer Items
      </h3>
      <p className="text-sm text-center mb-6 text-gray-600 dark:text-gray-300">
        Select items and use the arrows to move them between lists
      </p>

      <div className="flex justify-center items-center gap-5">
        <Listcard
          mapList={mapList.get(1)}
          listKey={1}
          handleOnChange={handleOnChange}
        />
        <div className="transfer-actions">
          <button
            className="transfer-action-btn"
            onClick={moveRight}
            aria-label="Move selected items right"
            title="Move selected items right"
          >
            <BsChevronRight className="w-5 h-5" />
          </button>
          <button
            className="transfer-action-btn"
            onClick={moveLeft}
            aria-label="Move selected items left"
            title="Move selected items left"
          >
            <BsChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <Listcard
          mapList={mapList.get(2)}
          listKey={2}
          handleOnChange={handleOnChange}
        />
      </div>
    </div>
  );
};

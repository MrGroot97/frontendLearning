import { ListItem } from "./listItem";
import PropTypes from "prop-types";

export const Listcard = ({ mapList, listKey, handleOnChange }) => {
  const onToggle = (e) => {
    const { checked, id } = e.target;
    const numId = Number(id);
    handleOnChange(numId, checked, listKey);
  };

  return (
    <div className="list-card">
      <div className="px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 font-medium text-center text-gray-700 dark:text-gray-100">
        {listKey === 1 ? "Available" : "Selected"}
      </div>
      <div className="p-1 items-container">
        {mapList?.length > 0 ? (
          mapList.map((item) => (
            <ListItem key={item.id} {...item} onChange={onToggle} />
          ))
        ) : (
          <div className="text-center text-gray-400 dark:text-gray-500 italic p-3">
            {listKey === 1 ? "No items available" : "No items selected"}
          </div>
        )}
      </div>
    </div>
  );
};

Listcard.propTypes = {
  mapList: PropTypes.array,
  listKey: PropTypes.number,
  handleOnChange: PropTypes.func,
};

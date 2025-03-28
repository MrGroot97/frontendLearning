export const ListItem = ({ id, title, onChange, checked }) => {
  return (
    <div className="list-item">
      <input
        type="checkbox"
        id={id}
        name={`list-checkbox-${id}`}
        checked={checked || false}
        onChange={onChange}
        className="focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
      <label
        htmlFor={`list-checkbox-${id}`}
        className="ml-2 text-gray-800 dark:text-gray-100"
      >
        {title}
      </label>
    </div>
  );
};

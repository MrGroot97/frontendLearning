import "./index.css";

export const ComponentHoc = ({ title, children }) => {
  return (
    <div className="component-hoc flex flex-col items-center justify-center my-5 p-6 md:p-10">
      <h1 className="component-hoc__title text-xl font-bold text-center md:text-2xl">
        {title}
      </h1>
      <div className="component-hoc__content">{children}</div>
    </div>
  );
};

import { Node } from "./node";
import DATA from "./data";

export const Sidebar = () => {
  return (
    <div className="bg-slate-600 w-[60%] pl-5 pt-5 md:w-[50%] lg:w-[40%] xl:w-[30%]">
      <ul>
        {DATA.map((item) => {
          return <Node key={item.id} data={item} />;
        })}
      </ul>
    </div>
  );
};

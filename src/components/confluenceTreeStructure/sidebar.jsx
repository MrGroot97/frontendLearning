import { Node } from "./node";
import DATA from "./data";

export const Sidebar = () => {
    return (
        <div className=" bg-slate-600 h-full w-[30%] pl-5 pt-5">
            <ul>
                {DATA.map((item) => {
                    return <Node key={item.id} data={item} />;
                })}
            </ul>
        </div>
    );
};

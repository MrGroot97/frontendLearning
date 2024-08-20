import { Node } from "./node";
import DATA from "./data";

export const Sidebar = () => {
    return (
        <div className="bg-slate-600 w-[25%] pl-5 pt-5 min-h-[calc(100vh-297px-96px)]">
            <ul>
                {DATA.map((item) => {
                    return <Node key={item.id} data={item} />;
                })}
            </ul>
        </div>
    );
};

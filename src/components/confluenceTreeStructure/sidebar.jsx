import { Node } from "./node";
import DATA from "./data";

export const Sidebar = () => {
    return (
        <div className="bg-slate-600 w-[60%] pl-5 pt-5 min-h-[calc(100vh-297px-96px)] md:w-[45%] lg:w-[35%] xl:w-[25%]">
            <ul>
                {DATA.map((item) => {
                    return <Node key={item.id} data={item} />;
                })}
            </ul>
        </div>
    );
};

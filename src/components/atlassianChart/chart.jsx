 
import clsx from "clsx";

export const Chart = ({ data }) => {

    const normalizeData = (data, maxHeight, addTopMargin = 0) => {
        const max = Math.max(...data.map((dep) => dep.ticketCount));
        return data.map((dep) => ({
            ...dep,
            transformedTicketCount: (dep.ticketCount / max) * (maxHeight + addTopMargin),
            ticketCount: dep.ticketCount,
        }));
    };

    const transformedData = normalizeData(data, 500);

    return (
        <div className="relative h-[500px] w-[60%] mt-5 mb-10 mx-auto">
            <div className=" absolute top-1/2 left-[-15px] translate-y-1/2 translate-x-[-50%] rotate-[-90deg]">
                Number of tickets
            </div>
            <div className="h-full border-b-2 border-l-2 border-solid border-black flex items-end gap-5 overflow-x-auto lg:overflow-x-hidden">
                {transformedData.map((dep) => (
                    <div
                        key={dep.id}
                        style={{
                            height: `${dep.transformedTicketCount}px`,
                            backgroundColor: dep.colour,
                        }}
                        className={clsx("group h-full flex-1 cursor-pointer", "hover:bg-gray-200 hover:duration-300 hover:scale-105", "transform origin-center transition-transform ease-in-out duration-300")}
                    >
                        <div className="text-center text-xs shrink-0 opacity-0 group-hover:opacity-100">
                            {dep.name}: ({dep.ticketCount})
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">Departments</div>
        </div>
    );
};

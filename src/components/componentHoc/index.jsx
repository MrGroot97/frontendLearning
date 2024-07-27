export const ComponentHoc = ({title, children}) => {
    return (
        <div className="flex flex-col bg-white text-black my-5 p-10 border-slate-600 border rounded-md">
            <h1 className="text-2xl font-bold">{title}</h1>
            {children}
        </div>
    );
};

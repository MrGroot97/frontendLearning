export const ComponentHoc = ({title, children}) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white text-black my-5 p-10 border-slate-600 border rounded-md">
            <h1 className="text-xl font-bold text-center md:text-2xl">{title}</h1>
            {children}
        </div>
    );
};

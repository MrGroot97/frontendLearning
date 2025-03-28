export const ShimmerUi = () => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-5 justify-center">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col w-fit rounded-lg justify-center border border-solid border-slate-300"
        >
          <div className="w-64 h-64 bg-gray-300 rounded-lg m-2 animate-pulse"></div>
          <div className=" w-64 h-5 bg-gray-300 rounded-lg m-2 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

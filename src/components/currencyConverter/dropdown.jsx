export const Dropdown = ({
    currencyList,
    currencyParams,
    setCurrencyParams,
    title,
    favorites,
    handleFavorites,
}) => {

    const onChange = (e) => {
        setCurrencyParams({
            ...currencyParams,
            [title]: e.target.value,
        });
    };
    console.log({currencyParams});

    return <div className="grow-1 flex flex-col w-full">
        <label htmlFor={title} className="font-semibold block text-gray-700">
            {title}:
        </label>
        <div className="mt-2 grow-1 w-full">
            <select
                id={title}
                onChange={onChange}
                value={currencyParams[title]}
                className="p-2 w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                
                <hr/>
                {currencyList.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <button>

            </button>
        </div>
    </div>;
};

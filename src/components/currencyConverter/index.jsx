import { useEffect, useState } from "react";
import { Dropdown } from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";


export const CurrencyConverter = () => {
    const [currencyList, setCurrencyList] = useState([]);
    const [currencyParams, setCurrencyParams] = useState({
        From: "USD",
        To: "INR",
        amount: 1,
    });
    const [convertedAmount, setConvertedAmount] = useState(0);

    const fetchCurrencyList = async () => {
        try {
            const response = await fetch(
                "https://api.frankfurter.app/currencies"
            );
            const data = await response.json();
            setCurrencyList(Object.keys(data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCurrencyList();
        convertPrice();
    }, []);

    useEffect(() => {
        convertPrice();
    }, [currencyParams]);

    const convertPrice = async () => {
        setConvertedAmount(0);
        try {
            const response = await fetch(
                `https://api.frankfurter.app/latest?amount=${currencyParams.amount}&from=${currencyParams.From}&to=${currencyParams.To}`
            );
            const data = await response.json();
            setConvertedAmount(data.rates[currencyParams.To]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSwap = () => {
        setCurrencyParams(prev => ({
            ...prev,
            From: prev.To,
            To: prev.From
        }));
    }

    return (
        <div className="bg-slate-300 max-w-[600px] p-5 m-auto rounded-lg">
            <div className="currency-form flex justify-evenly items-center gap-[10px]">
              <Dropdown currencyList={currencyList} currencyParams={currencyParams} setCurrencyParams={setCurrencyParams} title={'From'}/>
              <div className="flex justify-center items-center rounded-full mb-2 bg-slate-500 p-[2px] self-end">
                <button onClick={handleSwap}>
                    <HiArrowsRightLeft className="text-2xl text-black" />
                </button>
              </div>
              <Dropdown currencyList={currencyList} currencyParams={currencyParams} setCurrencyParams={setCurrencyParams} title={'To'}/>
            </div>
            <div className="quantity-input pt-5">
                <label htmlFor="amount" className="font-semibold">
                    Amount:{" "}
                </label>
                <input
                    type="number"
                    id="amount"
                    onChange={(e) =>
                        setCurrencyParams({
                            ...currencyParams,
                            amount: e.target.value,
                        })
                    }
                    value={currencyParams.amount}
                    className="h-[30px] pl-[5px] w-full border border-slate-300 rounded-md shadow-sm focus:outline-none"
                />
            </div>
            <div className="convert-btn flex justify-end pt-3">
                <button  onClick={convertPrice} className="text-white px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Convert
                </button>
            </div>
            {convertedAmount ? <div className="mt-4 text-right text-lg font-medium text-green-600">
                Converted amount is : {convertedAmount.toFixed(2)} {currencyParams.To}
            </div> : <div className="mt-4 text-right text-lg font-medium"> Loading .... </div>}
        </div>
    );
};

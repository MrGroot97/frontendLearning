import { AutoComplete } from "./autoComplete";

const index = () => {
    const fetchProducts = async (query) => {
        const response = await fetch(
            `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await response.json();
        return data.products;
    };
    return (
        <AutoComplete
            placeholder="Search product here"
            customLoading={<div>Loading...</div>}
            fetchSuggestions={fetchProducts}
            staticSuggestions={[]}
            dataKey="name"
            onChange={(e) => console.log(e)}
            onSelect={(e) => console.log(e)}
            onFocus={(e) => console.log(e)}
            onBlur={(e) => console.log(e)}
            customStyles={
                "border border-black bg-white min-w-[200px] rounded-md"
            }
        />
    );
};

export default index;

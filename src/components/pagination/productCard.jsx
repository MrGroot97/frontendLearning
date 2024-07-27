/* eslint-disable react/prop-types */
export const ProductCard = (props) => {
    const { product } = props;
    const { title, description, price, discountPercentage, thumbnail } =
        product;
    // round off the price to 2 decimal places
    const discountedPrice = (
        price -
        (price * discountPercentage) / 100
    ).toFixed(2);
    return (
        <div className="flex flex-col items-center p-[10px] border-2 border-slate-400 rounded-lg shadow-md">
            <img src={thumbnail} alt={title} className="w-[250px]" />
            <div className="flex flex-col px-[10px]">
                <h2 className="font-semibold text-start">{title}</h2>
                <div className="flex justify-between py-1">
                    <div>
                        <span className="text-slate-600 font-medium">
                            Price:{" "}
                        </span>
                        <span className="line-through">${price} </span>
                        <span className="text-green-600">
                            ${discountedPrice}
                        </span>
                    </div>
                    <p className="text-green-600 font-bold ">
                        -{discountPercentage}%off
                    </p>
                </div>
                <p className=" text-slate-600 font-medium">{description}</p>
            </div>
        </div>
    );
};

import { ListItem } from "./listItem";
import PropTypes from "prop-types";

export const Listcard = ({mapList, listKey, handleOnChange}) => {

    const onToggle = (e) => {
        const { checked, id } = e.target;
        const numId = Number(id);
        handleOnChange(numId,checked,listKey);
    }

    return (
        <div className=" w-[120px] flex flex-col py-3 justify-center items-center border border-slate-600 rounded-[10px]">
            {mapList?.map((item) => (
                <ListItem key={item.id} {...item} onChange={onToggle} />
            ))}
        </div>
    );
};

Listcard.propTypes = {
    mapList: PropTypes.array,
    listKey: PropTypes.number,
    handleOnChange: PropTypes.func
};

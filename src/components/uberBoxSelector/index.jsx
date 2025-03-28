import { box as Box } from "./box";

const index = () => {
    const boxData = [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
    ];

    return(
        <Box data={boxData} />
    );
};

export default index;

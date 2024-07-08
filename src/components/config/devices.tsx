import {FaHdd, FaMemory, FaMicrochip} from "react-icons/fa";

export const devices = [
    {
        name: "CPU",
        element: <FaMicrochip size={22}/>,
        progress: [17, 100]
    },
    {
        name: "RAM",
        element: <FaMemory size={22}/>,
        progress: [7, 16]
    },
    {
        name: "Disk",
        element: <FaHdd size={22}/>,
        progress: [38, 256]
    }
];
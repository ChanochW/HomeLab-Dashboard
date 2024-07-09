import {FaHdd, FaMemory, FaMicrochip} from "react-icons/fa";
import {getCPUUsage, getDiskUsage, getRAMUsage} from "../util/deviceData";

export const devices = [
    {
        name: "CPU",
        element: <FaMicrochip size={22}/>,
        progress: getCPUUsage()
    },
    {
        name: "RAM",
        element: <FaMemory size={22}/>,
        progress: getRAMUsage()
    },
    {
        name: "Disk",
        element: <FaHdd size={22}/>,
        progress: getDiskUsage()
    }
];
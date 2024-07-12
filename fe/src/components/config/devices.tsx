import {FaHdd, FaMemory, FaMicrochip} from "react-icons/fa";
import {ReactElement} from "react";

export interface DeviceType {
    name: string;
    element: ReactElement;
    progress: number[];
    error: boolean;
    loading: boolean;
}

export const devices: DeviceType[] = [
    {
        name: "CPU",
        element: <FaMicrochip size={22}/>,
        progress: [0, 100],
        loading: true,
        error: false
    },
    {
        name: "RAM",
        element: <FaMemory size={22}/>,
        progress: [0, 100],
        loading: true,
        error: false
    },
    {
        name: "Disk",
        element: <FaHdd size={22}/>,
        progress: [0, 100],
        loading: true,
        error: false
    }
];
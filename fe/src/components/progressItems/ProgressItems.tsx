import {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {ProgressItem} from "../progressItem/ProgressItem";
import {usePlatformValue} from "../../hooks/usePlatformValue";
import {FaHdd, FaMemory, FaMicrochip} from "react-icons/fa";
import {io} from "socket.io-client";

import desktopStyles from './progress_items.module.css';
import mobileStyles from './progress_items_mobile.module.css';

const socket = io("http://localhost:8080");

interface DeviceType {
    name: string;
    element: ReactElement;
    progress: number[];
}

export const ProgressItems: FunctionComponent = () => {
    const styles = usePlatformValue() ? mobileStyles : desktopStyles;
    const [deviceProgress, setDeviceProgress] = useState<DeviceType[]>(initialDevicesState);
    
    useEffect(() => {
        socket.on('cpu', (cpuUtilization) => {
            setDeviceProgress((prevState) =>
                prevState.map(device =>
                    device.name === "CPU"
                        ? { ...device, progress: [cpuUtilization, 100] }
                        : device
                )
            );
        });

        return () => {
            socket.off('cpu');
        };
    }, [])

    return (
        <div className={styles["progressItems"]}>
            {deviceProgress.map((device) =>
                <ProgressItem
                    key={device.name}
                    name={device.name}
                    currentValue={device.progress[0]}
                    maxValue={device.progress[1]}
                    graphicsElement={device.element}
                />
            )}
        </div>
    );
}

const initialDevicesState = [
    {
        name: "CPU",
        element: <FaMicrochip size={22}/>,
        progress: [0, 100]
    },
    {
        name: "RAM",
        element: <FaMemory size={22}/>,
        progress: [0, 100]
    },
    {
        name: "Disk",
        element: <FaHdd size={22}/>,
        progress: [0, 100]
    }
];
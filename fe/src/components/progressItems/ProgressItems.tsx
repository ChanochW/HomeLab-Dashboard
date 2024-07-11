import {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {ProgressItem} from "../progressItem/ProgressItem";
import {usePlatformValue} from "../../hooks/usePlatformValue";
import {FaHdd, FaMemory, FaMicrochip} from "react-icons/fa";
import {io} from "socket.io-client";

import desktopStyles from './progress_items.module.css';
import mobileStyles from './progress_items_mobile.module.css';

//TODO put in an env
const socket = io("http://localhost:8080");

interface DeviceType {
    name: string;
    element: ReactElement;
    progress: number[];
    error: boolean;
    loading: boolean;
}

export const ProgressItems: FunctionComponent = () => {
    const styles = usePlatformValue() ? mobileStyles : desktopStyles;
    const [deviceProgress, setDeviceProgress] = useState<DeviceType[]>(initialDevicesState);
    const [connectionError, setConnectionError] = useState(false);
    
    useEffect(() => {
        socket.on('connect_error', () => {
            setConnectionError(true);
        });

        socket.on('disconnect', () => {
            setConnectionError(true);
        })

        socket.on('cpu', (cpuUtilization) => {
            setDeviceProgress((prevState) =>
                prevState.map(device =>
                    device.name === "CPU"
                        ? { ...device, progress: [cpuUtilization, 100], error: false, loading: false }
                        : device
                )
            );
        });

        socket.on('ram', (ramUsage) => {
            setDeviceProgress((prevState) =>
                prevState.map(device =>
                    device.name === "RAM"
                        ? { ...device, progress: [ramUsage[0], ramUsage[1]], error: false, loading: false }
                        : device
                )
            );
        });

        socket.on('disk', (diskUsage) => {
            setDeviceProgress((prevState) =>
                prevState.map(device =>
                    device.name === "Disk"
                        ? { ...device, progress: [diskUsage[0], diskUsage[1]], error: false, loading: false }
                        : device
                )
            );
        });

        return () => {
            socket.off('cpu');
            socket.off('ram');
            socket.off('disk');
            socket.off('connect_error');
            socket.off('disconnect');
        };
    }, [])

    useEffect(() => {
        if (connectionError) {
            setDeviceProgress((prevState) =>
                prevState.map(device => {
                    if (device.name === "CPU") {
                        return { ...device, progress: [100, 100], error: true };
                    } else if (device.name === "RAM") {
                        return { ...device, progress: [100, 100], error: true };
                    } else if (device.name === "Disk") {
                        return { ...device, progress: [100, 100], error: true };
                    }else return device;
                })
            );
        }
    }, [connectionError]);

    return (
        <div className={styles["progressItems"]}>
            {deviceProgress.map((device) => {
                const progressPercentage = (device.progress[0] / device.progress[1]) * 100;
                const cpuLoadingDescription = "-%";
                const otherLoadingDescription = "-/- GB";
                const cpuDescription = device.loading ? cpuLoadingDescription : (`${device.error ? "-" : parseFloat(progressPercentage.toFixed(1))}%`);
                const otherDescription = device.loading ? otherLoadingDescription : (`${device.error ? "-" : parseFloat(device.progress[0].toFixed(1))}/${device.error ? "-" : parseFloat(device.progress[1].toFixed(1))} GB`);

                return (
                    <ProgressItem
                        key={device.name}
                        name={device.name}
                        graphicsElement={device.element}
                        progressPercentage={progressPercentage}
                        contentDescription={device.name === 'CPU' ? cpuDescription : otherDescription}
                        loading={device.loading}
                        error={device.error}
                    />
                );
            })}
        </div>
    );
}

const initialDevicesState = [
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
import { io } from 'socket.io-client';
import process from "process";

// const socket = io(process.env.REACT_APP_SERVER_URL);

export const getCPUUsage = () => {
    // socket.on('cpu', (data) => {
    //     setState((prevState) => ({
    //         ...prevState,
    //         progress: [data.usage, 100]
    //     }));
    // });

    return [17, 100];
}
export const getRAMUsage = () => {
    // implement dynamically
    return [7, 16];
}
export const getDiskUsage = () => {
    // implement dynamically
    return [38, 256];
}
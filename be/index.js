import {Server} from "socket.io";
import {averageUtilization, startCPUMonitor} from "./cpuMonitor.js";
import {getCurrentRAMUsage} from "./ramMonitor.js";
import {getCurrentDiskUsage} from "./diskMonitor.js";

const io = new Server(8080, {
    cors: {
        origin: "*", //TODO restrict client for production
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');

    const cpuIntervalMonitor = startCPUMonitor();

    const sendInitialLoad = () => {
        sendRAMUsage();
        sendDiskUsage();
    }

    const sendCPUUsage = () => {
        try {
            console.log("---------------------------------------------------------------");
            console.log(`Average CPU Utilization over 15 seconds: ${averageUtilization}%`);
            console.log("---------------------------------------------------------------");
            socket.emit('cpu', averageUtilization);
        } catch (error) {
            console.error('Error fetching CPU usage:', error);
        }
    };

    const sendRAMUsage = () => {
        getCurrentRAMUsage((error, ramUsage) => {
            if (error) {
                console.error(`Error fetching RAM usage: ${error.message}`);
            } else {
                console.log("-------------------------------------------");
                console.log(`RAM Usage: ${ramUsage[0]}/${ramUsage[1]} GB`);
                console.log("-------------------------------------------");
                socket.emit('ram', ramUsage);
            }
        });
    };

    const sendDiskUsage = () => {
        getCurrentDiskUsage((error, diskUsage) => {
            if (error) {
                console.error(error);
            } else {
                console.log("-------------------------------------------");
                console.log(`Disk Usage: ${diskUsage[0]}/${diskUsage[1]} GB`);
                console.log("-------------------------------------------");
                socket.emit('disk', diskUsage);
            }
        })
    }

    const initialInterval = setTimeout(sendInitialLoad, 10_000);
    const cpuInterval = setInterval(sendCPUUsage, 5_000);
    const ramInterval = setInterval(sendRAMUsage, 15_000);
    const diskInterval = setInterval(sendDiskUsage, 30_000);

    socket.on('disconnect', () => {
        clearTimeout(initialInterval);
        clearInterval(cpuInterval);
        clearInterval(cpuIntervalMonitor);
        clearInterval(ramInterval);
        clearInterval(diskInterval);
        console.log('Client disconnected');
    });
});

console.log('Socket.io server running at http://localhost:8080');

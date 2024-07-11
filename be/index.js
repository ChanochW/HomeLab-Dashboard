import {Server} from "socket.io";
import {averageUtilization, startCPUMonitor} from "./cpuMonitor.js";
import {getCurrentRAMUsage} from "./ramMonitor.js";

const io = new Server(8080, {
    cors: {
        origin: "*", //TODO restrict client for production
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');

    const cpuIntervalMonitor = startCPUMonitor();

    const sendCPUUsage = async () => {
        try {
            console.log("---------------------------------------------------------------");
            console.log(`Average CPU Utilization over 15 seconds: ${averageUtilization}%`);
            console.log("---------------------------------------------------------------");
            socket.emit('cpu', averageUtilization);
        } catch (error) {
            console.error('Error fetching CPU usage:', error);
        }
    };

    const sendRAMUsage = async () => {
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

    const cpuInterval = setInterval(sendCPUUsage, 5_000);
    const ramInterval = setInterval(sendRAMUsage, 15_000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(cpuInterval);
        clearInterval(cpuIntervalMonitor);
        clearInterval(ramInterval);
    });
});

console.log('Socket.io server running at http://localhost:8080');

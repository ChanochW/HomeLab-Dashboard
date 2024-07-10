import {Server} from "socket.io";
import {averageUtilization, startCPUMonitor} from "./cpuMonitor.js";

const io = new Server(8080, {
    cors: {
        origin: "*", //TODO restrict client for production
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');

    const intervalId = startCPUMonitor();

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

    const interval = setInterval(sendCPUUsage, 5000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
        clearInterval(intervalId);
    });
});

console.log('Socket.io server running at http://localhost:8080');

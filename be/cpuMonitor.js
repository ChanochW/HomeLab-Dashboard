import {exec} from "child_process";

export let averageUtilization = 0;

export function startCPUMonitor() {
    let cpuUtilizationPeriod = [];
    let intervalCount = 0;
    averageUtilization = 0;

    setInterval(() => {
        getCurrentCPUUtilization((error, cpuUtilization) => {
            if (intervalCount >= Number.MAX_SAFE_INTEGER) {
                intervalCount = 0;
            }
            intervalCount++;

            console.log("Interval #: " + intervalCount);

            if (cpuUtilizationPeriod.length >= 15) {
                cpuUtilizationPeriod.shift();
            }

            if (error) {
                console.error(`Failed to get CPU utilization: ${error.message}`);
            } else {
                console.log(`CPU Utilization: ${cpuUtilization}%`);
                cpuUtilizationPeriod.push(cpuUtilization);
            }

            if ((intervalCount % 5) === 0) {
                const sumOfMinute = cpuUtilizationPeriod.reduce((accumulatedValue, currentValue) =>
                    accumulatedValue + currentValue, 0);
                averageUtilization = parseFloat((sumOfMinute / cpuUtilizationPeriod.length).toFixed(2));
                console.log(`Updated average to: ${averageUtilization}`);
            }
        });
    }, 1000);
}

function getCurrentCPUUtilization(callback) {
    const windowsCommand = "wmic cpu get loadpercentage";

    //TODO add commands for linux and unix systems;

    exec(windowsCommand, (error, stdout, stderr) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (stderr) {
            callback(new Error(stderr), null);
            return;
        }

        const cpuUtilization = parseFloat(stdout.split("\n")[1].trim());

        if (isNaN(cpuUtilization)) {
            callback(new Error("The cpu utilization result was returned as NaN type."), null);
            return;
        }

        callback(null, cpuUtilization);
    })
}

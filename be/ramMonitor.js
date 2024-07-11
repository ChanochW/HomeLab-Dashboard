import {exec} from "child_process";

export function getCurrentRAMUsage(callback) {
    const windowsCommand = "wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Format:List";

    exec(windowsCommand, (error, stdout, stderr) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (stderr) {
            callback(new Error(stderr), null);
            return;
        }

        const lines = stdout.split('\n');
        let freeMemory = 0;
        let totalMemory = 0;

        lines.forEach(line => {
            const parts = line.split('=');
            if (parts.length === 2) {
                const key = parts[0].trim();
                const value = parseInt(parts[1].trim(), 10);

                if (key === 'FreePhysicalMemory') {
                    freeMemory = value;
                } else if (key === 'TotalVisibleMemorySize') {
                    totalMemory = value;
                }
            }
        });

        if (isNaN(freeMemory) || isNaN(totalMemory)) {
            callback(new Error("The RAM utilization result was returned as NaN type."), null);
            return;
        }

        const usedMemoryGB = parseFloat(((totalMemory - freeMemory) / (1024 * 1024)).toFixed(1));
        const totalMemoryGB = parseFloat((totalMemory / (1024 * 1024)).toFixed(1));

        callback(null, [usedMemoryGB, totalMemoryGB]);
    })
}
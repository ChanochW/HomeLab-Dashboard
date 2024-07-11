import {exec} from "child_process";

export function getCurrentDiskUsage(callback) {
    const windowsCommand = "wmic logicaldisk get size,freespace,caption /Format:List";

    exec(windowsCommand, (error, stdout, stderr) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (stderr) {
            callback(stderr, null);
            return;
        }

        const lines = stdout.split('\n');
        let drives = [];
        let drive = {};

        lines.forEach(line => {
            const parts = line.split('=');
            if (parts.length === 2) {
                const key = parts[0].trim();
                const value = parts[1].trim();

                if (key === 'Caption') {
                    drive = { caption: value };
                } else if (key === 'FreeSpace') {
                    drive.freeSpace = parseInt(value, 10);
                } else if (key === 'Size') {
                    drive.size = parseInt(value, 10);
                    drives.push(drive);
                    drive = {};
                }
            }
        });

        let totalUsedSpaceGB = 0;
        let totalStorageCapacityGB = 0;

        const formattedDeviceResults = drives.map(drive => {
            const usedSpace = (drive.size - drive.freeSpace) / (1024 * 1024 * 1024); // Convert to GB
            const totalSpace = drive.size / (1024 * 1024 * 1024); // Convert to GB

            totalUsedSpaceGB += usedSpace;
            totalStorageCapacityGB += totalSpace;

            return {
                drive: drive.caption,
                usedSpaceGB: usedSpace,
                totalSpaceGB: totalSpace
            };
        });

        callback(null, [parseFloat(totalUsedSpaceGB.toFixed(1)), parseFloat(totalStorageCapacityGB.toFixed(1)), formattedDeviceResults]);
    });
}
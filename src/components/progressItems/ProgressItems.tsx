import {FunctionComponent} from "react";
import {devices} from "../config/devices";
import {ProgressItem} from "../progressItem/ProgressItem";
import {usePlatformValue} from "../../hooks/usePlatformValue";

import desktopStyles from './progress_items.module.css';
import mobileStyles from './progress_items_mobile.module.css';

export const ProgressItems: FunctionComponent = () => {
    const styles = usePlatformValue() ? mobileStyles : desktopStyles;

    return (
        <div className={styles["progressItems"]}>
            {devices.map((device) =>
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
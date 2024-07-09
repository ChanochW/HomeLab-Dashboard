import {FunctionComponent, ReactElement} from "react";

import styles from './progress_item.module.css'

interface ProgressItemProps {
    name: string;
    currentValue: number;
    maxValue: number;
    graphicsElement: ReactElement;
}

export const ProgressItem: FunctionComponent<ProgressItemProps> = ({
   name,
   currentValue,
   maxValue,
   graphicsElement
}) => {
    const progressPercentage = (currentValue / maxValue) * 100;

    return (
        <div className={styles.progressItem}>
            {graphicsElement}
            <div className={styles.progressInfo}>
                <div>{name}</div>
                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
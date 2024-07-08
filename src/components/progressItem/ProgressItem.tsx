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
    return (
        <div className={styles.progressItem}>
            {graphicsElement}
            <div className={styles.progressInfo}>
                <div>{name}</div>
                <progress value={currentValue} max={maxValue}></progress>
            </div>
        </div>
    );
}
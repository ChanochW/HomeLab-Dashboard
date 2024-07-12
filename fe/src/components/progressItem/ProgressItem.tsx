import {FunctionComponent, ReactElement} from "react";

import styles from './progress_item.module.css'

interface ProgressItemProps {
    name: string;
    graphicsElement: ReactElement;
    progressPercentage: number;
    contentDescription: string;
    error: boolean;
    loading: boolean;
}

export const ProgressItem: FunctionComponent<ProgressItemProps> = ({
    name,
    graphicsElement,
    progressPercentage,
    contentDescription,
    error,
    loading
}) => {
    return (
        <div className={styles.progressItem}>
            {graphicsElement}
            <div className={styles.progressInfo}>
                <div className={styles.progressText}>
                    <span>{name}</span>
                    <span>{contentDescription}</span>
                </div>
                <div className={styles.progressContainer}>
                    <div
                        className={error ? styles.progressBarError : (loading ? styles.pulsing : styles.progressBar)}
                        style={{ width: `${error ? 100 : progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
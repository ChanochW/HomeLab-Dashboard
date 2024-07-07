import {FunctionComponent, ReactElement} from "react";

interface ProgressItemProps {
    name: string;
    currentValue: number;
    maxValue: number;
    graphicsElement: ReactElement;
    styles: { [key: string]: string };
}

export const ProgressItem: FunctionComponent<ProgressItemProps> = ({
   name,
   currentValue,
   maxValue,
   styles,
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
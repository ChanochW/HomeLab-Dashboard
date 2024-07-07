import {FunctionComponent} from "react";
import {SearchBar} from "../searchBar/SearchBar";
import {FaHdd, FaMemory, FaMicrochip} from "react-icons/fa";
import {ProgressItem} from "../ProgressItem";

import styles from './hamburgerMenu.module.css'

const devices = [
    {
        name: "CPU",
        element: <FaMicrochip size={22}/>,
        progress: [17, 100]
    },
    {
        name: "RAM",
        element: <FaMemory size={22}/>,
        progress: [7, 16]
    },
    {
        name: "Disk",
        element: <FaHdd size={22}/>,
        progress: [38, 256]
    }
]

export const HamburgerMenu: FunctionComponent = () => {
    return (
        <div className={styles.hamburgerMenu}>
            <SearchBar/>
            <div className={styles.progressItems}>
                {devices.map((device) =>
                    <ProgressItem
                        key={device.name}
                        name={device.name}
                        currentValue={device.progress[0]}
                        maxValue={device.progress[1]}
                        graphicsElement={device.element}
                        styles={styles}/>
                )}
            </div>
        </div>
    );
}
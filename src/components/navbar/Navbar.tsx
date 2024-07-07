import {forwardRef, FunctionComponent} from "react";
import {GiSpy} from "react-icons/gi";
import {FaHdd, FaMemory, FaMicrochip} from "react-icons/fa";

import styles from './navbar.module.css'
import {SearchBar} from "../searchBar/SearchBar";

export const Navbar: FunctionComponent = forwardRef((props, ref) => {

    return (
        <nav ref={ref} className={styles.navbar}>
            <div className={styles.navbarBrand}>
                <GiSpy size={64}/>
                <span>HomeLab Portal</span>
            </div>
            <div className={styles.progressItems}>
                <div className={styles.progressItem}>
                    <FaMicrochip size={22}/>
                    <div className={styles.progressInfo}>
                        <div>CPU</div>
                        <progress value="17" max="100"></progress>
                    </div>
                </div>
                <div className={styles.progressItem}>
                    <FaMemory size={22}/>
                    <div className={styles.progressInfo}>
                        <div>RAM</div>
                        <progress value="7" max="16"></progress>
                    </div>
                </div>
                <div className={styles.progressItem}>
                    <FaHdd size={22}/>
                    <div className={styles.progressInfo}>
                        <div>Disk</div>
                        <progress value="38" max="256"></progress>
                    </div>
                </div>
            </div>
            <SearchBar/>
        </nav>
    );
})
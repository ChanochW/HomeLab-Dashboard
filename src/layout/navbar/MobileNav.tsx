import {forwardRef, FunctionComponent, useState} from "react";
import {GiSpy} from "react-icons/gi";
import {FaBars, FaHdd, FaMemory, FaMicrochip, FaTimes} from 'react-icons/fa';
import {SearchBar} from "../searchBar/SearchBar";

import styles from './navbar_mobile.module.css'

export const MobileNav: FunctionComponent = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <nav ref={ref} className={styles.navbar}>
            <div className={styles.navbarBox}>
                <div className={styles.navbarBrand}>
                    <GiSpy size={64}/>
                    <span>HomeLab Portal</span>
                </div>
                <button className={styles.hamburgerButton} onClick={toggleMenu}>
                    {isOpen ? <FaTimes size={32}/> : <FaBars size={32}/>}
                </button>
            </div>
            {isOpen && <HamburgerMenu/>}
        </nav>
    );
})
const HamburgerMenu: FunctionComponent = () => {
    return (
        <div className={styles.hamburgerMenu}>
            <SearchBar className={styles.searchForm}/>
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
        </div>
    );
}
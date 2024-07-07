import {forwardRef, FunctionComponent, useState} from "react";
import {GiSpy} from "react-icons/gi";

import styles from './navbar_mobile.module.css'
import {HamburgerMenu} from "../hamburgerMenu/HamburgerMenu";
import {HamburgerButton} from "../hamburgerButton/HamburgerButton";

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
                <HamburgerButton toggleMenu={toggleMenu} isOpen={isOpen}/>
            </div>
            {isOpen && <HamburgerMenu/>}
        </nav>
    );
})
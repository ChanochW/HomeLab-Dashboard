import {forwardRef, FunctionComponent, useState} from "react";
import {HamburgerMenu} from "../hamburgerMenu/HamburgerMenu";
import {HamburgerButton} from "../hamburgerButton/HamburgerButton";
import {SiteBranding} from "../siteBranding/SiteBranding";

import styles from './navbar_mobile.module.css'

export const MobileNav: FunctionComponent = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <nav ref={ref} className={styles.navbar}>
            <div className={styles.navbarBox}>
                <SiteBranding/>
                <HamburgerButton toggleMenu={toggleMenu} isOpen={isOpen}/>
            </div>
            {isOpen && <HamburgerMenu/>}
        </nav>
    );
})
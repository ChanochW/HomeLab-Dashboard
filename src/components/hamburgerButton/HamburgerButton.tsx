import {FaBars, FaTimes} from "react-icons/fa";
import {FunctionComponent, useState} from "react";

import styles from './hamburger_button.module.css'

interface HamburgerButtonProps {
    toggleMenu: () => void;
    isOpen: boolean;
}

export const HamburgerButton: FunctionComponent<HamburgerButtonProps> = ({toggleMenu, isOpen}) => {
    const [isGrabbing, setIsGrabbing] = useState(false);

    const handleMouseDown = () => {
        setIsGrabbing(true);
    };

    const handleMouseUp = () => {
        setIsGrabbing(false);
    };

    return (
        <button
            className={`${styles.hamburgerButton} ${isGrabbing ? styles.grabbing : styles.grab}`}
            onClick={toggleMenu}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>
            {isOpen ? <FaTimes size={32}/> : <FaBars size={32}/>}
        </button>
    );
}

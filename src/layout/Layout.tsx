import {FunctionComponent} from "react";
import {Outlet} from "react-router-dom/dist";
import {Navbar} from "../components/navbar/Navbar";

import styles from './layout.module.css';
import {usePlatformValue} from "../hooks/usePlatformValue";
import {MobileNav} from "../components/navbar/MobileNav";
import {useNavbarHeight} from "../hooks/useNavbarHeight";

export const Layout: FunctionComponent = () => {
    const {navbarHeight, navbarRef} = useNavbarHeight();
    const isMobile = usePlatformValue();

    return (
        <>
            {isMobile ? <MobileNav ref={navbarRef}/> : <Navbar ref={navbarRef}/>}
            <div className={styles.content} style={{marginTop: navbarHeight}}>
                <Outlet/>
            </div>
        </>
    );
}
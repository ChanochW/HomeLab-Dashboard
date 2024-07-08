import {forwardRef, FunctionComponent} from "react";
import {SearchBar} from "../searchBar/SearchBar";
import {SiteBranding} from "../siteBranding/SiteBranding";
import {ProgressItems} from "../progressItems/ProgressItems";

import styles from './navbar.module.css'

export const Navbar: FunctionComponent = forwardRef((props, ref) => {

    return (
        <nav ref={ref} className={styles.navbar}>
            <SiteBranding/>
            <ProgressItems/>
            <SearchBar/>
        </nav>
    );
})
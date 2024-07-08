import {FunctionComponent} from "react";
import {SearchBar} from "../searchBar/SearchBar";
import {ProgressItems} from "../progressItems/ProgressItems";

import styles from './hamburgerMenu.module.css'

export const HamburgerMenu: FunctionComponent = () => {
    return (
        <div className={styles.hamburgerMenu}>
            <SearchBar/>
            <ProgressItems/>
        </div>
    );
}
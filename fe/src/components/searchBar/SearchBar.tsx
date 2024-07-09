import React, {FunctionComponent, useState} from "react";
import {usePlatformValue} from "../../hooks/usePlatformValue";

import desktopStyles from './searchBar.module.css';
import mobileStyles from './searchBar_mobile.module.css';

export const SearchBar: FunctionComponent = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const styles = usePlatformValue() ? mobileStyles : desktopStyles;

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <form className={styles["searchForm"]}>
            <input
                type="text"
                name="searchTerm"
                value={searchTerm}
                placeholder="Search..."
                onChange={handleSearchChange}
            />
        </form>
    );
}
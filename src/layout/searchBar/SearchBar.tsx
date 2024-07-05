import React, {FunctionComponent, useEffect, useState} from "react";
import desktopStyles from './searchBar.module.css';
import mobileStyles from './searchBar_mobile.module.css';
import {usePlatformValue} from "../../hooks/usePlatformValue";

export const SearchBar: FunctionComponent = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const styles = usePlatformValue() ? mobileStyles : desktopStyles;

    useEffect(() => {
        console.log(searchTerm);
    }, [searchTerm])

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <form className={styles["searchForm"]}>
            <input
                type="text"
                value={searchTerm}
                placeholder="Search..."
                onChange={handleSearchChange}
            />
        </form>
    );
}
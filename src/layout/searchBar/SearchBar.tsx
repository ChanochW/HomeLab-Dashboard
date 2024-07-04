import React, {FunctionComponent, useEffect, useState} from "react";

interface SearchBarProps {
    className: string;
}
export const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        console.log(searchTerm);
    }, [searchTerm])

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <form className={props.className}>
            <input
                type="text"
                value={searchTerm}
                placeholder="Search..."
                onChange={handleSearchChange}
            />
        </form>
    );
}
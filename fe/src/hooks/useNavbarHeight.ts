import { useLayoutEffect, useRef, useState } from "react";

export const useNavbarHeight = () => {
    const [navbarHeight, setNavbarHeight] = useState<number>(0);
    const navbarRef = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        const measureHeight = () => {
            if (navbarRef.current) {
                const height = navbarRef.current!.offsetHeight;
                setNavbarHeight(height);
            }
        };
        measureHeight();
    }, []);

    return { navbarHeight, navbarRef };
};
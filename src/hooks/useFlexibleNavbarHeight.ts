import {useLayoutEffect, useRef, useState} from "react";

export const useFlexibleNavbarHeight = () => {
    const [navbarHeight, setNavbarHeight] = useState<number>(0);
    const navbarRef = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        const measureHeight = () => {
            console.log("Measure Height Called...");
            if (navbarRef.current) {
                const height = navbarRef.current?.offsetHeight;
                console.log(height);
                setNavbarHeight(height!);
            }
        };
        measureHeight();

        const resizeObserver = new ResizeObserver(() => {
            measureHeight();
        });

        const navElement = navbarRef.current;
        
        if (navElement) {
            resizeObserver.observe(navElement);
        }

        return () => {
            if (navElement) {
                resizeObserver.unobserve(navElement);
            }
        };
    }, []);

    return {navbarHeight, navbarRef};
};

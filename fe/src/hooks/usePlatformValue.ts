import { useEffect, useState } from "react";

export const usePlatformValue = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1055);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 1055);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
};

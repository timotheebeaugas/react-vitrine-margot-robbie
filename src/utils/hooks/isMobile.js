import { useEffect } from "react";
import { useState } from "react";

export const useIsMobile = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(/Mobi/i.test(window.navigator.userAgent));
    }, [])

    return [isMobile]
};
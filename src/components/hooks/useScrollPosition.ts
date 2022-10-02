import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../App";

export const useScrollPosition = () => {
    const [currentScrollPosition, setCurrentScrollPosition] = useState<number>();
    const globalScrollPosition = useContext(ScrollContext);

    useEffect(() => {
        const currentScrollPosition = 
    }, []);
};
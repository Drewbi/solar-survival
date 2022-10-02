import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { ScrollContext } from "../../App";
import { Section } from "../sections";

export const useScrollPosition = (sections: Section[], selectedSection: Section) => {
    const globalScrollPosition = useContext(ScrollContext);
    const [selectedComponentScrollPosition, setSelectedComponentScrollPositionn] = useState<number>(0);
    const [scrollPositionsForSections, setScrollPositionsForSections] = useState<{ url: string, scrollValue: number}[]>([]);

    const getScrollPositionForItem = (section: Section) => {
        const sectionIndex = sections.findIndex(sec => sec.url === section?.url);
        return sections.slice(0, sectionIndex).reduce((acc, curr) => acc + curr.length, 0);
    }

    useEffect(() => {
        setScrollPositionsForSections(sections.map((section) => {
            return {
                url: section.url,
                scrollValue: getScrollPositionForItem(section)
            }
        }))
    }, []);

    useLayoutEffect(() => {
        setSelectedComponentScrollPositionn(getScrollPositionForItem(selectedSection));
    }, [selectedSection, sections]);

    return { selectedComponentScrollPosition, scrollPositionsForSections };
};
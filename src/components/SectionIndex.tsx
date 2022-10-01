import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

export interface Section {
    sectionTitle: string;
    sectionUrl: string;
    sectionComponent: JSX.Element;
}

interface SectionIndexProps {
    sections: Section[];
}

const SectionWrapper = styled.div`
    width: 100%;
`

const SectionSelector = styled.div`
    position: absolute;
    left: 50px;
    top: auto;
    display: flex;
    flex-direction: column;
`

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SectionTitle = styled.div`
    border: none;
    width: 0.7rem;
    height: 5rem;
    margin: 2rem 0;
    border-radius: 10px;
    background-color: green;
    transition: 0.25s ease-in;
    & > span {
        position: relative;
        opacity: 0;
        left: -2rem;
        top: -30%;
        transition: 0.25s ease-in;
    }

    &:hover, &.selected {
        background-color: red;
        & > span {
            left: 2rem;
            top: 30%;
            opacity: 1;
        }
    }
`

export const SectionIndex = ({ sections }: SectionIndexProps) => {
    if (sections.length == 0 || typeof window == 'undefined') {
        // Add error component maybe?
        return null;
    }

    const [selectedSection, setSelectedSection] = useState<Section>();
    const containerRef = useRef<HTMLDivElement>(null);
    const onChangeSection = useCallback((selectedSection: Section) => {
        window.history.replaceState(null, selectedSection.sectionTitle, `?section=${selectedSection.sectionUrl}`);
    }, [selectedSection]);
    const intersectionCallback = () => {

    }

    useEffect(() => {
        const sectionUrlParam = new URLSearchParams(window.location.search).get('section');
        console.log(sectionUrlParam);
        if (sectionUrlParam) {
            setSelectedSection(sections.find(section => section.sectionUrl === sectionUrlParam) || sections[0]);
        } else {
            setSelectedSection(sections[0]);
        }
    }, []);

    // Intersection Observer effect
    // useEffect(() => {
    //     const observer = new IntersectionObserver()
    // });

    return (
        <SectionWrapper ref={containerRef}>
            <SectionSelector>
                {sections.map((section, index) => 
                    <SectionTitle 
                        onClick={() => { setSelectedSection(section); onChangeSection(section); }} 
                        key={`${section.sectionTitle}-${index}}`}
                        className={selectedSection?.sectionUrl === section.sectionUrl ? 'selected' : undefined}
                    >
                        <span>{section.sectionTitle}</span>
                    </SectionTitle>
                )}
            </SectionSelector>
            {sections.map((section) => <SectionContainer>{section.sectionComponent}</SectionContainer>)}
        </SectionWrapper>
    );

}
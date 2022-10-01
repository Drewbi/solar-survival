import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

export interface Section {
    sectionTitle: string;
    sectionUrl: string;
    sectionComponent: JSX.Element;
}

interface SectionProps {
    sections: Section[];
    scroll: number;
}

const SectionWrapper = styled.div`
    width: 100%;
    position: relative;
`

const SectionSelector = styled.div`
    position: fixed;
    left: 20px;
    top: auto;
    display: flex;
    flex-direction: column;
    z-index: 9999;
`

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: relative;
`

const SectionMarkerContainer = styled.div`
    height: 3rem;
    width: 3rem;
    position: relative;
    margin: 0.5rem 0;
    cursor: pointer;

    &:hover, &.selected {
        & > div {
            background-color: #5deab1;
        }
        & > span {
            left: 1rem;
            opacity: 1;
        }
    }
`

const SectionMarker = styled.div`
    border: none;
    width: 0.3rem;
    height: 100%;
    border-radius: 10px;
    background-color: #222;
    transition: 0.1s ease-in;
`

const SectionMarkerTitle = styled.span`
    position: absolute;
    white-space: nowrap;
    font-size: 0.8rem;
    top: calc(3rem / 2 - 0.8rem / 2);
    transition: 0.1s ease-in;
    left: 0.5rem;
    opacity: 0;
`

export const Sections = ({ sections, scroll }: SectionProps) => {
    if (sections.length == 0 || typeof window == 'undefined') {
        // Add error component maybe?
        return null;
    }

    const [selectedSection, setSelectedSection] = useState<Section>();
    const containerRef = useRef<HTMLDivElement>(null);
    const wrappedSections = sections.map((section) => <SectionContainer className="section-container">{section.sectionComponent}</SectionContainer>);
    const onChangeSection = useCallback((selectedSection: Section) => {
        window.history.replaceState(null, selectedSection.sectionTitle, `?section=${selectedSection.sectionUrl}`);
    }, [selectedSection]);
    
    useEffect(() => {
        const sectionUrlParam = new URLSearchParams(window.location.search).get('section');
        if (sectionUrlParam) {
            setSelectedSection(sections.find(section => section.sectionUrl === sectionUrlParam) || sections[0]);
        } else {
            setSelectedSection(sections[0]);
        }
    }, []);

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.intersectionRatio > 0) {
              // Add 'active' class if observation target is inside viewport
              entry.target.classList.add('active');
            } else {
              // Remove 'active' class otherwise
              entry.target.classList.remove('active');
            }
          });
    });

    useLayoutEffect(() => {
        const allSectionElements = document.querySelectorAll('.section-container');
        allSectionElements.forEach((element) => {
            intersectionObserver.observe(element);
        });

        return () => intersectionObserver.disconnect();
    }, []);

    return (
        <SectionWrapper ref={containerRef}>
            <SectionSelector>
                {sections.map((section, index) =>
                    <SectionMarkerContainer>
                        <SectionMarker 
                            onClick={() => { setSelectedSection(section); onChangeSection(section); }} 
                            key={`${section.sectionTitle}-${index}}`}
                            className={selectedSection?.sectionUrl === section.sectionUrl ? 'selected' : undefined}
                        />
                        <SectionMarkerTitle>{section.sectionTitle}</SectionMarkerTitle>
                    </SectionMarkerContainer>
                )}
            </SectionSelector>
            {wrappedSections}
        </SectionWrapper>
    );

}
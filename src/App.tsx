import React, { useLayoutEffect, useState, useContext, createContext } from "react";
import styled from "styled-components";
import { Sections, Section } from "./components/sections";
import './App.css'
import { Intro } from "./components/sections/Intro";
import { UnderAttack } from './components/sections/UnderAttack';
import { Forecast } from './components/sections/Forecast';
import { StormySeas } from './components/sections/StormySeas';
import { Harbour } from './components/sections/Harbour';
import { SuperStorms } from './components/sections/SuperStorms';
import { ReadyOrNot } from './components/sections/ReadyOrNot';

const ScrollDisp = styled.span`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`

function App() {
  const [scrollValue, setScrollValue] = useState<number>(0);
  const ScrollContext = useContext(createContext(0));

  const sections: Section[] = [
    {
      sectionTitle: 'Solar Survival',
      sectionComponent: <Intro />,
      sectionUrl: 'solar-survival'
    }, {
      sectionTitle: 'Life Under Attack',
      sectionComponent: <UnderAttack />,
      sectionUrl: 'under-attack'
    }, {
      sectionTitle: 'A Chaotic Forecast',
      sectionComponent: <Forecast />,
      sectionUrl: 'chaos-forcast'
    }, {
      sectionTitle: 'Stormy Seas',
      sectionComponent: <StormySeas />,
      sectionUrl: 'stormy-seas'
    }, {
      sectionTitle: 'Ships in a Harbour',
      sectionComponent: <Harbour />,
      sectionUrl: 'ships-in-harbour'
    }, {
      sectionTitle: 'Super Storms',
      sectionComponent: <SuperStorms />,
      sectionUrl: 'super-storms'
    }, {
      sectionTitle: 'Ready or Not',
      sectionComponent: <ReadyOrNot />,
      sectionUrl: 'ready-or-not'
    }
  ];

  useLayoutEffect(() => {
    const scrollEvent = () => {
      setScrollValue(window.scrollY);
    };

    window.addEventListener('scroll',scrollEvent);

    () => window.removeEventListener('scroll', scrollEvent);
  }, []);

  return (
    <div id="App">
      <Sections sections={sections} scroll={scrollValue} />
      <ScrollDisp>{scrollValue}</ScrollDisp>
    </div>
  )
}

export default App

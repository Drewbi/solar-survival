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

export const ScrollContext = createContext(0);

function App() {
  const [scrollValue, setScrollValue] = useState<number>(0);

  const sections: Section[] = [
    {
      title: 'Solar Survival',
      component: <Intro />,
      url: 'solar-survival',
      length: 1700
    }, {
      title: 'Life Under Attack',
      component: <UnderAttack />,
      url: 'under-attack',
      length: 1000
    }, {
      title: 'A Chaotic Forecast',
      component: <Forecast />,
      url: 'chaos-forcast',
      length: 1000
    }, {
      title: 'Ships in a Harbour',
      component: <Harbour />,
      url: 'ships-in-harbour',
      length: 1000
    }, {
      title: 'Stormy Seas',
      component: <StormySeas />,
      url: 'stormy-seas',
      length: 500
    }, {
      title: 'Super Storms',
      component: <SuperStorms />,
      url: 'super-storms',
      length: 500
    }, {
      title: 'Ready or Not',
      component: <ReadyOrNot />,
      url: 'ready-or-not',
      length: 1000
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
      <ScrollContext.Provider value={scrollValue}>
        <Sections sections={sections} scroll={scrollValue} />
        <ScrollDisp>{scrollValue}</ScrollDisp>
      </ScrollContext.Provider>
    </div>
  )
}

export default App

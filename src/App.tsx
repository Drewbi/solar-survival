import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { SectionIndex, Section } from "./components/SectionIndex";
import './App.css'
import { UnderAttack } from './components/sections/UnderAttack';
import { Forecast } from './components/sections/Forecast';
import { StormySeas } from './components/sections/StormySeas';
import { Harbour } from './components/sections/Harbour';
import { SuperStorms } from './components/sections/SuperStorms';
import { ReadyOrNot } from './components/sections/ReadyOrNot';

function App() {
  const [count, setCount] = useState(0)

  const sections: Section[] = [
    {
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
  ]

  return (
    <div className="App">
      <SectionIndex sections={sections} />
    </div>
  )
}

export default App

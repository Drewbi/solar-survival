import styled from "styled-components"
import { EarthDefence } from "../visuals/EarthDefence"
const Container = styled.div`
  position: absolute;
  left: 10rem;
  top: 0;
`
const Title = styled.h2`
  font-size: 2rem;
  user-select: none;
`

const Text = styled.p`
  font-size: 1.3rem;
  width: 30rem;
  margin-bottom: 3rem;
  user-select: none;
`



export const Harbour = () => {
  
  return (
    <>
      <EarthDefence /> 
      <Container>
        <Title>Ships in a Harbour</Title>
        <Text>The Earth provides us with protection from these dangerous effect with its own magnetic field and atmosphere.</Text>
        <Text>High energy particles are redirected away or absorbed high up in the earths atmosphere.</Text>
        <Text>Particles interact with Earth's magnetic field causing them to flow to the polar regions, releasing energy as they are absorbed which we can see as an Aurora.</Text>
        <Text>Swipe or drag to interact</Text>
      </Container>
    </>
  )

}
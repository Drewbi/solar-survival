import styled from "styled-components";
import { SolarMap } from "../visuals/SolarMap";

const Title = styled.h1`
  position: absolute;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  letter-spacing: 1.1rem;
  top: 50rem;
`

export const Intro = () => (
  <>
    <SolarMap />
    <Title>Solar Survival</Title>
  </>
)
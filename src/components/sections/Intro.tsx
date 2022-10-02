import styled from "styled-components";
import { SolarMap } from "../visuals/SolarMap";

const Title = styled.h1`
  position: absolute;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 1.1rem;
  top: 50rem;
`

export const Intro = () => (
  <>
    <SolarMap />
    <Title>Solar Survival</Title>
  </>
)
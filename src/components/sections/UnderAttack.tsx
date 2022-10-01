import styled from "styled-components"
import earthImg from "../../assets/earth.jpg"

const Container1 = styled.div`
  position: absolute;
  left: 10rem;
  top: 0;
`
const Title = styled.h2`
  font-size: 2rem;
`

const Text = styled.p`
  font-size: 1.3rem;
  width: 30rem;
  margin-bottom: 3rem;
`

const Earth = styled.img`
  position: absolute;
  top: calc(50% + 30rem);
  width: 2rem;
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 100 100" xml:space="preserve"><style type="text/css">.blur{filter:url(%23softedge);}</style><filter id="softedge"><feGaussianBlur stdDeviation="0.2"></feGaussianBlur></filter><g class="blur"><circle cx="50" cy="50" r="44"/></g></svg>');
  -webkit-mask-size: cover;
  transform: rotate(80deg);
`

export const UnderAttack = () => (
  <>
    {/* <Earth src={earthImg}/> */}
    <Container1>
      <Title>Life Under Attack</Title>
      <Text>Our life on earth is possible because of the sun, but our star is anything but peaceful.</Text>
      <Text>Raging seas of plasma flow and interact creating powerful magnetic fields which constantly change and tangle with each other.</Text>
      <Text>Interference between these fields can cause massive accelerations of particles away from the sun and far out into space.</Text>
      <Text>We can think of this like solar weather with winds and storms.</Text>
    </Container1>
  </>
)
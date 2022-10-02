import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  right: 10rem;
  top: 0;
`
const Title = styled.h2`
  font-size: 2rem;
  text-align: right;
`

const Text = styled.p`
  font-size: 1.3rem;
  width: 30rem;
  margin-bottom: 3rem;
  text-align: right;
`

export const SuperStorms = () => (
  <Container>
    <Title>Super Storms</Title>
    <Text>Throughout history the effects of solar storms has been minimal, however one or two times per century a massive storm hits the earth, causing a shockwave in the magnetosphere which can transfer large amounts of energy back towards the earth.</Text>
    <Text>The destruction to our modern infrastructure would be massive. Electronics would temporarily malfunction while large scale power grids could malfunction and be taken offline for months or years.</Text>
  </Container>
)
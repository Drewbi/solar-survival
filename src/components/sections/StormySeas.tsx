import styled from "styled-components"

const Container = styled.div`
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

export const StormySeas = () => (
  <Container>
    <Title>Stormy Seas</Title>
    <Text>In outer space, the damage of even small solar storms can be devastating.</Text>
  </Container>
)
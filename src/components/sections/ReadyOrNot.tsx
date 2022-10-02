import styled from "styled-components"
import earthImg from "../../assets/highresAtmos.jpg"

const Container = styled.div`
  position: absolute;
  top: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`
const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
`

const Text = styled.p`
  font-size: 1.3rem;
  width: 30rem;
  margin-bottom: 3rem;
  text-align: center;
`

const Earth = styled.img`
  position: absolute;
  bottom: -10rem;
  width: 100%;
  /* -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent); */
  mask-image: linear-gradient(transparent, #00000000, #ffffffff, #ffffffff);
`

export const ReadyOrNot = () => (
  <>
    <Container>
      <Title>Ready or Not</Title>
      <Text>Although these effects are terrifying to imagine, many of them can be resolved with constant monitoring and planning for these kinds of events.</Text>
    </Container>
    <Earth src={earthImg}/>
  </>
)
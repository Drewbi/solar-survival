import { useEffect, useState } from "react"
import styled from "styled-components"
import { wind, storm, hurricane, lightning, sun } from "../../assets/icons"

const Container = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0rem;
  top: 0rem;
`

const MainTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
`

const WeatherContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 13rem;
  cursor: pointer;
  &:hover, &.selected  {
    & > img {
      transition: border 0.2s ease-in-out;
      border: 4px solid #5deab1;
    }
  }
`

const WeatherIcon = styled.img`
  width: 4rem;
  height: 4rem;
  border: 4px solid #333;
  padding: 1rem;
`

const Title = styled.h3`
  font-size: 1.5rem;
`

const Text = styled.p`
  font-size: 1.5rem;
  width: min(50rem, 80vw);
  text-align: center;
  margin-bottom: 5rem;
`

interface Weather {
  title: string;
  text: string;
  icon: string;
}

const weatherForecast: Weather[] = [
  {
    title: 'Strong Wind',
    text: 'Charged particles are constantly carried away from the sun and spread far into space like a constant solar wind.',
    icon: wind
  },
  {
    title: 'Heavy Downpour',
    text: 'Solar flares are bursts of energy on the suns surface that send radiation out into space like a cosmic rainstorm.',
    icon: storm
  },
  {
    title: 'Hurricane Warning',
    text: 'The most powerful emissions from the sun are Coronal Mass Ejections which are fast moving bubbles of radiation and particles sending millions or billions of tons of plasma flying out from the suns atmosphere.',
    icon: hurricane
  },
  {
    title: 'Lightning and Thunder',
    text: 'Just like thunder and lightning, Coronal Mass Ejections can accompany solar flares in the of the most powerful explosions in our solar system.',
    icon: lightning
  },
  {
    title: 'Sunny',
    text: 'A pleasant day at 15 million degrees celsius.',
    icon: sun
  }
]

export const Forecast = () => {
  const [ selectedForecast, setForecast] = useState<Weather>();
  return (
    <Container>
      <MainTitle>A Chaotic Forecast</MainTitle>
      <Text>This week on the sun</Text>
      <WeatherContainer>
        {weatherForecast.map(item => (
          <WeatherCard className={(selectedForecast && item.title === selectedForecast.title) ? 'selected' : ''} onClick={() => setForecast(item)}>
            <WeatherIcon src={item.icon} />
            <Title>{item.title}</Title>
          </WeatherCard>
        ))}
      </WeatherContainer>
      <Text>{selectedForecast?.text}</Text>
    </Container>
  )
}
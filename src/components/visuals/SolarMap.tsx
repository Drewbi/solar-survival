import { useContext } from "react"
import styled from "styled-components"
import { ScrollContext } from "../../App"

interface ImageProps {
    scrollAmount: number
}

const SolarImage = styled.img<ImageProps>`
    position: ${props => props.scrollAmount < 800 ? 'fixed' : 'absolute'}; 
    /* width: calc(120vw - ${props => props.scrollAmount / 5}rem);  */
    width: 120vw; 
    height: auto; 
    top: ${props => props.scrollAmount < 800 ? '-20rem' : '28rem'};
    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 100 100" xml:space="preserve"><style type="text/css">.blur{filter:url(%23softedge);}</style><filter id="softedge"><feGaussianBlur stdDeviation="1.4"></feGaussianBlur></filter><g class="blur"><circle cx="50" cy="50" r="43"/></g></svg>'); 
    -webkit-mask-size: cover;
    transition: opacity 0.5s ease-in;
    opacity: 0;
    &.selected {
        opacity: 1;
    }
`

const CHANNELS = ['0304', '0335', '0211', '0193', '0171', '0094', '0131', '0304' ]

const imgList = CHANNELS.map(channel => `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_${channel}.jpg`)

export const SolarMap = () => {
    const ScrollValue = useContext(ScrollContext)

    return (
        <>
            <SolarImage src={imgList[0]} key={imgList[0] + '-default'} scrollAmount={ScrollValue} className='selected' />
            {imgList.map((src, i, arr) => {
                const isSelected = ScrollValue >= i * (700 / arr.length) && ScrollValue <= (i + 1) * (700 / arr.length)
                return (
                    <SolarImage src={src} key={src} scrollAmount={ScrollValue} className={isSelected ? 'selected' : ''} />
                )      
            })}
        </>
    )
}
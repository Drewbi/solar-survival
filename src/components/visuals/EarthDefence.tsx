import p5, { Vector } from 'p5'
import { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'

const VisContainer = styled.div`
  position: absolute;
  top: 20rem;
  right: 0;
  width: 300rem;
  height: 30rem;
  cursor: pointer;
  & > canvas {
    width: 100% !important;
    height: 100% !important;
  }
`

export const EarthDefence = () => {
  const visRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if(visRef.current?.childNodes.length === 0) {
      new p5(sketch, visRef.current ?? undefined)
    }
  }, [])
  return (
    <VisContainer ref={ visRef } />
  )
}


const VIS_HEIGHT = 1000
const VIS_WIDTH = 10000
const NUM_DOTS = 200
const MAX_DOTS = 2000
const MAX_SPEED = 10
// const magnetosphere: Vector[][]


interface dot {
  pos: Vector
  velocity: Vector
  default: boolean
}
const dots: dot[] = []

function initDots(number: number) {
  for(let i = 0; i < number; i ++) {
    dots.push({ pos: new Vector(Math.random() * VIS_WIDTH, Math.random() * VIS_HEIGHT), velocity: new Vector(100, 0), default: true})
  }
}

function addDots(x: number, y: number) {
  dots.push({ pos: new Vector(x, y), velocity: new Vector(100, 0), default: false})
}

function calcDeflectionAngle(x: number, y: number) {
  
}

const res = 10
const EARTH_X = VIS_WIDTH - 300
const EARTH_Y = VIS_HEIGHT / 2
const GRID_WIDTH = 1000
const GRID_HEIGHT = 1000
const GRID_OFFSET_X = EARTH_X - (GRID_WIDTH / 2)
const GRID_OFFSET_Y = EARTH_Y  - (GRID_HEIGHT / 2)

let grid_X: number[][]
let grid_Y: number[][]
let northPole: Charge
let southPole: Charge

class Charge {
  x: number
  y: number
  v: number

  constructor (x: number, y: number, v: number)  {
    this.x = x
    this.y = y
    this.v = v
  }
    

  display(sketch: p5) {
      if (this.v > 0) {
        sketch.fill(255, 0, 0, 100);
      } else if (this.v < 0) {
        sketch.fill(0, 0, 255, 100);
      }
      sketch.stroke(0);
      sketch.strokeWeight(1);
      sketch.ellipse(this.x, this.y, 15, 15);
  }
}

function vectorGrid() {
  var x1 = 0;
  for (var i = 0; i < GRID_HEIGHT / res; i++) {
      for (var j = 0; j < GRID_HEIGHT / res; j++) {
          const x = res / 2 + i * res + GRID_OFFSET_X
          const y = res / 2 + j * res + GRID_OFFSET_Y
          const dx = x - northPole.x;
          const dy = y - northPole.y;
          const d1 = Math.sqrt(dx * dx + dy * dy);
          const E1 = northPole.v / (d1 * d1);
          const E1x = dx * E1 / d1;
          const E1y = dy * E1 / d1;

          const dxn = x - southPole.x;
          const dyn = y - southPole.y;
          const d2 = Math.sqrt(dxn * dxn + dyn * dyn);
          const E2 = southPole.v / (d2 * d2);
          const E2x = dxn * E2 / d2;
          const E2y = dyn * E2 / d2;

          const EEx = E1x + E2x;
          const EEy = E1y + E2y;
          const EE = Math.sqrt(EEx * EEx + EEy * EEy);

          const deltax = 15 * EEx / EE;
          const deltay = 15 * EEy / EE;
          grid_X[i][j] = deltax
          grid_Y[i][j] = deltay



      }

  }
}

function drawLines(sketch: p5) {
  for (let i = 0; i < 5000; i++) {
      const x = sketch.random(GRID_WIDTH);
      const xf = sketch.floor(x / (res));
      const y = sketch.random(GRID_HEIGHT);
      const yf = sketch.floor(y / (res));
      const opacity = ((GRID_WIDTH / 2) - Math.sqrt(Math.pow(x - GRID_WIDTH / 2, 2) + Math.pow(y - GRID_HEIGHT / 2, 2))) / (GRID_WIDTH / 2)
      sketch.stroke(255, opacity * 255)
      sketch.line(GRID_OFFSET_X + x, GRID_OFFSET_Y + y, GRID_OFFSET_X + x + grid_X[xf][yf], GRID_OFFSET_Y + y + grid_Y[xf][yf])
  }
}

function drawGrid(sketch: p5) {
  sketch.stroke(255, 20)
  for (var i = 0; i < GRID_WIDTH; i += 20) {
    sketch.line(GRID_OFFSET_X + 0, GRID_OFFSET_Y + i, GRID_OFFSET_X + GRID_WIDTH, GRID_OFFSET_Y + i)
    sketch.line(GRID_OFFSET_X + i, GRID_OFFSET_Y + 0, GRID_OFFSET_X + i, GRID_OFFSET_Y + GRID_HEIGHT)
  }
}

function getForceX(x: number, y: number, sketch: p5) {
  const convX = x - GRID_OFFSET_X
  const convY = y - GRID_OFFSET_Y
  if(convX >= 0 && convX < GRID_WIDTH && convY >= 0 && convY < GRID_HEIGHT) {
    const xf = sketch.floor(convX / (res));
    const yf = sketch.floor(convY / (res));
    return grid_X[xf][yf]
  }
  return 0
}

function getForceY(x: number, y: number, sketch: p5) {
  const convX = x - GRID_OFFSET_X
  const convY = y - GRID_OFFSET_Y
  if(convX >= 0 && convX < GRID_WIDTH && convY >= 0 && convY < GRID_HEIGHT) {
    const xf = sketch.floor(convX / (res));
    const yf = sketch.floor(convY / (res));
    return grid_Y[xf][yf]
  }
  return 0
}


const sketch = (sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(VIS_WIDTH, VIS_HEIGHT)
    sketch.background(10)

    initDots(NUM_DOTS)

    grid_X = new Array(GRID_WIDTH / res);
    grid_Y = new Array(GRID_WIDTH / res);
    for (var i = 0; i < GRID_WIDTH / res; i++) {
        grid_X[i] = new Array(GRID_HEIGHT / res);
        grid_Y[i] = new Array(GRID_HEIGHT / res);
    }
    northPole = new Charge(EARTH_X - 0, EARTH_Y, 30)
    southPole = new Charge(EARTH_X + 1000, EARTH_Y, -1000)
    vectorGrid()
    
  }

  sketch.mouseDragged = () => {
    const randX = sketch.random(sketch.mouseX - 100, sketch.mouseX + 100)
    const randY = sketch.random(sketch.mouseY - 100, sketch.mouseY + 100)
    addDots(randX, randY)
  }
  

  sketch.draw = () => {
    sketch.stroke(0, 0, 0)
    sketch.strokeWeight(1)

    sketch.noStroke()
    sketch.fill(10, 60)
    sketch.rect(0, 0, VIS_WIDTH, VIS_HEIGHT)

    sketch.fill('#5deab1')
    let angle = 0
    dots.forEach((dot, i) => {
      sketch.ellipse(dot.pos.x, dot.pos.y, 5, 5)
      angle = sketch.PI * 2
      
      dot.velocity.x += getForceX(dot.pos.x, dot.pos.y, sketch)
      dot.velocity.y += getForceY(dot.pos.x, dot.pos.y, sketch)
      dot.velocity.x = Math.min(dot.velocity.x, MAX_SPEED)
      dot.velocity.y = Math.min(dot.velocity.y, MAX_SPEED)
      const vec = dot.velocity.copy()
      dot.pos.add(vec)
      if (dot.pos.x > VIS_WIDTH || dot.pos.x < 0 || dot.pos.y > VIS_HEIGHT || dot.pos.y < 0) {
        if (dot.default) {
          dot.pos.x = sketch.random(VIS_WIDTH - 4000)
          dot.pos.y = sketch.random(VIS_HEIGHT)
          dot.velocity.set(100, 0)
        } else {
          dots.splice(i, 1)
        }
      }
    })

    sketch.fill('#5deab1')
    sketch.circle(EARTH_X, EARTH_Y, 100)
    // drawGrid(sketch)
    drawLines(sketch)
    // northPole.display(sketch)
    // southPole.display(sketch)
  }
}


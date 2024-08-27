import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import Earth from './components/Earth'




const CanvasContainer = styled.div`
width: 100vw;
height: 100vh;
background-color: black
`

function App() {

  return (
    <CanvasContainer>
      <Canvas>
        <directionalLight />
        <Earth />
      </Canvas>
    </CanvasContainer>
  )
}

export default App

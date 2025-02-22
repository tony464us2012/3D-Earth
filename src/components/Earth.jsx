import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

import EarthDayMap from "../assets/8k_earth_daymap.jpg";
import EarthNormalMap from "../assets/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../assets/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../assets/8k_earth_clouds.jpg";
import { TextureLoader } from "three";

 const Earth = () => {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
      );
      const earthRef = useRef();
      const cloudsRef = useRef();

      useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
    
        earthRef.current.rotation.y = elapsedTime / 6;
        cloudsRef.current.rotation.y = elapsedTime / 6;
      });
    
  return (
    <>
        <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={15} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade
        speed={1}
      />
       <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.005, 20, 20]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
         <OrbitControls
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.2}
          panSpeed={0.5}
          rotateSpeed={0.2}
        /> 
      </mesh>
    </>
  )
}

export default Earth

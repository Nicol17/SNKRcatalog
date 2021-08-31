import React, { Suspense, useRef, useEffect } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from './components/section';

import { Canvas, useFrame } from '@react-three/fiber';

import { Html, useGLTF } from '@react-three/drei'; 

// Page States
import state from './components/state';

// intersection Observer

import { useInView } from 'react-intersection-observer';

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />
}

const Lights = () => {
  return (
    <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <directionalLight position={[0, 10, 0]} intensity={1.5} />
    <spotLight position={[0, 1000, 0]} intensity={1} />

    </>
  )
};

const HTMLContent = ({ bgColor, domContent, children, modelPath, positionY, scale }) => {

  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({
    threshold: 0
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor)
  }, [inView])

  return(
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} scale={scale} position={[0, -35, 0]}>
          <Model modelPath={modelPath}/>
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}
          </div>
          </Html>
      </group>
    </Section>
  )
}

export default function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({target: scrollArea.current }), []);
  return (
    <>
      <Header />
      <Canvas
      colorManagement
      camera={{position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent 
          domContent={domContent} 
          modelPath={'/newBalance.gltf'}
          scale={[50, 50, 50]} 
          positionY={270}
          bgColor={'#000000'}> 
          {/* f15946 */}
              <h1 className="title">NB Classic 974</h1>
          </HTMLContent>

          <HTMLContent 
          domContent={domContent} 
          modelPath={'/nb997.gltf'} 
          scale={[0.2, 0.2, 0.2]} 
          positionY={20} 
          bgColor={'#571ec1'}>
              <h1 className="title">NB997</h1>
          </HTMLContent>

          <HTMLContent 
          domContent={domContent} 
          modelPath={'/grandCourt.gltf'} 
          scale={[0.35, 0.35, 0.35]} 
          positionY={-230} 
          bgColor={'#e6b8b8'}>
              <h1 className="title">grandCourt</h1>
          </HTMLContent>

          <HTMLContent 
          domContent={domContent} 
          modelPath={'/airZoom.gltf'} 
          scale={[50, 50, 50]} 
          positionY={-480} 
          bgColor={'#ebaae0'}>
              <h1 className="title">AirZoom</h1>
          </HTMLContent>

          <HTMLContent 
          domContent={domContent} 
          modelPath={'/columbia.gltf'} 
          scale={[100, 100, 100]} 
          positionY={-730} 
          bgColor={'#e0b1a7'}>
              <h1 className="title">Columbia</h1>
          </HTMLContent>

          <HTMLContent 
          domContent={domContent} 
          modelPath={'/hardemVol4.gltf'} 
          scale={[60, 60, 60]} 
          positionY={-980} 
          bgColor={'#b5c452'}>
              <h1 className="title">hardemVol4</h1>
          </HTMLContent>

          <HTMLContent 
          domContent={domContent} 
          modelPath={'/basketShoe.gltf'} 
          scale={[200, 200, 200]} 
          positionY={-1230} 
          bgColor={'#c452b5'}>
              <h1 className="title">basketShoe</h1>
          </HTMLContent>

          <HTMLContent 
          domContent={domContent} 
          modelPath={'/allStar.gltf'} 
          scale={[400, 400, 400]}  
          positionY={-1480} 
          bgColor={'#636567'}>
              <h1 className="title">Chuck Taylor's</h1>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{position: 'sticky', top: 0}} ref={domContent}></div>
        <div style={{height: `${state.sections * 100}vh`}}></div>

      </div>

    </>
  );
}

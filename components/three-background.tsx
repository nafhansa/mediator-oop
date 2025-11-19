"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Float } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm"

function Stars(props: any) {
  const ref = useRef<any>()
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function FloatingShapes() {
  const meshRef = useRef<any>()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 2
      meshRef.current.rotation.y = Math.sin(t / 4) / 2
      meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    }
  })

  return (
    <group ref={meshRef}>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[1, 1, 0]} scale={0.2}>
          <dodecahedronGeometry />
          <meshStandardMaterial color="#00ffff" wireframe emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-1, -1, 0]} scale={0.3}>
          <octahedronGeometry />
          <meshStandardMaterial color="#ff00ff" wireframe emissive="#ff00ff" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[0, 0.5, 1]} scale={0.15}>
          <icosahedronGeometry />
          <meshStandardMaterial color="#ffff00" wireframe emissive="#ffff00" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <FloatingShapes />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}

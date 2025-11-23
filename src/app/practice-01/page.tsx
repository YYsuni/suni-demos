'use client'

import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { ReactNode, useEffect } from 'react'
import { RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, Wrapping } from 'three'
import woodTexture from './Door_Wood_001_basecolor.jpg'

function TexturedShape({
	geometry,
	position,
	label,
	repeatX,
	repeatY,
	wrapS,
	wrapT
}: {
	geometry: ReactNode
	position: [number, number, number]
	label: string
	repeatX: number
	repeatY: number
	wrapS: Wrapping
	wrapT: Wrapping
}) {
	const texture = useTexture(woodTexture.src)

	useEffect(() => {
		texture.repeat.set(repeatX, repeatY)
		texture.wrapS = wrapS
		texture.wrapT = wrapT
		texture.needsUpdate = true
	}, [texture, repeatX, repeatY, wrapS, wrapT])

	return (
		<group position={position}>
			<mesh>
				{geometry}
				<meshStandardMaterial map={texture} />
			</mesh>
		</group>
	)
}

export default function Page() {
	const { showGrid, gridSize, showAxes, axesSize } = useControls('Helpers', {
		showGrid: true,
		gridSize: { value: 15, min: 5, max: 30, step: 1 },
		showAxes: true,
		axesSize: { value: 3, min: 1, max: 10, step: 0.5 }
	})

	const { ambientIntensity } = useControls('Lighting', {
		ambientIntensity: { value: 5, min: 0, max: 10, step: 0.1 }
	})

	const { repeatX, repeatY, wrapS, wrapT } = useControls('Texture', {
		repeatX: { value: 2, min: 0.1, max: 10, step: 0.1 },
		repeatY: { value: 3, min: 0.1, max: 10, step: 0.1 },
		wrapS: {
			value: RepeatWrapping,
			options: {
				RepeatWrapping: RepeatWrapping,
				ClampToEdgeWrapping: ClampToEdgeWrapping,
				MirroredRepeatWrapping: MirroredRepeatWrapping
			}
		},
		wrapT: {
			value: RepeatWrapping,
			options: {
				RepeatWrapping: RepeatWrapping,
				ClampToEdgeWrapping: ClampToEdgeWrapping,
				MirroredRepeatWrapping: MirroredRepeatWrapping
			}
		}
	})

	return (
		<div className='fixed inset-0 rounded-lg border bg-white'>
			<Canvas
				camera={{
					position: [-8, 5, 8],
					fov: 50,
					near: 0.1,
					far: 100
				}}>
				<ambientLight intensity={ambientIntensity} />
				<directionalLight position={[5, 5, 5]} intensity={1} />

				{/* Box - Cube */}
				<TexturedShape
					geometry={<boxGeometry args={[1, 1, 1]} />}
					position={[-3, 0, 0]}
					label='Box'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Sphere */}
				<TexturedShape
					geometry={<sphereGeometry args={[0.7, 32, 32]} />}
					position={[-1, 0, 0]}
					label='Sphere'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Cylinder */}
				<TexturedShape
					geometry={<cylinderGeometry args={[0.6, 0.6, 1.2, 32]} />}
					position={[1, 0, 0]}
					label='Cylinder'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Cone */}
				<TexturedShape
					geometry={<coneGeometry args={[0.7, 1.2, 32]} />}
					position={[3, 0, 0]}
					label='Cone'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Torus */}
				<TexturedShape
					geometry={<torusGeometry args={[0.6, 0.3, 16, 32]} />}
					position={[-3, 2, 0]}
					label='Torus'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Plane */}
				<TexturedShape
					geometry={<planeGeometry args={[1.2, 1.2]} />}
					position={[-1, 2, 0]}
					label='Plane'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Octahedron */}
				<TexturedShape
					geometry={<octahedronGeometry args={[0.8]} />}
					position={[1, 2, 0]}
					label='Octahedron'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Tetrahedron */}
				<TexturedShape
					geometry={<tetrahedronGeometry args={[0.8]} />}
					position={[3, 2, 0]}
					label='Tetrahedron'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Icosahedron */}
				<TexturedShape
					geometry={<icosahedronGeometry args={[0.7]} />}
					position={[-3, -2, 0]}
					label='Icosahedron'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Dodecahedron */}
				<TexturedShape
					geometry={<dodecahedronGeometry args={[0.7]} />}
					position={[-1, -2, 0]}
					label='Dodecahedron'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* TorusKnot */}
				<TexturedShape
					geometry={<torusKnotGeometry args={[0.5, 0.2, 64, 16]} />}
					position={[1, -2, 0]}
					label='TorusKnot'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{/* Ring */}
				<TexturedShape
					geometry={<ringGeometry args={[0.4, 0.7, 32]} />}
					position={[3, -2, 0]}
					label='Ring'
					repeatX={repeatX}
					repeatY={repeatY}
					wrapS={wrapS}
					wrapT={wrapT}
				/>

				{showGrid && <gridHelper args={[gridSize, gridSize]} />}
				{showAxes && <axesHelper args={[axesSize]} />}

				<OrbitControls />
			</Canvas>
		</div>
	)
}

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
	...textureProps
}: {
	geometry: ReactNode
	position: [number, number, number]
	label: string
	repeatX: number
	repeatY: number
	wrapS: Wrapping
	wrapT: Wrapping
	offsetX: number
	offsetY: number
	rotation: number
	centerX: number
	centerY: number
}) {
	const texture = useTexture(woodTexture.src)

	useEffect(() => {
		const { repeatX, repeatY, wrapS, wrapT, offsetX, offsetY, rotation, centerX, centerY } = textureProps
		texture.repeat.set(repeatX, repeatY)
		texture.wrapS = wrapS
		texture.wrapT = wrapT
		texture.offset.set(offsetX, offsetY)
		texture.rotation = rotation
		texture.center.set(centerX, centerY)
		texture.needsUpdate = true
	}, [texture, textureProps.repeatX, textureProps.repeatY, textureProps.wrapS, textureProps.wrapT, textureProps.offsetX, textureProps.offsetY, textureProps.rotation, textureProps.centerX, textureProps.centerY])

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

	const textureProps = useControls('Texture', {
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
		},
		offsetX: { value: 0, min: -1, max: 1, step: 0.01 },
		offsetY: { value: 0, min: -1, max: 1, step: 0.01 },
		rotation: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
		centerX: { value: 0.5, min: 0, max: 1, step: 0.01 },
		centerY: { value: 0.5, min: 0, max: 1, step: 0.01 }
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
					{...textureProps}
				/>

				{/* Sphere */}
				<TexturedShape
					geometry={<sphereGeometry args={[0.7, 32, 32]} />}
					position={[-1, 0, 0]}
					label='Sphere'
					{...textureProps}
				/>

				{/* Cylinder */}
				<TexturedShape
					geometry={<cylinderGeometry args={[0.6, 0.6, 1.2, 32]} />}
					position={[1, 0, 0]}
					label='Cylinder'
					{...textureProps}
				/>

				{/* Cone */}
				<TexturedShape
					geometry={<coneGeometry args={[0.7, 1.2, 32]} />}
					position={[3, 0, 0]}
					label='Cone'
					{...textureProps}
				/>

				{/* Torus */}
				<TexturedShape
					geometry={<torusGeometry args={[0.6, 0.3, 16, 32]} />}
					position={[-3, 2, 0]}
					label='Torus'
					{...textureProps}
				/>

				{/* Plane */}
				<TexturedShape
					geometry={<planeGeometry args={[1.2, 1.2]} />}
					position={[-1, 2, 0]}
					label='Plane'
					{...textureProps}
				/>

				{/* Octahedron */}
				<TexturedShape
					geometry={<octahedronGeometry args={[0.8]} />}
					position={[1, 2, 0]}
					label='Octahedron'
					{...textureProps}
				/>

				{/* Tetrahedron */}
				<TexturedShape
					geometry={<tetrahedronGeometry args={[0.8]} />}
					position={[3, 2, 0]}
					label='Tetrahedron'
					{...textureProps}
				/>

				{/* Icosahedron */}
				<TexturedShape
					geometry={<icosahedronGeometry args={[0.7]} />}
					position={[-3, -2, 0]}
					label='Icosahedron'
					{...textureProps}
				/>

				{/* Dodecahedron */}
				<TexturedShape
					geometry={<dodecahedronGeometry args={[0.7]} />}
					position={[-1, -2, 0]}
					label='Dodecahedron'
					{...textureProps}
				/>

				{/* TorusKnot */}
				<TexturedShape
					geometry={<torusKnotGeometry args={[0.5, 0.2, 64, 16]} />}
					position={[1, -2, 0]}
					label='TorusKnot'
					{...textureProps}
				/>

				{/* Ring */}
				<TexturedShape
					geometry={<ringGeometry args={[0.4, 0.7, 32]} />}
					position={[3, -2, 0]}
					label='Ring'
					{...textureProps}
				/>

				{showGrid && <gridHelper args={[gridSize, gridSize]} />}
				{showAxes && <axesHelper args={[axesSize]} />}

				<OrbitControls />
			</Canvas>
		</div>
	)
}

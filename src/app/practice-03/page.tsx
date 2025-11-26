'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'

// Next.js image import
import symbol01 from './symbol_01.png'

const POINT_COUNT = 50000

function rand(a: number, b: number) {
	return Math.random() * (b - a) + a
}

function CubePoints() {
	const positions = useMemo(() => {
		const arr = new Float32Array(POINT_COUNT * 3)

		for (let i = 0; i < POINT_COUNT; i++) {
			const x = rand(-5, 5)
			const y = rand(-5, 5)
			const z = rand(-5, 5)

			arr[i * 3] = x
			arr[i * 3 + 1] = y
			arr[i * 3 + 2] = z
		}

		return arr
	}, [])

	const colors = useMemo(() => {
		const arr = new Float32Array(POINT_COUNT * 3)

		for (let i = 0; i < POINT_COUNT; i++) {
			// random color per point, slightly biased towards bright colors
			const r = 0.4 + Math.random() * 0.6
			const g = 0.4 + Math.random() * 0.6
			const b = 0.4 + Math.random() * 0.6

			arr[i * 3] = r
			arr[i * 3 + 1] = g
			arr[i * 3 + 2] = b
		}

		return arr
	}, [])

	const texture = useLoader(THREE.TextureLoader, symbol01.src)

	return (
		<points>
			<bufferGeometry>
				<bufferAttribute attach='attributes-position' args={[positions, 3]} />
				<bufferAttribute attach='attributes-color' args={[colors, 3]} />
			</bufferGeometry>
			<pointsMaterial size={0.2} alphaMap={texture} vertexColors sizeAttenuation transparent alphaTest={0.001} blending={THREE.AdditiveBlending} />
		</points>
	)
}

export default function Page() {
	return (
		<div className='fixed inset-0'>
			<Canvas camera={{ position: [0, 0, 4], fov: 50, near: 0.1, far: 100 }}>
				<ambientLight intensity={0.3} />
				<pointLight position={[5, 5, 5]} intensity={1.2} />

				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[2, 2, 2]} />
					<meshStandardMaterial color='#4FC3F7' />
				</mesh>

				<CubePoints />

				<axesHelper args={[2]} />
				<OrbitControls />
			</Canvas>
		</div>
	)
}

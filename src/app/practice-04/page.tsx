'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

function GalaxyPoints() {
	const { spiralCount, pointsPerSpiral, spiralRadius, spiralTurns, randomSpread, randomnessPower, pointSize } = useControls('Galaxy', {
		spiralCount: { value: 3, min: 2, max: 20, step: 1 },
		pointsPerSpiral: { value: 2000, min: 100, max: 5000, step: 100 },
		spiralRadius: { value: 8, min: 2, max: 20, step: 0.5 },
		spiralTurns: { value: 2, min: 1, max: 10, step: 0.1 },
		randomSpread: { value: 0.2, min: 0, max: 2, step: 0.1 },
		randomnessPower: { value: 2, min: 0.1, max: 5, step: 0.1 },
		pointSize: { value: 0.05, min: 0.01, max: 0.2, step: 0.01 }
	})

	const { innerColor, outerColor, centerColor } = useControls('Colors', {
		innerColor: '#4FC3F7',
		outerColor: '#FF6B9D',
		centerColor: '#FFD700'
	})

	const { positions, colors } = useMemo(() => {
		const totalPoints = spiralCount * pointsPerSpiral + 1 // +1 for center point
		const positions = new Float32Array(totalPoints * 3)
		const colors = new Float32Array(totalPoints * 3)

		// Parse colors
		const innerColorObj = new THREE.Color(innerColor)
		const outerColorObj = new THREE.Color(outerColor)
		const centerColorObj = new THREE.Color(centerColor)

		// Center point
		positions[0] = 0
		positions[1] = 0
		positions[2] = 0
		colors[0] = centerColorObj.r
		colors[1] = centerColorObj.g
		colors[2] = centerColorObj.b

		let pointIndex = 1

		// Generate points for each spiral
		for (let spiralIndex = 0; spiralIndex < spiralCount; spiralIndex++) {
			const spiralAngleOffset = (Math.PI * 2 * spiralIndex) / spiralCount

			for (let i = 0; i < pointsPerSpiral; i++) {
				const progress = i / pointsPerSpiral
				const angle = spiralAngleOffset + progress * Math.PI * 2 * spiralTurns
				const radius = progress * spiralRadius

				// Base position on spiral
				const baseX = Math.cos(angle) * radius
				const baseY = Math.sin(angle) * radius
				const baseZ = 0

				// Random spread using power distribution
				const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomSpread * radius
				const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomSpread * radius
				const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomSpread * radius

				positions[pointIndex * 3] = baseX + randomX
				positions[pointIndex * 3 + 1] = baseY + randomY
				positions[pointIndex * 3 + 2] = baseZ + randomZ

				// Color interpolation from inner to outer
				const colorMix = progress
				colors[pointIndex * 3] = innerColorObj.r * (1 - colorMix) + outerColorObj.r * colorMix
				colors[pointIndex * 3 + 1] = innerColorObj.g * (1 - colorMix) + outerColorObj.g * colorMix
				colors[pointIndex * 3 + 2] = innerColorObj.b * (1 - colorMix) + outerColorObj.b * colorMix

				pointIndex++
			}
		}

		return { positions, colors }
	}, [spiralCount, pointsPerSpiral, spiralRadius, spiralTurns, randomSpread, randomnessPower, innerColor, outerColor, centerColor])

	const groupRef = useRef<THREE.Group>(null)

	return (
		<group ref={groupRef}>
			<points>
				<bufferGeometry>
					<bufferAttribute attach='attributes-position' args={[positions, 3]} />
					<bufferAttribute attach='attributes-color' args={[colors, 3]} />
				</bufferGeometry>
				<pointsMaterial size={pointSize} vertexColors sizeAttenuation transparent blending={THREE.AdditiveBlending} />
			</points>
		</group>
	)
}

export default function Page() {
	return (
		<div className='fixed inset-0 bg-[#333]'>
			<Canvas camera={{ position: [0, 0, 15], fov: 50, near: 0.1, far: 100 }}>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} intensity={1} />

				<GalaxyPoints />

				<OrbitControls enableDamping dampingFactor={0.05} />
			</Canvas>
		</div>
	)
}

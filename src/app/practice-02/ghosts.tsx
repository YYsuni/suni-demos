'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

type GhostConfig = {
	id: string
	color: string
	radius: number
	baseHeight: number
	orbitSpeed: number
	verticalAmplitude: number
	verticalSpeed: number
	phase: number
	intensity: number
	distance: number
	decay: number
}

export function Ghosts() {
	const configs = useMemo<GhostConfig[]>(
		() => [
			{
				id: 'ghost-a',
				color: '#ff0000',
				radius: 4,
				baseHeight: 0.7,
				orbitSpeed: 0.25,
				verticalAmplitude: 0.8,
				verticalSpeed: 1.5,
				phase: 0,
				intensity: 1.4,
				distance: 4,
				decay: 1.5
			},
			{
				id: 'ghost-b',
				color: '#ff0088',
				radius: 5.5,
				baseHeight: 1,
				orbitSpeed: -0.35,
				verticalAmplitude: 0.6,
				verticalSpeed: 1.5,
				phase: Math.PI / 3,
				intensity: 1.2,
				distance: 4.5,
				decay: 1.2
			},
			{
				id: 'ghost-c',
				color: '#8800ff',
				radius: 3.2,
				baseHeight: 1.3,
				orbitSpeed: 0.4,
				verticalAmplitude: 1,
				verticalSpeed: 2.3,
				phase: Math.PI / 1.5,
				intensity: 1.6,
				distance: 3.5,
				decay: 1.4
			}
		],
		[]
	)

	const groupRefs = useRef<Group[]>([])

	useFrame(({ clock }) => {
		const elapsed = clock.getElapsedTime()
		configs.forEach((config, index) => {
			const angle = elapsed * config.orbitSpeed + config.phase
			const x = Math.cos(angle) * config.radius
			const z = Math.sin(angle) * config.radius
			const y = config.baseHeight + Math.sin(elapsed * config.verticalSpeed + config.phase) * config.verticalAmplitude

			const ghostGroup = groupRefs.current[index]
			if (!ghostGroup) return

			ghostGroup.position.set(x, y, z)
		})
	})

	return (
		<>
			{configs.map((config, index) => (
				<group key={config.id} ref={node => (groupRefs.current[index] = node!)}>
					<pointLight color={config.color} intensity={config.intensity} distance={config.distance} decay={config.decay} castShadow />
					<mesh>
						{/* <sphereGeometry args={[0.12, 16, 16]} /> */}
						<meshBasicMaterial color={config.color} toneMapped={false} />
					</mesh>
				</group>
			))}
		</>
	)
}

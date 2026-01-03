'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'

type ColliderType = 'ball' | 'box'

interface Collider {
	id: string
	type: ColliderType
	position: [number, number, number]
	rotation: [number, number, number]
	size: number
	color: string
}

function Ball({ position, rotation, size, color }: Omit<Collider, 'id' | 'type'>) {
	return (
		<RigidBody position={position} rotation={rotation} restitution={0.5} friction={0.3} colliders='ball'>
			<mesh castShadow>
				<sphereGeometry args={[size, 32, 32]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</RigidBody>
	)
}

function Box({ position, rotation, size, color }: Omit<Collider, 'id' | 'type'>) {
	return (
		<RigidBody position={position} rotation={rotation} restitution={0.5} friction={0.3} colliders='cuboid'>
			<mesh castShadow>
				<boxGeometry args={[size, size, size]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</RigidBody>
	)
}

function Ground({ color }: { color: string }) {
	return (
		<RigidBody type='fixed' friction={0.5} restitution={0.5}>
			<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</RigidBody>
	)
}

function ControlButtons({ onAddBall, onAddBox, onReset }: { onAddBall: () => void; onAddBox: () => void; onReset: () => void }) {
	return (
		<div className='absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3'>
			<Button onClick={onAddBall}>Add Ball</Button>
			<Button onClick={onAddBox}>Add Box</Button>
			<Button onClick={onReset} variant='destructive'>
				Reset
			</Button>
		</div>
	)
}

export default function Page() {
	const { groundColor, gravityY } = useControls({
		groundColor: { value: '#ffffff', label: 'Ground Color' },
		gravityY: { value: -9.81, min: -20, max: 20, step: 0.1, label: 'Gravity Y' }
	})

	const [colliders, setColliders] = useState<Collider[]>([])
	const idCounter = useRef(0)

	const generateRandomPosition = (): [number, number, number] => {
		return [
			(Math.random() - 0.5) * 8, // x: -4 to 4
			Math.random() * 3 + 3, // y: 3 to 6
			(Math.random() - 0.5) * 8 // z: -4 to 4
		]
	}

	const generateRandomRotation = (): [number, number, number] => {
		return [
			Math.random() * Math.PI * 2, // x
			Math.random() * Math.PI * 2, // y
			Math.random() * Math.PI * 2 // z
		]
	}

	const generateRandomSize = (): number => {
		return Math.random() * 0.5 + 0.3 // 0.3 to 0.8
	}

	const generateRandomColor = (): string => {
		const colors = ['#4FC3F7', '#81C784', '#FFB74D', '#F06292', '#BA68C8', '#64B5F6', '#FF8A65', '#A1887F']
		return colors[Math.floor(Math.random() * colors.length)]
	}

	const handleAddBall = () => {
		const newCollider: Collider = {
			id: `ball-${idCounter.current++}`,
			type: 'ball',
			position: generateRandomPosition(),
			rotation: generateRandomRotation(),
			size: generateRandomSize(),
			color: generateRandomColor()
		}
		setColliders(prev => [...prev, newCollider])
	}

	const handleAddBox = () => {
		const newCollider: Collider = {
			id: `box-${idCounter.current++}`,
			type: 'box',
			position: generateRandomPosition(),
			rotation: generateRandomRotation(),
			size: generateRandomSize(),
			color: generateRandomColor()
		}
		setColliders(prev => [...prev, newCollider])
	}

	const handleReset = () => {
		setColliders([])
		idCounter.current = 0
	}

	return (
		<div className='fixed inset-0'>
			<ControlButtons onAddBall={handleAddBall} onAddBox={handleAddBox} onReset={handleReset} />
			<Canvas camera={{ position: [5, 5, 5], fov: 50, near: 0.1, far: 100 }} shadows>
				<ambientLight intensity={0.5} />
				<directionalLight
					position={[10, 10, 5]}
					intensity={1}
					castShadow
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
					shadow-camera-far={50}
					shadow-camera-left={-10}
					shadow-camera-right={10}
					shadow-camera-top={10}
					shadow-camera-bottom={-10}
				/>

				<Physics gravity={[0, gravityY, 0]}>
					{colliders.map(collider => (collider.type === 'ball' ? <Ball key={collider.id} {...collider} /> : <Box key={collider.id} {...collider} />))}
					<Ground color={groundColor} />
				</Physics>

				<gridHelper args={[20, 20]} />
				<axesHelper args={[5]} />
				<OrbitControls />
			</Canvas>
		</div>
	)
}

'use client'

import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'

function RotatingCircles() {
	const groupRef = useRef<THREE.Group>(null)
	const circleNumber = 40
	const circleRadius = 0.4
	const lineNumber = 64

	useFrame((state, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.z += delta * 0.1
		}
	})

	const circles = []
	for (let i = 1; i <= circleNumber; i++) {
		const radius = i * circleRadius
		const segments = 240
		const points = []

		for (let j = 0; j <= segments; j++) {
			const angle = (j / segments) * Math.PI * 2
			points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0))
		}

		circles.push(
			<line key={i}>
				<bufferGeometry>
					<bufferAttribute attach='attributes-position' args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]} />
				</bufferGeometry>
				<lineBasicMaterial color='#666' />
			</line>
		)
	}

	const lines = []
	for (let i = 0; i < lineNumber; i++) {
		const angle = (i / lineNumber) * Math.PI * 2
		const maxRadius = circleNumber * circleRadius
		const startPoint = new THREE.Vector3(0, 0, 0)
		const endPoint = new THREE.Vector3(Math.cos(angle) * maxRadius, Math.sin(angle) * maxRadius, 0)

		lines.push(
			<line key={`line-${i}`}>
				<bufferGeometry>
					<bufferAttribute
						attach='attributes-position'
						args={[new Float32Array([startPoint.x, startPoint.y, startPoint.z, endPoint.x, endPoint.y, endPoint.z]), 3]}
					/>
				</bufferGeometry>
				<lineBasicMaterial color='#666' />
			</line>
		)
	}

	return (
		<group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
			{circles}
			{lines}
		</group>
	)
}

export default function RotatingTorusComponent() {
	return (
		<div className='mx-auto h-[500px] w-[800px] rounded-lg border bg-white'>
			<Canvas
				camera={{
					position: [0.404, 2.788, 10.879],
					fov: 30,
					near: 0.1,
					far: 30
				}}
				onCreated={({ camera }) => {
					camera.lookAt(4.698, -1.625, 3.936)
				}}>
				<fog attach='fog' args={['#fafafa', 5, 15]} />

				<RotatingCircles />
				{/* <OrbitControls
					target={[4.698, -1.625, 3.936]}
					enableDamping
					dampingFactor={0.05}

					// onChange={e => {
					// 	const camera = e.target.object
					// 	const target = e.target.target
					// 	console.log('Camera position:', {
					// 		x: camera.position.x.toFixed(3),
					// 		y: camera.position.y.toFixed(3),
					// 		z: camera.position.z.toFixed(3)
					// 	})
					// 	console.log('Camera look at:', {
					// 		x: target.x.toFixed(3),
					// 		y: target.y.toFixed(3),
					// 		z: target.z.toFixed(3)
					// 	})
					// }}
				/> */}
			</Canvas>
		</div>
	)
}

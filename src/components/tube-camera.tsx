'use client'

import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { OrbitControls } from '@react-three/drei'

// 圆柱体结构配置参数
const CYLINDER_CONFIG = {
	radius: 2, // 圆柱体半径
	height: 50, // 圆柱体高度
	circleCount: 60, // 圆环数量
	lineSegments: 32, // 垂直线段数量
	circleSegments: 240, // 每个圆环的线段数量
	circleColor: '#666', // 圆环颜色
	lineColor: '#666' // 垂直线颜色
}

function CylinderStructure() {
	const groupRef = useRef<THREE.Group>(null)
	const moveDistance = 30
	const resetPosition = -40

	useFrame(state => {
		if (groupRef.current) {
			// 整个圆柱体结构移动
			groupRef.current.position.z += 0.01

			// 重置位置
			if (groupRef.current.position.z > moveDistance + resetPosition) {
				groupRef.current.position.z = resetPosition
			}
		}
	})

	const cylinderStructure = useMemo(() => {
		const { radius, height, circleCount, lineSegments, circleSegments, circleColor, lineColor } = CYLINDER_CONFIG

		const circles = []
		for (let i = 0; i < circleCount; i++) {
			const z = (i / (circleCount - 1)) * height
			const points = []

			for (let j = 0; j <= circleSegments; j++) {
				const angle = (j / circleSegments) * Math.PI * 2
				points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z))
			}

			circles.push(
				<line key={i}>
					<bufferGeometry>
						<bufferAttribute attach='attributes-position' args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]} />
					</bufferGeometry>
					<lineBasicMaterial color={circleColor} />
				</line>
			)
		}

		const verticalLines = []
		for (let i = 0; i < lineSegments; i++) {
			const angle = (i / lineSegments) * Math.PI * 2
			const x = Math.cos(angle) * radius
			const y = Math.sin(angle) * radius

			verticalLines.push(
				<line key={`vertical-${i}`}>
					<bufferGeometry>
						<bufferAttribute attach='attributes-position' args={[new Float32Array([x, y, 0, x, y, height]), 3]} />
					</bufferGeometry>
					<lineBasicMaterial color={lineColor} />
				</line>
			)
		}

		return (
			<group>
				{circles}
				{verticalLines}
			</group>
		)
	}, [])

	return <group ref={groupRef}>{cylinderStructure}</group>
}

export default function TubeCamera() {
	return (
		<div className='mx-auto h-[500px] w-[800px] rounded-lg border bg-white'>
			<Canvas>
				<fog attach='fog' args={['#fff', 5, 12]} />

				<CylinderStructure />

				{/* <OrbitControls /> */}
			</Canvas>
		</div>
	)
}

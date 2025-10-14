'use client'

import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'

function RetroGrid() {
	const gridRef = useRef<THREE.GridHelper>(null)
	const moveDistance = 50
	const resetPosition = 0

	useFrame(state => {
		if (gridRef.current) {
			gridRef.current.position.z += 0.02

			if (gridRef.current.position.z > moveDistance) {
				gridRef.current.position.z = resetPosition
			}
		}
	})

	return <gridHelper ref={gridRef} args={[200, 200, '#666', '#666']} position={[0, 0, resetPosition]} scale={[2, 1, 1.5]} />
}

export default function ThreeGrid() {
	return (
		<div className='mx-auto h-[500px] w-[800px] overflow-hidden rounded-lg border bg-white max-sm:h-[400px] max-sm:w-full'>
			<Canvas
				camera={{
					position: [0, 6, 9], // 相机位置 (x, y, z)，默认 [0, 0, 5]
					fov: 60, // 视野角度，数值越大视野越宽，默认 75
					near: 0.1, // 近裁剪面，距离相机多近开始渲染，默认 0.1
					far: 30 // 远裁剪面，距离相机多远停止渲染，默认 1000
				}}>
				<fog attach='fog' args={['#fafafa', 10, 30]} />
				<color attach='background' args={['#fff']} />
				<RetroGrid />
				{/* <OrbitControls enableDamping dampingFactor={0.05} /> */}
			</Canvas>
		</div>
	)
}

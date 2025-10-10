'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function RetroGrid() {
	return <gridHelper args={[100, 100, '#666', '#666']} position={[0, 0, 0]} />
}

export default function Page() {
	return (
		<div className='p-8'>
			<div className='mx-auto h-[500px] w-[800px] rounded-lg border bg-white'>
				<Canvas
					camera={{
						position: [0, 15, 15], // 相机位置 (x, y, z)，默认 [0, 0, 5]
						fov: 60, // 视野角度，数值越大视野越宽，默认 75
						near: 0.1, // 近裁剪面，距离相机多近开始渲染，默认 0.1
						far: 1000 // 远裁剪面，距离相机多远停止渲染，默认 1000
					}}>
					<RetroGrid />
					{/* <OrbitControls enableDamping dampingFactor={0.05} /> */}
				</Canvas>
			</div>
		</div>
	)
}

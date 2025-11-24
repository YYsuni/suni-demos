'use client'

import { OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'

import { Ground } from './ground'
import { House } from './house'
import { Bushes } from './bushes'
import { Gravestones } from './gravestones'
import { Ghosts } from './ghosts'
import { DirectionalLightRig } from './directional-light-rig'

export default function Page() {
	const orbitControlsRef = useRef<any>(null)
	const { showGrid, gridSize, showAxes, axesSize } = useControls(
		'Helpers',
		{
			showGrid: false,
			gridSize: { value: 20, min: 5, max: 30, step: 1 },
			showAxes: false,
			axesSize: { value: 5, min: 1, max: 10, step: 0.5 }
		},
		{ collapsed: true }
	)

	const { ambientIntensity, directionalIntensity, showDirectionalHelper } = useControls(
		'Lighting',
		{
			ambientIntensity: { value: 0.275, min: 0, max: 2, step: 0.1 },
			directionalIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
			showDirectionalHelper: false
		},
		{ collapsed: true }
	)

	return (
		<div className='fixed inset-0 rounded-lg border bg-black'>
			<Canvas camera={{ position: [3, 6, 8], fov: 50, near: 0.1, far: 100 }} shadows>
				<ambientLight intensity={ambientIntensity} color='#86cdff' />
				{/* FogExp2('#04343f', 0.1) 表示指数雾，颜色为墨绿，密度 0.1 */}
				<fogExp2 attach='fog' args={['#04343f', 0.1]} />
				<DirectionalLightRig intensity={directionalIntensity} color='#86cdff' showHelper={showDirectionalHelper} orbitControlsRef={orbitControlsRef} />
				{/* Sky 参数：turbidity 控制浑浊度，rayleigh 控制瑞利散射，mieCoefficient/MieDirectionalG 控制米氏散射，sunPosition 调整太阳方向 */}
				<Sky turbidity={10} rayleigh={3} mieCoefficient={0.1} mieDirectionalG={0.95} sunPosition={[0.3, -0.038, -0.95]} />

				<Ground />
				<House orbitControlsRef={orbitControlsRef} />
				<Bushes />
				<Gravestones />
				<Ghosts />

				{showGrid && <gridHelper args={[gridSize, gridSize]} />}
				{showAxes && <axesHelper args={[axesSize]} />}

				<OrbitControls ref={orbitControlsRef} />
			</Canvas>
		</div>
	)
}

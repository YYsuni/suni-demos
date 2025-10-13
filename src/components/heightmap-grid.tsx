'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function HeightmapPlane() {
	const { nodes } = useGLTF('/plane.glb') as unknown as { nodes: Record<string, THREE.Mesh> }

	return (
		<mesh geometry={nodes['plane'].geometry} scale={20}>
			<meshBasicMaterial color={'#888'} wireframe />
		</mesh>
	)
}

export default function HeightmapGrid() {
	return (
		<div className='mx-auto h-[500px] w-[800px] rounded-lg border bg-white'>
			<Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
				<HeightmapPlane />
				<OrbitControls enableDamping dampingFactor={0.05} />
			</Canvas>
		</div>
	)
}

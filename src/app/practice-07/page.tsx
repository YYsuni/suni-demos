'use client'

import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect } from 'react'
import * as THREE from 'three'

function Model({ url, position, texture }: { url: string; position: [number, number, number]; texture: THREE.Texture }) {
	const { scene } = useGLTF(url)

	useEffect(() => {
		scene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				if (Array.isArray(child.material)) {
					child.material = child.material.map(() => {
						const material = new THREE.MeshStandardMaterial({
							map: texture,
							vertexColors: false
						})
						return material
					})
				} else {
					child.material = new THREE.MeshStandardMaterial({
						map: texture,
						vertexColors: false
					})
				}
			}
		})
	}, [scene, texture])

	return <primitive object={scene} position={position} />
}

function Scene() {
	const texture = useTexture('/practice-07/colormap.png', texture => {
		texture.magFilter = THREE.NearestFilter
		texture.minFilter = THREE.NearestFilter
		texture.flipY = false
	})

	const {
		pumpkin1Position,
		pumpkin2Position,
		roadPosition,
		trunkPosition,
		trunkLongPosition,
		pinePosition,
		pineCrookedPosition,
		pineFallPosition,
		pineFallCrookedPosition
	} = useControls({
		pumpkin1Position: { value: [-1, 0, 0], step: 0.1 },
		pumpkin2Position: { value: [1, 0, 0], step: 0.1 },
		roadPosition: { value: [0, 0, -1], step: 0.1 },
		trunkPosition: { value: [-2, 0, 1], step: 0.1 },
		trunkLongPosition: { value: [2, 0, 1], step: 0.1 },
		pinePosition: { value: [-3, 0, -2], step: 0.1 },
		pineCrookedPosition: { value: [3, 0, -2], step: 0.1 },
		pineFallPosition: { value: [-4, 0, 2], step: 0.1 },
		pineFallCrookedPosition: { value: [4, 0, 2], step: 0.1 }
	})

	return (
		<>
			<ambientLight intensity={0.5} />
			{/* <directionalLight position={[5, 5, 5]} intensity={1} castShadow /> */}
			<Model url='/practice-07/pumpkin-tall-carved.glb' position={pumpkin1Position as [number, number, number]} texture={texture} />
			<Model url='/practice-07/pumpkin-tall.glb' position={pumpkin2Position as [number, number, number]} texture={texture} />
			<Model url='/practice-07/road.glb' position={roadPosition as [number, number, number]} texture={texture} />
			<Model url='/practice-07/trunk.glb' position={trunkPosition as [number, number, number]} texture={texture} />
			<Model url='/practice-07/trunk-long.glb' position={trunkLongPosition as [number, number, number]} texture={texture} />
			<Model url='/practice-07/pine.glb' position={pinePosition as [number, number, number]} texture={texture} />
			<Model url='/practice-07/pine-crooked.glb' position={pineCrookedPosition as [number, number, number]} texture={texture} />
			<Model url='/practice-07/pine-fall.glb' position={pineFallPosition as [number, number, number]} texture={texture} />
			<Model url='/practice-07/pine-fall-crooked.glb' position={pineFallCrookedPosition as [number, number, number]} texture={texture} />
			<gridHelper args={[20, 20]} />
			<axesHelper args={[5]} />
		</>
	)
}

export default function Page() {
	return (
		<div className='fixed inset-0'>
			<Canvas camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 100 }} shadows>
				<Scene />
				<OrbitControls />
			</Canvas>
		</div>
	)
}

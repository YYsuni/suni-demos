'use client'

import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useMemo } from 'react'
import { RepeatWrapping, SRGBColorSpace, Texture, Vector2 } from 'three'

import stoneArmTextureUrl from './gravestone/brushed_concrete_arm_1k.jpg'
import stoneDiffTextureUrl from './gravestone/brushed_concrete_diff_1k.jpg'
import stoneNorTextureUrl from './gravestone/brushed_concrete_nor_gl_1k.jpg'

const random = (min: number, max: number) => Math.random() * (max - min) + min
const minDistance = 3.5
const maxDistance = 8
const count = 24

export function Gravestones() {
	const stoneTextureUrls = useMemo(() => [stoneDiffTextureUrl.src, stoneArmTextureUrl.src, stoneNorTextureUrl.src], [])
	const [stoneColorMap, stoneArmMap, stoneNormalMap] = useTexture(stoneTextureUrls) as Texture[]
	const { stoneRepeat, stoneNormalStrength } = useControls(
		'Gravestone Texture',
		{
			stoneRepeat: { value: 1.5, min: 0.5, max: 5, step: 0.1 },
			stoneNormalStrength: { value: 1, min: 0, max: 2, step: 0.05 }
		},
		{ collapsed: true }
	)
	const stoneNormalScale = useMemo(() => new Vector2(stoneNormalStrength, stoneNormalStrength), [stoneNormalStrength])

	useEffect(() => {
		const textures = [stoneColorMap, stoneArmMap, stoneNormalMap]
		textures.forEach(texture => {
			if (!texture) return
			texture.wrapS = RepeatWrapping
			texture.wrapT = RepeatWrapping
			texture.repeat.set(stoneRepeat, stoneRepeat)
			texture.needsUpdate = true
		})
	}, [stoneArmMap, stoneColorMap, stoneNormalMap, stoneRepeat])

	useEffect(() => {
		if (stoneColorMap) {
			stoneColorMap.colorSpace = SRGBColorSpace
		}
	}, [stoneColorMap])

	const gravestones = useMemo(
		() =>
			Array.from({ length: count }, (_, index) => {
				const angle = (index / count) * Math.PI * 2
				const angleOffset = random(-Math.PI / count, Math.PI / count)
				const finalAngle = angle + angleOffset
				const distance = random(minDistance, maxDistance)

				const x = Math.cos(finalAngle) * distance
				const z = Math.sin(finalAngle) * distance

				const scale = random(0.7, 1.1)
				const rotationX = random(-0.2, 0.2)
				const rotationY = random(0, Math.PI * 2)
				const rotationZ = random(-0.2, 0.2)

				const height = random(0.6, 1)
				const width = random(0.3, 0.5)
				const depth = random(0.1, 0.2)

				return {
					position: [x, height / 2 - 0.2, z] as [number, number, number],
					rotation: [rotationX, rotationY, rotationZ] as [number, number, number],
					scale: [scale, scale, scale] as [number, number, number],
					height,
					width,
					depth
				}
			}),
		[]
	)

	return (
		<group>
			{gravestones.map((stone, index) => (
				<mesh key={index} position={stone.position} rotation={stone.rotation} scale={stone.scale} castShadow>
					<boxGeometry args={[stone.width, stone.height, stone.depth]} />
					<meshStandardMaterial
						map={stoneColorMap}
						roughnessMap={stoneArmMap}
						metalnessMap={stoneArmMap}
						normalMap={stoneNormalMap}
						normalScale={stoneNormalScale}
					/>
				</mesh>
			))}
		</group>
	)
}


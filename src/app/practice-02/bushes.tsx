'use client'

import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useMemo } from 'react'
import { RepeatWrapping, SRGBColorSpace, Texture, Vector2 } from 'three'

import leavesArmTextureUrl from './leaves/leaves_forest_ground_arm_1k.jpg'
import leavesDiffTextureUrl from './leaves/leaves_forest_ground_diff_1k.jpg'
import leavesNorTextureUrl from './leaves/leaves_forest_ground_nor_gl_1k.jpg'

export function Bushes() {
	const leavesTextureUrls = useMemo(() => [leavesDiffTextureUrl.src, leavesArmTextureUrl.src, leavesNorTextureUrl.src], [])
	const [leavesColorMap, leavesArmMap, leavesNormalMap] = useTexture(leavesTextureUrls) as Texture[]
	const { bushRepeat, bushNormalStrength } = useControls(
		'Bush Texture',
		{
			bushRepeat: { value: 2.4, min: 0.5, max: 5, step: 0.1 },
			bushNormalStrength: { value: 1, min: 0, max: 2, step: 0.05 }
		},
		{ collapsed: true }
	)
	const leavesNormalScale = useMemo(() => new Vector2(bushNormalStrength, bushNormalStrength), [bushNormalStrength])

	useEffect(() => {
		const textures = [leavesColorMap, leavesArmMap, leavesNormalMap]
		textures.forEach(texture => {
			if (!texture) return
			texture.wrapS = RepeatWrapping
			texture.wrapT = RepeatWrapping
			texture.repeat.set(bushRepeat, bushRepeat)
			texture.needsUpdate = true
		})
	}, [leavesArmMap, leavesColorMap, leavesNormalMap, bushRepeat])

	useEffect(() => {
		if (leavesColorMap) {
			leavesColorMap.colorSpace = SRGBColorSpace
		}
	}, [leavesColorMap])

	const bushPositions: [number, number, number][] = [
		[2, 0.18, 1.5],
		[-2, 0.18, 1.5],
		[2, 0.18, -1.5],
		[-2, 0.18, -1.5],
		[1.5, 0.15, 2.5],
		[-1.5, 0.15, 2.5],
		[1.5, 0.15, -2.5],
		[-1.5, 0.15, -2.5]
	]

	return (
		<group>
			{bushPositions.map((position, index) => (
				<mesh key={index} position={position} castShadow>
					<sphereGeometry args={[0.3, 16, 16]} />
					<meshStandardMaterial
						map={leavesColorMap}
						roughnessMap={leavesArmMap}
						metalnessMap={leavesArmMap}
						normalMap={leavesNormalMap}
						normalScale={leavesNormalScale}
					/>
				</mesh>
			))}
		</group>
	)
}


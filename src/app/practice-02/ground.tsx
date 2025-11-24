'use client'

import { useControls } from 'leva'
import { useEffect, useMemo } from 'react'
import { CanvasTexture, RepeatWrapping, SRGBColorSpace, Texture, Vector2 } from 'three'
import { useTexture } from '@react-three/drei'

import diffTextureUrl from './floor/coast_sand_rocks_02_diff_1k.webp'
import armTextureUrl from './floor/coast_sand_rocks_02_arm_1k.webp'
import norTextureUrl from './floor/coast_sand_rocks_02_nor_gl_1k.webp'
import dispTextureUrl from './floor/coast_sand_rocks_02_disp_1k.webp'

const textureUrls = [diffTextureUrl.src, armTextureUrl.src, norTextureUrl.src, dispTextureUrl.src]

export function Ground() {
	const gradientTexture = useMemo(() => {
		const size = 512
		const canvas = document.createElement('canvas')
		canvas.width = size
		canvas.height = size
		const ctx = canvas.getContext('2d')!

		const centerX = size / 2
		const centerY = size / 2
		const radius = size / 2

		const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
		gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
		gradient.addColorStop(0.7, 'rgba(255, 255, 255, 1)')
		gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')

		ctx.fillStyle = gradient
		ctx.fillRect(0, 0, size, size)

		const texture = new CanvasTexture(canvas)
		texture.needsUpdate = true
		return texture
	}, [])

	const { repeatCount, normalStrength, displacementScale, displacementBias } = useControls(
		'Ground Texture',
		{
			repeatCount: { value: 4, min: 1, max: 30, step: 1 },
			normalStrength: { value: 1, min: 0, max: 2, step: 0.05 },
			displacementScale: { value: 0.3, min: 0, max: 0.5, step: 0.01 },
			displacementBias: { value: -0.15, min: -1, max: 1, step: 0.01 }
		},
		{ collapsed: true }
	)

	const [colorMap, armMap, normalMap, displacementMap] = useTexture(textureUrls) as Texture[]
	const normalScaleVector = useMemo(() => new Vector2(normalStrength, normalStrength), [normalStrength])

	useEffect(() => {
		const repeatingTextures = [colorMap, armMap, normalMap, displacementMap]
		repeatingTextures.forEach(texture => {
			if (!texture) return
			texture.wrapS = RepeatWrapping
			texture.wrapT = RepeatWrapping
			texture.repeat.set(repeatCount, repeatCount)
			texture.needsUpdate = true
		})

		if (colorMap) {
			colorMap.colorSpace = SRGBColorSpace
		}
	}, [colorMap, armMap, normalMap, displacementMap, repeatCount])

	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
			<planeGeometry args={[20, 20, 256, 256]} />
			<meshStandardMaterial
				map={colorMap}
				roughnessMap={armMap}
				metalnessMap={armMap}
				normalMap={normalMap}
				displacementMap={displacementMap}
				normalScale={normalScaleVector}
				displacementScale={displacementScale}
				displacementBias={displacementBias}
				alphaMap={gradientTexture}
				transparent
			/>
		</mesh>
	)
}

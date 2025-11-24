'use client'

import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, PlaneGeometry, RepeatWrapping, SRGBColorSpace, Texture, Vector2 } from 'three'

import wallArmTextureUrl from './wall/medieval_red_brick_arm_1k.jpg'
import wallDiffTextureUrl from './wall/medieval_red_brick_diff_1k.jpg'
import wallNorTextureUrl from './wall/medieval_red_brick_nor_gl_1k.jpg'
import roofArmTextureUrl from './roofing/riet_01_arm_1k.jpg'
import roofDiffTextureUrl from './roofing/riet_01_diff_1k.jpg'
import roofNorTextureUrl from './roofing/riet_01_nor_gl_1k.jpg'
import doorAoTextureUrl from './door/Door_Wood_001_ambientOcclusion.jpg'
import doorColorTextureUrl from './door/Door_Wood_001_basecolor.jpg'
import doorHeightTextureUrl from './door/Door_Wood_001_height.png'
import doorOpacityTextureUrl from './door/Door_Wood_001_opacity.jpg'

type HouseProps = {
	orbitControlsRef: MutableRefObject<any>
}

export function House({ orbitControlsRef }: HouseProps) {
	const wallTextureUrls = useMemo(() => [wallDiffTextureUrl.src, wallArmTextureUrl.src, wallNorTextureUrl.src], [])
	const { wallRepeat, wallNormalStrength } = useControls(
		'Wall Texture',
		{
			wallRepeat: { value: 1, min: 0.5, max: 5, step: 0.1 },
			wallNormalStrength: { value: 1.2, min: 0, max: 2, step: 0.05 }
		},
		{ collapsed: true }
	)
	const roofTextureUrls = useMemo(() => [roofDiffTextureUrl.src, roofArmTextureUrl.src, roofNorTextureUrl.src], [])
	const { roofRepeat, roofNormalStrength } = useControls(
		'Roof Texture',
		{
			roofRepeat: { value: 1, min: 0.5, max: 5, step: 0.1 },
			roofNormalStrength: { value: 1, min: 0, max: 2, step: 0.05 }
		},
		{ collapsed: true }
	)
	const [wallColorMap, wallArmMap, wallNormalMap] = useTexture(wallTextureUrls) as Texture[]
	const [roofColorMap, roofArmMap, roofNormalMap] = useTexture(roofTextureUrls) as Texture[]
	const doorTextureUrls = useMemo(() => [doorColorTextureUrl.src, doorOpacityTextureUrl.src, doorAoTextureUrl.src, doorHeightTextureUrl.src], [])
	const [doorColorMap, doorOpacityMap, doorAoMap, doorHeightMap] = useTexture(doorTextureUrls) as Texture[]
	const wallNormalScale = useMemo(() => new Vector2(wallNormalStrength, wallNormalStrength), [wallNormalStrength])
	const roofNormalScale = useMemo(() => new Vector2(roofNormalStrength, roofNormalStrength), [roofNormalStrength])
	const doorGeometryRef = useRef<PlaneGeometry | null>(null)
	const transformControlsRef = useRef<any>(null)

	useEffect(() => {
		const textures = [wallColorMap, wallArmMap, wallNormalMap]
		textures.forEach(texture => {
			if (!texture) return
			texture.wrapS = RepeatWrapping
			texture.wrapT = RepeatWrapping
			texture.repeat.set(wallRepeat, wallRepeat)
			texture.needsUpdate = true
		})

		if (wallColorMap) {
			wallColorMap.colorSpace = SRGBColorSpace
		}
	}, [wallArmMap, wallColorMap, wallNormalMap, wallRepeat])

	useEffect(() => {
		const textures = [roofColorMap, roofArmMap, roofNormalMap]
		textures.forEach(texture => {
			if (!texture) return
			texture.wrapS = RepeatWrapping
			texture.wrapT = RepeatWrapping
			texture.repeat.set(roofRepeat, roofRepeat)
			texture.needsUpdate = true
		})

		if (roofColorMap) {
			roofColorMap.colorSpace = SRGBColorSpace
		}
	}, [roofArmMap, roofColorMap, roofNormalMap, roofRepeat])

	useEffect(() => {
		if (doorColorMap) {
			doorColorMap.colorSpace = SRGBColorSpace
		}
	}, [doorColorMap])

	useEffect(() => {
		if (!doorGeometryRef.current) return
		const geometry = doorGeometryRef.current
		const uvAttribute = geometry.attributes.uv
		if (!geometry.getAttribute('uv2') && uvAttribute) {
			geometry.setAttribute('uv2', new BufferAttribute(uvAttribute.array, 2))
		}
	}, [])

	useEffect(() => {
		const transform = transformControlsRef.current
		if (!transform) return

		const handleDragging = (event: any) => {
			if (!orbitControlsRef.current) return
			orbitControlsRef.current.enabled = !event.value
		}
		const handleMouseUp = () => {
			const target = transform.object
			if (!target) return
			const { x, y, z } = target.position
			console.log('[TransformControls] Light position', { x, y, z })
		}

		transform.addEventListener('dragging-changed', handleDragging)
		transform.addEventListener('mouseUp', handleMouseUp)
		return () => {
			transform.removeEventListener('dragging-changed', handleDragging)
			transform.removeEventListener('mouseUp', handleMouseUp)
		}
	}, [orbitControlsRef])

	return (
		<group position={[0, 0, 0]}>
			<mesh position={[0, 1, 0]} castShadow>
				<boxGeometry args={[3, 2, 3]} />
				<meshStandardMaterial map={wallColorMap} roughnessMap={wallArmMap} metalnessMap={wallArmMap} normalMap={wallNormalMap} normalScale={wallNormalScale} />
			</mesh>

			<mesh position={[0, 2.75, 0]} rotation={[0, (45 * Math.PI) / 180, 0]} castShadow>
				<coneGeometry args={[2.5, 1.5, 4]} />
				<meshStandardMaterial
					map={roofColorMap}
					aoMap={roofArmMap}
					roughnessMap={roofArmMap}
					metalnessMap={roofArmMap}
					normalMap={roofNormalMap}
					normalScale={roofNormalScale}
				/>
			</mesh>

			<mesh position={[0, 0.6, 1.51]} castShadow>
				<planeGeometry ref={doorGeometryRef} args={[0.8, 1.2, 32, 32]} />
				<meshStandardMaterial
					map={doorColorMap}
					alphaMap={doorOpacityMap}
					aoMap={doorAoMap}
					aoMapIntensity={1}
					displacementMap={doorHeightMap}
					displacementScale={0.05}
					displacementBias={-0.02}
					transparent
				/>
			</mesh>

			<pointLight intensity={5} color='#ff7d46' position={[0, 1.92, 1.7]} />
		</group>
	)
}

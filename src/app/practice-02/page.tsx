'use client'

import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useMemo } from 'react'
import { RepeatWrapping, SRGBColorSpace, Texture, Vector2 } from 'three'
import armTextureUrl from './floor/coast_sand_rocks_02_arm_1k.jpg'
import diffTextureUrl from './floor/coast_sand_rocks_02_diff_1k.jpg'
import dispTextureUrl from './floor/coast_sand_rocks_02_disp_1k.jpg'
import norTextureUrl from './floor/coast_sand_rocks_02_nor_gl_1k.jpg'
import wallArmTextureUrl from './wall/medieval_red_brick_arm_1k.jpg'
import wallDiffTextureUrl from './wall/medieval_red_brick_diff_1k.jpg'
import wallNorTextureUrl from './wall/medieval_red_brick_nor_gl_1k.jpg'
import roofArmTextureUrl from './roofing/riet_01_arm_1k.jpg'
import roofDiffTextureUrl from './roofing/riet_01_diff_1k.jpg'
import roofNorTextureUrl from './roofing/riet_01_nor_gl_1k.jpg'

const textureUrls = [diffTextureUrl.src, armTextureUrl.src, norTextureUrl.src, dispTextureUrl.src]

function Ground() {
	// Create radial gradient texture for alpha fade
	const gradientTexture = useMemo(() => {
		const size = 512
		const canvas = document.createElement('canvas')
		canvas.width = size
		canvas.height = size
		const ctx = canvas.getContext('2d')!

		// Create radial gradient from center (white) to edges (transparent)
		const centerX = size / 2
		const centerY = size / 2
		const radius = size / 2

		const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
		gradient.addColorStop(0, 'rgba(255, 255, 255, 1)') // Center: white, fully opaque
		gradient.addColorStop(0.7, 'rgba(255, 255, 255, 1)') // Keep white for most of the center
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0)') // Edges: transparent

		ctx.fillStyle = gradient
		ctx.fillRect(0, 0, size, size)

		const texture = new Texture(canvas)
		texture.needsUpdate = true
		return texture
	}, [])

	const { repeatCount, normalStrength, displacementScale, displacementBias } = useControls('Ground Texture', {
		repeatCount: { value: 4, min: 1, max: 30, step: 1 },
		normalStrength: { value: 1, min: 0, max: 2, step: 0.05 },
		displacementScale: { value: 0.3, min: 0, max: 0.5, step: 0.01 },
		displacementBias: { value: -0.15, min: -1, max: 1, step: 0.01 }
	})

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

function House() {
	const wallTextureUrls = useMemo(() => [wallDiffTextureUrl.src, wallArmTextureUrl.src, wallNorTextureUrl.src], [])
	const { wallRepeat, wallNormalStrength } = useControls('Wall Texture', {
		wallRepeat: { value: 1, min: 0.5, max: 5, step: 0.1 },
		wallNormalStrength: { value: 1.2, min: 0, max: 2, step: 0.05 }
	})
	const roofTextureUrls = useMemo(() => [roofDiffTextureUrl.src, roofArmTextureUrl.src, roofNorTextureUrl.src], [])
	const { roofRepeat, roofNormalStrength } = useControls('Roof Texture', {
		roofRepeat: { value: 1, min: 0.5, max: 5, step: 0.1 },
		roofNormalStrength: { value: 1, min: 0, max: 2, step: 0.05 }
	})
	const [wallColorMap, wallArmMap, wallNormalMap] = useTexture(wallTextureUrls) as Texture[]
	const [roofColorMap, roofArmMap, roofNormalMap] = useTexture(roofTextureUrls) as Texture[]
	const wallNormalScale = useMemo(() => new Vector2(wallNormalStrength, wallNormalStrength), [wallNormalStrength])
	const roofNormalScale = useMemo(() => new Vector2(roofNormalStrength, roofNormalStrength), [roofNormalStrength])

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

	return (
		<group position={[0, 0, 0]}>
			{/* House body - cube */}
			<mesh position={[0, 1, 0]}>
				<boxGeometry args={[3, 2, 3]} />
				<meshStandardMaterial map={wallColorMap} roughnessMap={wallArmMap} metalnessMap={wallArmMap} normalMap={wallNormalMap} normalScale={wallNormalScale} />
			</mesh>

			{/* Roof - cone */}
			<mesh position={[0, 2.75, 0]} rotation={[0, (45 * Math.PI) / 180, 0]}>
				<coneGeometry args={[2.5, 1.5, 4]} />
				<meshStandardMaterial
					map={roofColorMap}
					roughnessMap={roofArmMap}
					metalnessMap={roofArmMap}
					normalMap={roofNormalMap}
					normalScale={roofNormalScale}
				/>
			</mesh>

			{/* Door - mesh */}
			<mesh position={[0, 0.6, 1.51]}>
				<planeGeometry args={[0.8, 1.2]} />
				<meshStandardMaterial color='#8B4513' />
			</mesh>
		</group>
	)
}

function Bushes() {
	// Bush positions around the house
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
					<sphereGeometry args={[0.4, 16, 16]} />
					<meshStandardMaterial color='#228B22' />
				</mesh>
			))}
		</group>
	)
}

const random = (min: number, max: number) => Math.random() * (max - min) + min
const minDistance = 3.5 // Minimum distance from house center
const maxDistance = 8 // Maximum distance from house center
const count = 24 // Number of gravestones
function Gravestones() {
	useEffect(() => {}, [])

	// Random number generator helper

	// Configuration

	// Generate gravestone positions with uniform distribution
	const gravestones = useMemo(
		() =>
			Array.from({ length: count }, (_, index) => {
				// Uniform angle distribution around the house
				const angle = (index / count) * Math.PI * 2
				// Add small random offset to angle for more natural distribution
				const angleOffset = random(-Math.PI / count, Math.PI / count)
				const finalAngle = angle + angleOffset
				// Random distance between min and max
				const distance = random(minDistance, maxDistance)

				// Calculate position
				const x = Math.cos(finalAngle) * distance
				const z = Math.sin(finalAngle) * distance

				// Random properties
				const scale = random(0.7, 1.1)
				// Random rotation on all axes (X and Z should be small to keep gravestones upright)
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
					<meshStandardMaterial color='#696969' />
				</mesh>
			))}
		</group>
	)
}

export default function Page() {
	const { showGrid, gridSize, showAxes, axesSize } = useControls('Helpers', {
		showGrid: false,
		gridSize: { value: 20, min: 5, max: 30, step: 1 },
		showAxes: true,
		axesSize: { value: 5, min: 1, max: 10, step: 0.5 }
	})

	const { ambientIntensity, directionalIntensity } = useControls('Lighting', {
		ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
		directionalIntensity: { value: 1, min: 0, max: 3, step: 0.1 }
	})

	return (
		<div className='fixed inset-0 rounded-lg border bg-black'>
			<Canvas
				camera={{
					position: [3, 6, 8],
					fov: 50,
					near: 0.1,
					far: 100
				}}
				shadows>
				<ambientLight intensity={ambientIntensity} />
				<directionalLight position={[5, 10, 5]} intensity={directionalIntensity} />

				<Ground />
				<House />
				<Bushes />
				<Gravestones />

				{showGrid && <gridHelper args={[gridSize, gridSize]} />}
				{showAxes && <axesHelper args={[axesSize]} />}

				<OrbitControls />
			</Canvas>
		</div>
	)
}

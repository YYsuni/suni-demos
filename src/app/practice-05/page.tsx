'use client'

import { useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import gradientTextureUrl from './static/textures/gradients/3.jpg'

const objectsDistance = 8

// Section Meshes Component
function SectionMeshes({ material, scrollY }: { material: THREE.MeshToonMaterial; scrollY: number }) {
	const mesh1Ref = useRef<THREE.Mesh>(null)
	const mesh2Ref = useRef<THREE.Mesh>(null)
	const mesh3Ref = useRef<THREE.Mesh>(null)

	const [currentSection, setCurrentSection] = useState(0)
	const animationRefs = useRef<{ [key: number]: number | null }>({ 0: null, 1: null, 2: null })

	useEffect(() => {
		const newSection = Math.round(scrollY / window.innerHeight)
		if (newSection !== currentSection && newSection >= 0 && newSection < 3) {
			setCurrentSection(newSection)
			const targetMesh = [mesh1Ref, mesh2Ref, mesh3Ref][newSection]
			if (targetMesh.current) {
				// Cancel any existing animation for this mesh
				const existingAnimation = animationRefs.current[newSection]
				if (existingAnimation !== null) {
					cancelAnimationFrame(existingAnimation)
				}

				const targetRotation = {
					x: targetMesh.current.rotation.x + 6,
					y: targetMesh.current.rotation.y + 3,
					z: targetMesh.current.rotation.z + 1.5
				}

				// Animate rotation using lerp (simulating GSAP ease)
				const startRotation = {
					x: targetMesh.current.rotation.x,
					y: targetMesh.current.rotation.y,
					z: targetMesh.current.rotation.z
				}
				const duration = 1500 // 1.5 seconds
				const startTime = Date.now()

				const animate = () => {
					const elapsed = Date.now() - startTime
					const progress = Math.min(elapsed / duration, 1)
					// Ease function: power2.inOut
					const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

					if (targetMesh.current && progress < 1) {
						targetMesh.current.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * eased
						targetMesh.current.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * eased
						targetMesh.current.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * eased
						const frameId = requestAnimationFrame(animate)
						animationRefs.current[newSection] = frameId
					} else {
						animationRefs.current[newSection] = null
					}
				}
				const frameId = requestAnimationFrame(animate)
				animationRefs.current[newSection] = frameId
			}
		}
	}, [scrollY, currentSection])

	// Cleanup animations on unmount
	useEffect(() => {
		return () => {
			Object.values(animationRefs.current).forEach(frameId => {
				if (frameId !== null) {
					cancelAnimationFrame(frameId)
				}
			})
		}
	}, [])

	useFrame((state, delta) => {
		if (mesh1Ref.current) {
			mesh1Ref.current.rotation.x += delta * 0.1
			mesh1Ref.current.rotation.y += delta * 0.12
		}
		if (mesh2Ref.current) {
			mesh2Ref.current.rotation.x += delta * 0.1
			mesh2Ref.current.rotation.y += delta * 0.12
		}
		if (mesh3Ref.current) {
			mesh3Ref.current.rotation.x += delta * 0.1
			mesh3Ref.current.rotation.y += delta * 0.12
		}
	})

	return (
		<>
			<mesh ref={mesh1Ref} position={[2, -objectsDistance * 0, 0]}>
				<torusGeometry args={[1, 0.4, 16, 60]} />
				<primitive object={material} attach='material' />
			</mesh>
			<mesh ref={mesh2Ref} position={[-2, -objectsDistance * 1, 0]}>
				<coneGeometry args={[1, 2, 32]} />
				<primitive object={material} attach='material' />
			</mesh>
			<mesh ref={mesh3Ref} position={[2, -objectsDistance * 2, 0]}>
				<torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
				<primitive object={material} attach='material' />
			</mesh>
		</>
	)
}

// Particles Component
function Particles({ materialColor }: { materialColor: string }) {
	const particlesRef = useRef<THREE.Points>(null)
	const materialRef = useRef<THREE.PointsMaterial>(null)

	const positions = useMemo(() => {
		const particlesCount = 200
		const pos = new Float32Array(particlesCount * 3)

		for (let i = 0; i < particlesCount; i++) {
			pos[i * 3 + 0] = (Math.random() - 0.5) * 10
			pos[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 3
			pos[i * 3 + 2] = (Math.random() - 0.5) * 10
		}

		return pos
	}, [])

	useEffect(() => {
		if (materialRef.current) {
			materialRef.current.color.set(materialColor)
		}
	}, [materialColor])

	return (
		<points ref={particlesRef}>
			<bufferGeometry>
				<bufferAttribute attach='attributes-position' args={[positions, 3]} />
			</bufferGeometry>
			<pointsMaterial ref={materialRef} sizeAttenuation size={0.03} />
		</points>
	)
}

// Camera Controller Component
function CameraController({ scrollY, cursor }: { scrollY: number; cursor: { x: number; y: number } }) {
	const { camera } = useThree()
	const parallaxRef = useRef({ x: 0, y: 0 })

	useFrame((state, delta) => {
		// Parallax effect
		const parallaxX = cursor.x * 0.5
		const parallaxY = -cursor.y * 0.5

		parallaxRef.current.x += (parallaxX - parallaxRef.current.x) * 5 * delta
		parallaxRef.current.y += (parallaxY - parallaxRef.current.y) * 5 * delta

		// Update camera position: Y based on scroll, X and Y offset from parallax
		camera.position.y = (-scrollY / window.innerHeight) * objectsDistance + parallaxRef.current.y
		camera.position.x = parallaxRef.current.x
	})

	return null
}

// Scene Component
function Scene() {
	const { materialColor } = useControls({
		materialColor: '#ffeded'
	})

	const gradientTexture = useTexture(gradientTextureUrl.src, texture => {
		texture.magFilter = THREE.NearestFilter
	})

	const material = useMemo(() => {
		const mat = new THREE.MeshToonMaterial({
			color: materialColor,
			gradientMap: gradientTexture
		})
		return mat
	}, [materialColor, gradientTexture])

	// Update material color when it changes
	useEffect(() => {
		material.color.set(materialColor)
	}, [material, materialColor])

	const [scrollY, setScrollY] = useState(0)
	const [cursor, setCursor] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		const handleMouseMove = (event: MouseEvent) => {
			setCursor({
				x: event.clientX / window.innerWidth - 0.5,
				y: event.clientY / window.innerHeight - 0.5
			})
		}

		window.addEventListener('scroll', handleScroll)
		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return (
		<>
			<CameraController scrollY={scrollY} cursor={cursor} />
			<directionalLight position={[1, 1, 0]} intensity={3} color='#ffffff' />
			<SectionMeshes material={material} scrollY={scrollY} />
			<Particles materialColor={materialColor} />
		</>
	)
}

export default function Page() {
	return (
		<div className='relative bg-[#1e1a20]'>
			<div className='fixed inset-0 z-0'>
				<Canvas camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 100 }} gl={{ alpha: true }}>
					<Scene />
				</Canvas>
			</div>

			<section className='section flex h-screen items-center px-[10%] font-["Cabin",sans-serif] text-[7vmin] text-[#ffeded] uppercase'>
				<h1>My Portfolio</h1>
			</section>
			<section className='section flex h-screen items-center justify-end px-[10%] font-["Cabin",sans-serif] text-[7vmin] text-[#ffeded] uppercase'>
				<h2>My projects</h2>
			</section>
			<section className='section flex h-screen items-center px-[10%] font-["Cabin",sans-serif] text-[7vmin] text-[#ffeded] uppercase'>
				<h2>Contact me</h2>
			</section>
		</div>
	)
}

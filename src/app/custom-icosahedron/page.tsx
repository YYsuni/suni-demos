'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import { MeshPhysicalMaterial } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'
import defaultVertexShader from './default.vert'
import defaultFragmentShader from './default.frag'

function Icosahedron({
	vertexShader,
	fragmentShader,
	wireframe,
	detail
}: {
	vertexShader: string
	fragmentShader: string
	wireframe: boolean
	detail: number
}) {
	const materialRef = useRef<any>(null)

	useFrame(state => {
		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
			materialRef.current.wireframe = wireframe
		}
	})

	return (
		<mesh>
			<icosahedronGeometry args={[2, detail]} />
			<CustomShaderMaterial
				key={`${vertexShader}-${fragmentShader}`}
				ref={materialRef}
				baseMaterial={MeshPhysicalMaterial}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				wireframe={wireframe}
				uniforms={{
					uTime: { value: 0 }
				}}
			/>
		</mesh>
	)
}

export default function CustomIcosahedronPage() {
	const [fragmentShader, setFragmentShader] = useState(defaultFragmentShader)
	const [vertexShader, setVertexShader] = useState(defaultVertexShader)
	const { wireframe, detail } = useControls({
		wireframe: false,
		detail: {
			value: 24,
			min: 0,
			max: 128,
			step: 1
		}
	})

	return (
		<div className='relative h-screen w-full'>
			<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
				<Icosahedron vertexShader={vertexShader} fragmentShader={fragmentShader} wireframe={wireframe} detail={detail} />
				<Environment preset='sunset' />
				<OrbitControls />
				<GizmoHelper alignment='bottom-left' margin={[80, 80]}>
					<GizmoViewport />
				</GizmoHelper>
			</Canvas>
			<div className='absolute right-4 bottom-4 flex w-96 flex-col gap-2'>
				<textarea
					value={fragmentShader}
					onChange={e => setFragmentShader(e.target.value)}
					className='h-64 w-full resize-none rounded border border-white/20 bg-black/80 p-3 font-mono text-sm text-white focus:border-white/40 focus:outline-none'
					placeholder='Enter fragment shader code...'
					spellCheck={false}
				/>
				<textarea
					value={vertexShader}
					onChange={e => setVertexShader(e.target.value)}
					className='h-64 w-full resize-none rounded border border-white/20 bg-black/80 p-3 font-mono text-sm text-white focus:border-white/40 focus:outline-none'
					placeholder='Enter vertex shader code...'
					spellCheck={false}
				/>
			</div>
		</div>
	)
}

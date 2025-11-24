'use client'

import { useHelper } from '@react-three/drei'
import { MutableRefObject, useEffect, useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

type DirectionalLightRigProps = {
	intensity: number
	color: string
	showHelper: boolean
	orbitControlsRef: MutableRefObject<any>
}

export function DirectionalLightRig({ intensity, color, showHelper, orbitControlsRef }: DirectionalLightRigProps) {
	const directionalLightRef = useRef<DirectionalLight>(null!)
	const transformControlsRef = useRef<any>(null)
	const helperRef = useHelper(directionalLightRef, DirectionalLightHelper, 1, '#86cdff')

	useEffect(() => {
		if (!helperRef.current) return
		helperRef.current.visible = showHelper
	}, [helperRef, showHelper])

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
			console.log('[TransformControls] Directional light position', { x, y, z })
		}

		transform.addEventListener('dragging-changed', handleDragging)
		transform.addEventListener('mouseUp', handleMouseUp)

		return () => {
			transform.removeEventListener('dragging-changed', handleDragging)
			transform.removeEventListener('mouseUp', handleMouseUp)
		}
	}, [orbitControlsRef])

	return (
		<directionalLight ref={directionalLightRef} intensity={intensity} position={[8.5, 0, -3]} color={color} castShadow />
	)
}


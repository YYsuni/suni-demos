'use client'

import { useMemo } from 'react'
import styles from './electric-border.module.css'

interface FilterCardProps {
	filterId: string
	title: string
	description: string
	stepNumber?: number
	borderColor?: string
	cardWidth?: number
	cardHeight?: number
}

export function FilterCard({ filterId, title, description, stepNumber, borderColor = '#dd8448', cardWidth = 350, cardHeight = 500 }: FilterCardProps) {
	const borderColorRgb = useMemo(() => {
		const hex = borderColor.replace('#', '')
		const r = parseInt(hex.substring(0, 2), 16)
		const g = parseInt(hex.substring(2, 4), 16)
		const b = parseInt(hex.substring(4, 6), 16)
		return { r, g, b }
	}, [borderColor])

	return (
		<div className={styles.cardContainer}>
			<div className={styles.innerContainer}>
				<div
					className={styles.borderOuter}
					style={{
						borderColor: `rgba(${borderColorRgb.r}, ${borderColorRgb.g}, ${borderColorRgb.b}, 0.5)`
					}}>
					<div
						className={styles.mainCard}
						style={{
							borderColor: borderColor,
							width: `${cardWidth}px`,
							height: `${cardHeight}px`,
							filter: `url(#${filterId})`
						}}></div>
				</div>
				<div
					className={styles.glowLayer1}
					style={{
						borderColor: `rgba(${borderColorRgb.r}, ${borderColorRgb.g}, ${borderColorRgb.b}, 0.6)`,
						filter: 'blur(1px)'
					}}></div>
				<div
					className={styles.glowLayer2}
					style={{
						borderColor: borderColor,
						filter: 'blur(4px)',
						opacity: 1
					}}></div>
			</div>

			<div
				className={styles.overlay1}
				style={{
					opacity: 1,
					filter: 'blur(16px)'
				}}></div>
			<div
				className={styles.overlay2}
				style={{
					opacity: 0.5,
					filter: 'blur(16px)'
				}}></div>
			<div
				className={styles.backgroundGlow}
				style={{
					opacity: 0.3,
					filter: 'blur(32px)',
					background: `linear-gradient(-30deg, ${borderColor}, transparent, ${borderColor})`
				}}></div>

			<div className={styles.contentContainer}>
				<div className={styles.contentTop}>
					<div className={styles.scrollbarGlass}>Step</div>
					<p className={styles.title}>{title}</p>
				</div>

				<hr className={styles.divider} />

				<div className={styles.contentBottom}>
					<p className={styles.description}>{description}</p>
				</div>
			</div>
		</div>
	)
}

'use client'

import { useControls, Leva } from 'leva'
import { FilterCard } from './filter-card'
import { SVGFilterDefinitions } from './svg-filter-definitions'
import styles from './electric-border.module.css'

export default function ElectricBorder() {
	const { baseFrequency, numOctaves, displacementScale, animationDuration, borderColor, cardWidth, cardHeight, filterScale, blendMode } = useControls({
		baseFrequency: { value: 0.02, min: 0.001, max: 0.1, step: 0.001, label: '噪声频率（Base Frequency）' },
		numOctaves: { value: 10, min: 1, max: 20, step: 1, label: '噪声层数（Num Octaves）' },
		displacementScale: { value: 30, min: 0, max: 100, step: 1, label: '边框扭曲强度（Displacement Scale）' },
		animationDuration: { value: 6, min: 1, max: 20, step: 0.5, label: '动画时长（秒）' },
		borderColor: { value: '#3dd19b', label: '边框颜色' },
		cardWidth: { value: 300, min: 150, max: 500, step: 10, label: '卡片宽度（px）' },
		cardHeight: { value: 400, min: 200, max: 800, step: 10, label: '卡片高度（px）' },
		filterScale: { value: 20, min: 0, max: 100, step: 1, label: '滤镜缩放（相对卡片 %）' },
		blendMode: {
			value: 'color-dodge',
			options: [
				'normal',
				'multiply',
				'screen',
				'darken',
				'lighten',
				'color-dodge',
				'color-burn',
				'hard-light',
				'soft-light',
				'difference',
				'exclusion',
				'hue',
				'saturation',
				'color',
				'luminosity'
			],
			label: '混合模式（Blend Mode）'
		}
	})

	const steps = [
		{
			id: 'filter-step-1',
			title: 'Step 1: Single Vertical Noise',
			description: '单个垂直噪声，使用 feTurbulence 和 feOffset 创建垂直方向动画'
		},
		{
			id: 'filter-step-2',
			title: 'Step 2: Dual Vertical Noise',
			description: '两个垂直噪声，使用 feComposite 合并，保证连续性'
		},
		{
			id: 'filter-step-3',
			title: 'Step 3: Dual Horizontal Noise',
			description: '两个水平噪声，使用 feComposite 合并，保证连续性'
		},
		{
			id: 'filter-step-4',
			title: 'Step 4: Combined Directions',
			description: '垂直和水平噪声合并，使用 feBlend 混合'
		},
		{
			id: 'filter-step-5',
			title: 'Step 5: Full Effect',
			description: '完整效果：合并噪声 + feDisplacementMap 应用到边框'
		}
	]

	return (
		<>
			<Leva collapsed />
			<main
				className={styles.mainContainer}
				style={{
					// @ts-ignore
					'--electric-border-color': borderColor
				}}>
				<SVGFilterDefinitions
					baseFrequency={baseFrequency}
					numOctaves={numOctaves}
					displacementScale={displacementScale}
					animationDuration={animationDuration}
					filterScale={filterScale}
					cardWidth={cardWidth}
					cardHeight={cardHeight}
					blendMode={blendMode}
				/>

				<div className='grid min-h-screen grid-cols-3 flex-wrap items-center justify-center gap-32 max-lg:grid-cols-2 max-sm:grid-cols-1'>
					{steps.map(step => (
						<FilterCard
							key={step.id}
							filterId={step.id}
							title={step.title}
							description={step.description}
							borderColor={borderColor}
							cardWidth={cardWidth}
							cardHeight={cardHeight}
						/>
					))}
				</div>
			</main>
		</>
	)
}

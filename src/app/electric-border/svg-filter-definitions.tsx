'use client'

interface SVGFilterDefinitionsProps {
	baseFrequency?: number
	numOctaves?: number
	displacementScale?: number
	animationDuration?: number
	verticalRange?: number
	horizontalRange?: number
	filterScale?: number
	filterWidth?: number
	filterHeight?: number
	cardWidth?: number
	cardHeight?: number
	blendMode?: string
}

export function SVGFilterDefinitions({
	baseFrequency = 0.02,
	numOctaves = 10,
	displacementScale = 30,
	animationDuration = 6,
	verticalRange,
	horizontalRange,
	filterScale = -20,
	cardWidth = 350,
	cardHeight = 500,
	blendMode = 'color-dodge'
}: SVGFilterDefinitionsProps) {
	const filterHeight = 100 + 2 * filterScale
	const filterWidth = 100 + 2 * filterScale

	const calculatedVerticalRange = verticalRange ?? cardHeight * (filterHeight / 100)
	const calculatedHorizontalRange = horizontalRange ?? cardWidth * (filterWidth / 100)

	const filterRegion = {
		x: `${-filterScale}%`,
		y: `${-filterScale}%`,
		width: `${filterWidth}%`,
		height: `${filterHeight}%`
	}

	return (
		<svg style={{ position: 'absolute', width: 0, height: 0 }}>
			<defs>
				<filter
					id='filter-step-1'
					colorInterpolationFilters='sRGB'
					x={filterRegion.x}
					y={filterRegion.y}
					width={filterRegion.width}
					height={filterRegion.height}>
					{/* Vertical noise 1 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise1' seed={1} />
					<feOffset in='noise1' dx='0' dy='0' result='offsetNoise1'>
						<animate attributeName='dy' values={`${calculatedVerticalRange}; 0`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>
				</filter>

				<filter
					id='filter-step-2'
					colorInterpolationFilters='sRGB'
					x={filterRegion.x}
					y={filterRegion.y}
					width={filterRegion.width}
					height={filterRegion.height}>
					{/* Vertical noise 1 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise1' seed={1} />
					<feOffset in='noise1' dx='0' dy='0' result='offsetNoise1'>
						<animate attributeName='dy' values={`${calculatedVerticalRange}; 0`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Vertical noise 2 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise2' seed={1} />
					<feOffset in='noise2' dx='0' dy='0' result='offsetNoise2'>
						<animate attributeName='dy' values={`0; -${calculatedVerticalRange}`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					<feComposite in='offsetNoise1' in2='offsetNoise2' result='part1' />
				</filter>

				<filter
					id='filter-step-3'
					colorInterpolationFilters='sRGB'
					x={filterRegion.x}
					y={filterRegion.y}
					width={filterRegion.width}
					height={filterRegion.height}>
					{/* Horizontal noise 1 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise3' seed={2} />
					<feOffset in='noise3' dx='0' dy='0' result='offsetNoise3'>
						<animate attributeName='dx' values={`${calculatedHorizontalRange}; 0`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Horizontal noise 2 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise4' seed={2} />
					<feOffset in='noise4' dx='0' dy='0' result='offsetNoise4'>
						<animate attributeName='dx' values={`0; -${calculatedHorizontalRange}`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					<feComposite in='offsetNoise3' in2='offsetNoise4' result='part2' />
				</filter>

				<filter
					id='filter-step-4'
					colorInterpolationFilters='sRGB'
					x={filterRegion.x}
					y={filterRegion.y}
					width={filterRegion.width}
					height={filterRegion.height}>
					{/* Vertical noise 1 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise1' seed={1} />
					<feOffset in='noise1' dx='0' dy='0' result='offsetNoise1'>
						<animate attributeName='dy' values={`${calculatedVerticalRange}; 0`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Vertical noise 2 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise2' seed={1} />
					<feOffset in='noise2' dx='0' dy='0' result='offsetNoise2'>
						<animate attributeName='dy' values={`0; -${calculatedVerticalRange}`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Horizontal noise 1 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise3' seed={2} />
					<feOffset in='noise3' dx='0' dy='0' result='offsetNoise3'>
						<animate attributeName='dx' values={`${calculatedHorizontalRange}; 0`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Horizontal noise 2 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise4' seed={2} />
					<feOffset in='noise4' dx='0' dy='0' result='offsetNoise4'>
						<animate attributeName='dx' values={`0; -${calculatedHorizontalRange}`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Combine vertical noises */}
					<feComposite in='offsetNoise1' in2='offsetNoise2' result='part1' />
					{/* Combine horizontal noises */}
					<feComposite in='offsetNoise3' in2='offsetNoise4' result='part2' />
					{/* Blend both directions with color-dodge mode */}
					<feBlend in='part1' in2='part2' mode={blendMode} result='combinedNoise' />
				</filter>

				<filter
					id='filter-step-5'
					colorInterpolationFilters='sRGB'
					x={filterRegion.x}
					y={filterRegion.y}
					width={filterRegion.width}
					height={filterRegion.height}>
					{/* Vertical noise 1 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise1' seed={1} />
					<feOffset in='noise1' dx='0' dy='0' result='offsetNoise1'>
						<animate attributeName='dy' values={`${calculatedVerticalRange}; 0`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Vertical noise 2 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise2' seed={1} />
					<feOffset in='noise2' dx='0' dy='0' result='offsetNoise2'>
						<animate attributeName='dy' values={`0; -${calculatedVerticalRange}`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Horizontal noise 1 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise3' seed={2} />
					<feOffset in='noise3' dx='0' dy='0' result='offsetNoise3'>
						<animate attributeName='dx' values={`${calculatedHorizontalRange}; 0`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Horizontal noise 2 */}
					<feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves={numOctaves} result='noise4' seed={2} />
					<feOffset in='noise4' dx='0' dy='0' result='offsetNoise4'>
						<animate attributeName='dx' values={`0; -${calculatedHorizontalRange}`} dur={`${animationDuration}s`} repeatCount='indefinite' calcMode='linear' />
					</feOffset>

					{/* Combine vertical noises */}
					<feComposite in='offsetNoise1' in2='offsetNoise2' result='part1' />
					{/* Combine horizontal noises */}
					<feComposite in='offsetNoise3' in2='offsetNoise4' result='part2' />
					{/* Blend both directions with color-dodge mode */}
					<feBlend in='part1' in2='part2' mode={blendMode} result='combinedNoise' />
					<feDisplacementMap in='SourceGraphic' in2='combinedNoise' scale={displacementScale} xChannelSelector='R' yChannelSelector='B' />
				</filter>
			</defs>
		</svg>
	)
}

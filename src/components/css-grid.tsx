import './style.css'

export default function CSSGrid() {
	const gridLineColor = '#999'
	const gridWidth = 60
	const gridHeight = 40
	const borderWidth = 1.2

	return (
		<div className='mx-auto w-[800px] overflow-hidden rounded-lg border bg-white perspective-near max-sm:w-full' style={{ height: gridHeight * 10 }}>
			<div
				className='bg-pan-down -ml-[1000px] h-full w-[3000px] rotate-x-[45deg]'
				style={{
					backgroundImage:
						`repeating-linear-gradient(0deg, ${gridLineColor} 0, ${gridLineColor} ${borderWidth}px, transparent ${borderWidth}px, transparent ${gridHeight}px), ` +
						`repeating-linear-gradient(90deg, ${gridLineColor} 0, ${gridLineColor} ${borderWidth}px, transparent ${borderWidth}px, transparent ${gridWidth}px)`,
					backgroundRepeat: 'repeat',
					// @ts-ignore - custom property
					['--grid-h']: `${gridHeight}px`
				}}></div>
		</div>
	)
}

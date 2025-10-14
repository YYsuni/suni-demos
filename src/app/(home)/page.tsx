import CSSGrid from '@/components/css-grid'
import ThreeGrid from '@/components/three-grid'
import RotatingTorusComponent from '@/components/rotating-torus'

export default function Home() {
	return (
		<div className='space-y-8 p-8'>
			<CSSGrid />
			<ThreeGrid />
			<RotatingTorusComponent />
		</div>
	)
}

import CSSGrid from '@/components/css-grid'
import ThreeGrid from '@/components/three-grid'
import RotatingTorusComponent from '@/components/rotating-torus'
import TubeCamera from '@/components/tube-camera'

export default function Home() {
	return (
		<div className='space-y-8 p-8'>
			<CSSGrid />
			<ThreeGrid />
			<RotatingTorusComponent />
			<TubeCamera />
		</div>
	)
}


const libraryTestUrls = [
	'./images/imagini bloc suceava pentru anunt/favorites/1.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/2.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/3.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/4.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/5.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/6.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/7.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/8.jpg',
];

import { useDrag } from '@use-gesture/react'
import { a, useSpring, config } from '@react-spring/web'

import '../css/Photo_library.css'

export function Testing() {
	const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
	const height = items.length * 60 + 80
	const [{ y }, api] = useSpring(() => ({ y: height }))

	const open = ({ canceled }) => {
		// when cancel is true, it means that the user passed the upwards threshold
		// so we change the spring config to create a nice wobbly effect
		api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })
	}
	const close = (velocity = 0) => {
		api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } })
	}

	const bind = useDrag(
		({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel, canceled }) => {
			// if the user drags up passed a threshold, then we cancel
			// the drag so that the sheet resets to its open position
			if (oy < -70) cancel()

			// when the user releases the sheet, we check whether it passed
			// the threshold for it to close, or if we reset it to its open positino
			if (last) {
				oy > height * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
			}
			// when the user keeps dragging, we just move the sheet according to
			// the cursor position
			else api.start({ y: oy, immediate: true })
		},
		{ from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
	)

	const display = y.to((py) => (py < height ? 'block' : 'none'))

	const bgStyle = {
		transform: y.to([0, height], ['translateY(-8%) scale(1.16)', 'translateY(0px) scale(1.05)']),
		opacity: y.to([0, height], [0.4, 1], 'clamp'),
	}
	return (
		<div className="flex"
			style={{
				overflow: 'hidden',
			}}

		>
			<a.div
				className='bg'
				onClick={() => close()}
				style={bgStyle}
			>
				<img
					src="https://images.pexels.com/photos/1239387/pexels-photo-1239387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					alt=""
				/>
				<img
					src="https://images.pexels.com/photos/5181179/pexels-photo-5181179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					alt=""
				/>
			</a.div>
			<div className='actionBtn' onClick={open}></div>
			<a.div
				className='sheet'
				{...bind()}
				style={{
					display,
					bottom: `calc(-100vh + ${height - 100}px)`,
					y
				}}
			>
				{libraryTestUrls.map((src) => {
					return (
						<img src={src} key={src} />
					);
				})}
			</a.div>
		</div>
	)
}


export default function PhotoLibrary() {
	return (
		<>
			<div>
				<button style={{width:'200px', height:'200px'}}>
					<h5>Randari interior</h5>
					<img src="./images/imagini bloc suceava pentru anunt/favorites/1.jpg"
						style={{
							width: '100%',
							height: '100%'
						}}
					/>
				</button>
				<button style={{width:'200px', height:'200px'}}>
					<h5>Randari exterior</h5>
					<img src="./images/imagini bloc suceava pentru anunt/favorites/2.jpg"
						style={{
							width: '100%',
							height: '100%'
						}}
					/>
				</button>
				<button style={{width:'200px', height:'200px'}}>
					<h5>Poze</h5>
					<img src="./images/imagini bloc suceava pentru anunt/favorites/3.jpg"
						style={{
							width: '100%',
							height: '100%'
						}}
					/>
				</button>
				<button style={{width:'200px', height:'200px'}}>
					<h5>Planuri</h5>
					<img src="./images/imagini bloc suceava pentru anunt/favorites/4.jpg"
						style={{
							width: '100%',
							height: '100%'
						}}
					/>
				</button>
			</div>
			<div>
				{libraryTestUrls.map((src) => {
					return (
						<img src={src}
							key={src}
							style={{
								width: '200px',
								height: '200px'
							}}
						/>
					);
				})}
			</div>
		</>
	)
}
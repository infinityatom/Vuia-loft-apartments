export default function Cell({imgSrc, ...props}) {
	return (
		<div className='Cell' {...props}>
			<img src={imgSrc} />
		</div>
	);
}
import '../css/Header.css';

import LazyHashedImage from './lazy_hashed_image';
import image from '../assets/images/prop-1.jpg';

export default function Header() {
	const hash = 'LYA-^@ofR.bb.Af8R+a#tlR+WBf5';

	return (
		<div className='Header'>
			<LazyHashedImage src='https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg' hash={hash} />
		</div>
	)
}
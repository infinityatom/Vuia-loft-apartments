
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SchoolIcon from '@mui/icons-material/School';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import '../css/Location.css';
import Map from './map';

export default function Location() {
	// return <Map />;

	return (
		<section id='location'>
			<h1>Locatie</h1>
			<div className="Card">
				<p><PlaceIcon className='Icon'/><a href="https://goo.gl/maps/cofCHmEKPw84YJfN6">loc. Suceava, Strada Traian Vuia</a></p>
				<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio autem eos, sint nam exercitationem dolor et inventore suscipit accusamus, quae modi recusandae excepturi ipsam at.</p>
				<p><DirectionsBusIcon className='Icon'/> 385 Noah Place Suite 878 - 1 min</p>
				<p><SchoolIcon className='Icon'/> Scoala de langa - 1 min</p>
				<p><ShoppingCartOutlinedIcon className='Icon'/> Iulius mall - 5 min</p>
			</div>
		</section>
	)
}
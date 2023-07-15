import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

export default function Intro({ onLoaded }) {
	
	const { rive, RiveComponent } = useRive({
		src: './riv/vuia-loft-apartments-logo.riv',
		stateMachines: 'state',
		autoplay: true,
		onLoad: () => {
			console.log('loaded');
			onLoaded();
		},
	}, );
	
	const loading = useStateMachineInput(rive, 'state', 'loading', true);
	useEffect(() => {
		loading && (loading.value = true);
	}, [loading]);

	return (
		<RiveComponent style={{
			width: 400,
			height: 400,
		}}
		/>
	)
}
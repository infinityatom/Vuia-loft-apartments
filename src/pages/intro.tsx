import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

export default function Intro() {
	const { rive, RiveComponent } = useRive({
		src: './riv/vuia-loft-apartments-logo.riv',
		stateMachines: 'state',
		autoplay: true,
	});

	const pass = useStateMachineInput(rive, 'state', 'pass', false);
	
	useEffect(() => {
		pass && (pass.value = true)
	}, [pass]);

	return (
		<RiveComponent style={{
			width: 400,
			height: 400,
		}} />
	)
}

import * as Form from '@radix-ui/react-form';
import { useState, useRef } from 'react';
import { Select, SelectItem } from './select_simplified';

import '../css/Contact.css';

export default function Contact() {
	const [count, setCount] = useState(0);
	const selectRef = useRef();

	function handleSelected(value) {
		const s = selectRef.current;

		if (value || s.value) {
			s.setAttribute('data-invalid', false)
		} else {
			s.setAttribute('data-invalid', true)
		}
	}

	function submitClicked() {
		handleSelected();
	}

	function onSubmit(event) {
		event.preventDefault();

		const target = event.target;
		const form = new FormData(target);
		const urlEncoded = new URLSearchParams(form).toString();

		fetch(target.action, {
			method: target.method,
			headers: { 'Content-Type': target.enctype },
			body: urlEncoded,
		})
		.then(response => {
			if (response.ok) {
				alert('The email has been succesfully sent :)');
			} else {
				alert('We couldn\'t send your email\nHttp status code: ' + response.status);
			}
		})
		.catch(error => {
			alert('An error has occured:\n' + error);
		});
	}

	return (
		<section className='Contact'>
			<h1>Contact</h1>
			<div className='Info'>
				<h2>Pentru mai multe detalii nu ezitati sa ne contactati prin email sau telefon</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laboriosam hic ratione consequatur illum inventore! Magni porro quis minus, soluta ullam fugiat in ut doloremque.</p>
				<p>Telefon: <span>0742 750 680</span></p>
			</div>


			<Form.Root
				encType='application/x-www-form-urlencoded'
				action='https://sendemail-uvzllxrx4a-uc.a.run.app'
				method='post'
				onSubmit={onSubmit}
				className='ContactForm'
			>
				<Form.Field className='Field Name' name='name'>
					<div className="FieldHead">
						<Form.Label className='FieldLabel'>Prenume</Form.Label>
						<Form.Message className='FieldWarning' match='valueMissing'>Va rog sa-mi dati un nume</Form.Message>
					</div>
					<Form.Control type='text' required placeholder='Prenume' />
				</Form.Field>

				<Form.Field className='Field Email' name='email'>
					<div className="FieldHead">
						<Form.Label className='FieldLabel'>Email</Form.Label>
						<Form.Message className='FieldWarning' match='valueMissing'>Please enter your email</Form.Message>
						<Form.Message className='FieldWarning' match='typeMismatch'>Please provide a valid email</Form.Message>
					</div>
					<Form.Control type='email' required placeholder='example@example.com' />
				</Form.Field>

				<Form.Field className='Field Phone' name='phone'>
					<div className="FieldHead">
						<Form.Label className='FieldLabel'>Telefon</Form.Label>
						<Form.Message className='FieldWarning' match='typeMismatch'>Acest numar nu este valid</Form.Message>
					</div>
					<Form.Control type='tel' required placeholder='tel' />
				</Form.Field>

				<Form.Field className='Field Subject' name='subject'>
					<div className="FieldHead">
						<Form.Message className='FieldWarning' match='valueMissing'>Selectati un subiect</Form.Message>
					</div>
					<Form.Control asChild>
						<Select
							ref={selectRef}
							placeholder='Ce informatii doriti?'
							onValueChange={handleSelected}
							required
						>
							<SelectItem value='Preturi'>Preturi</SelectItem>
							<SelectItem value='Constructie'>Constructie</SelectItem>
							<SelectItem value='Acte'>Acte</SelectItem>
						</Select>
					</Form.Control>
				</Form.Field>

				<Form.Field className='Field Message' name='message'>
					<div className="FieldHead">
						<Form.Label className='FieldLabel'>Puneti o intrebare</Form.Label>
						<Form.Message className='FieldWarning' match='valueMissing'>Nu uitati sa scrieti intrebarea dumneavoastra in patratica de mai jos</Form.Message>
						<Form.Message className='FieldWarning' match='tooShort'>Va rugam sa puneti o intrebare mai amplacare sa contina cel putin 25 de litere</Form.Message>
					</div>
					<Form.Control type='text' asChild>
						<textarea
							required
							onChange={e => setCount(e.target.value.length)}
							minLength={25}
							maxLength={512}
							placeholder='As dorii mai multe detali despre ...'
							aria-describedby='contact_counter'
						/>
					</Form.Control>
					<span id='contact_counter' aria-live="polite">{count}/512</span>
				</Form.Field>

				<Form.Submit className='Submit' onClick={submitClicked}>
					Pune o intrebare
				</Form.Submit>
			</Form.Root>
		</section>
	)
}
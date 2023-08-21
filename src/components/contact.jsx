import * as Form from '@radix-ui/react-form';
import { useState, useRef } from 'react';
import { Select, SelectItem } from './select_simplified';

import style from '../css/Contact.module.css';

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
		<section className={style.Contact}>
			<h1>Contact</h1>
			<div className={style.Info}>
				<h2>Pentru mai multe detalii nu ezitati sa ne contactati prin email sau telefon</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laboriosam hic ratione consequatur illum inventore! Magni porro quis minus, soluta ullam fugiat in ut doloremque.</p>
				<p>Telefon: <span>0742 750 680</span></p>
			</div>


			<Form.Root
				encType='application/x-www-form-urlencoded'
				action='https://sendemail-uvzllxrx4a-uc.a.run.app'
				method='post'
				onSubmit={onSubmit}
				className={style.ContactForm}
			>
				<Form.Field className={`${style.Field} ${style.Name}`} name='name'>
					<div className={style.FieldHead}>
						{/* <Form.Label className={style.FieldLabel}>Prenume</Form.Label> */}
						<Form.Message className={style.FieldWarning} match='valueMissing'>Va rog sa-mi dati un nume</Form.Message>
					</div>
					<Form.Control type='text' required placeholder='Prenume' />
				</Form.Field>

				<Form.Field className={`${style.Field} ${style.Email}`} name='email'>
					<div className={style.FieldHead}>
						{/* <Form.Label className={style.FieldLabel}>Email</Form.Label> */}
						<Form.Message className={style.FieldWarning} match='valueMissing'>Please enter your email</Form.Message>
						<Form.Message className={style.FieldWarning} match='typeMismatch'>Please provide a valid email</Form.Message>
					</div>
					<Form.Control type='email' required placeholder='example@example.com' />
				</Form.Field>

				<Form.Field className={`${style.Field} ${style.Phone}`} name='phone'>
					<div className={style.FieldHead}>
						{/* <Form.Label className={style.FieldLabel}>Telefon</Form.Label> */}
						<Form.Message className={style.FieldWarning} match='typeMismatch'>Acest numar nu este valid</Form.Message>
					</div>
					<Form.Control type='tel' required placeholder='tel' />
				</Form.Field>

				<Form.Field className={`${style.Field} ${style.Subject}`} name='subject'>
					<div className={style.FieldHead}>
						<Form.Message className={style.FieldWarning} match='valueMissing'>Selectati un subiect</Form.Message>
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

				<Form.Field className={`${style.Field} ${style.Message}`} name='message'>
					<div className={style.FieldHead}>
						{/* <Form.Label className={style.FieldLabel}>Puneti o intrebare</Form.Label> */}
						<Form.Message className={style.FieldWarning} match='valueMissing'>Nu uitati sa scrieti intrebarea dumneavoastra in patratica de mai jos</Form.Message>
						<Form.Message className={style.FieldWarning} match='tooShort'>Va rugam sa puneti o intrebare mai amplacare sa contina cel putin 25 de litere</Form.Message>
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
					{/* <span id='contact_counter' aria-live="polite">{count}/512</span> */}
				</Form.Field>

				<Form.Submit className={style.Submit} onClick={submitClicked}>
					Pune o intrebare
				</Form.Submit>
			</Form.Root>
		</section>
	)
}
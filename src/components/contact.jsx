
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
		handleSelected()
	}

	return (
		<>
			<h1>Contact</h1>
			<p>Pentru mai multe detalii nu ezitati sa ne contactati prin email sau telefon</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laboriosam hic ratione consequatur illum inventore! Magni porro quis minus, soluta ullam fugiat in ut doloremque.</p>
			<p>Telefon: <span>0742 750 680</span></p>


			<Form.Root
				encType = 'application/x-www-form-urlencoded'
				onSubmit={(event) => {
					event.preventDefault();
				}}

			>
				<Form.Field name='email'>
					<Form.Label>Email</Form.Label>
					<Form.Message match='valueMissing'>Please enter your email</Form.Message>
					<Form.Message match='typeMismatch'>Please provide a valid email</Form.Message>
					<Form.Control type='email' required />
				</Form.Field>

				<Form.Field name='intrebare'>
					<Form.Label>Puneti o intrebare</Form.Label>
					<Form.Message match='valueMissing'>Nu uitati sa scrieti intrebarea dumneavoastra in patratica de mai jos</Form.Message>
					<Form.FormMessage match='tooShort'>Va rugam sa puneti o intrebare mai amplacare sa contina cel putin 25 de litere</Form.FormMessage>
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

				<Form.Field name='type'>
					<Form.Message match='valueMissing'>Nu uitati sa scrieti intrebarea dumneavoastra in patratica de mai jos</Form.Message>
					<Form.Control asChild>
						<Select
							ref={selectRef}
							placeholder='Ce informatii doriti?'
							onValueChange={handleSelected}
							required
						>
							<SelectItem value='1'>Item 1</SelectItem>
							<SelectItem value='2'>Item 2</SelectItem>
							<SelectItem value='3'>Item 3</SelectItem>
						</Select>
					</Form.Control>
				</Form.Field>

				<Form.Submit onClick={submitClicked}>
					Pune o intrebare
				</Form.Submit>
			</Form.Root>
		</>
	)
}
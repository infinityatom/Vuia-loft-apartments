import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import QAData from '../data/QAData.json';
import '../css/Questions.css';


export default function Questions() {

	return (
		<section className='Questions'>
			<h1>Intrebari</h1>
			<Tabs.Root className='TabsRoot' defaultValue={QAData[0].categoryName} orientation="vertical">

				<Tabs.List className='TabsList' aria-label="categori">
					{QAData.map(({ categoryName }) => (
						<Tabs.Trigger className='BorderButton' key={categoryName} value={categoryName}>{categoryName}</Tabs.Trigger>
					))}
				</Tabs.List>

				{QAData.map(({ categoryName, questions }) => (
					<Tabs.Content className='TabsContent' key={categoryName} value={categoryName}>
						<QAAccordion questions={questions}/>
					</Tabs.Content>
				))}
			</Tabs.Root>
		</section>
	)
}

function QAAccordion({questions}) {
	return (
		<Accordion.Root className='QAAccordion' type='single' collapsible>
			{questions.map(({ question, answer }) => (
				<Accordion.Item className='QAAccordionItem' key={question} value={question}>

					<Accordion.Header className='QAAccordionHeader'>
						<Accordion.Trigger className='QAAccordionTrigger'>{question}</Accordion.Trigger>
					</Accordion.Header>

					<Accordion.Content className='QAAccordionContent'>
						<p>{answer}</p>
					</Accordion.Content>

				</Accordion.Item>
			))}
		</Accordion.Root>
	);
}
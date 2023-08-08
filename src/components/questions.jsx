import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import QAData from '../data/QAData.json';
import styles from '../css/Questions.module.css';


export default function Questions() {

	return (
		<section className={styles.Questions}>
			<h1>Intrebari</h1>
			<Tabs.Root className={styles.TabsRoot} defaultValue={QAData[0].categoryName} orientation="vertical">

				<Tabs.List className={styles.TabsList} aria-label="categori">
					{QAData.map(({ categoryName }) => (
						<Tabs.Trigger className={styles.BorderButton} key={categoryName} value={categoryName}>{categoryName}</Tabs.Trigger>
					))}
				</Tabs.List>

				{QAData.map(({ categoryName, questions }) => (
					<Tabs.Content className={styles.TabsContent} key={categoryName} value={categoryName}>
						<QAAccordion questions={questions}/>
					</Tabs.Content>
				))}
			</Tabs.Root>
		</section>
	)
}

function QAAccordion({questions}) {
	return (
		<Accordion.Root className={styles.QAAccordion} type='single' collapsible>
			{questions.map(({ question, answer }) => (
				<Accordion.Item className={styles.QAAccordionItem} key={question} value={question}>

					<Accordion.Header className={styles.QAAccordionHeader}>
						<Accordion.Trigger className={styles.QAAccordionTrigger}>{question}</Accordion.Trigger>
					</Accordion.Header>

					<Accordion.Content className={styles.QAAccordionContent}>
						<p>{answer}</p>
					</Accordion.Content>

				</Accordion.Item>
			))}
		</Accordion.Root>
	);
}
import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import '../css/Questions.css';


export default function Questions() {

	const QAData = [{
		categoryName: 'A',
		questions: [ {
			question: 'Ce etape parcurgi când îți cumperi un apartament',
			answers: 'Două etape simple ai de parcurs pentru a achiziționa un apartament la MANDACHI TWINS: Pasul 1: Antecontractul de Vânzare-Cumpărare, care poate fi făcut la notar sau redactat de echipa noastră de juriști – presupune achitarea implicită a unui avans de minim 35% din prețul locuinței (poate fi și 100% cu discount de 4%), care  va fi dedus din costul total în momentul semnării contractului de vânzare. Pasul 2: Contractul de Vânzare-Cumpărare, pe baza căruia vei primi actul de proprietate al locuinței, când vei achita prețul întreg.'
		}, {
			question: 'Documentele de care ai nevoie pentru a cumpăra',
			answers: 'Pentru cumpărarea unei case ca persoană fizică:Pasul 1: Pentru semnarea Antecontractului de Vânzare-Cumpărare, notarul va avea nevoie de o copie după certificatul de căsătorie, dacă se impune, și de actul tău de identitate. Concomitent, iți vom pune la dispoziție planul locuinței și pe cel al locului de parcare.Pasul 3: La semnarea contractului de Vânzare-Cumpărare, îți vom pune la dispoziție o copie din Extrasul de Carte Funciară pentru autentificare, o copie a Certificatului Fiscal al vânzătorului, Certificatul de Performanță Energetică în original, Cadastrul imobilului și al locului de parcare.Dacă optezi pentru încheierea antecontractului de vânzare-cumpărare la notar, acesta îți poate solicita și alte înscrisuri necesare pentru achiziție.Când achiziția se face pe entitate juridică, documentele necesare sunt:Pasul 1: Pentru Contractul de Rezervare, vom avea nevoie de Certificatul de înmatriculare și Actul Constitutiv al companiei și de actul de identitate al reprezentantului.Pasul 2: Hotărârea Adunării Generale a Acționarilor sau Împuternicire notarială pentru reprezentant.'
		}, {
			question: 'Ce garanți îmi sunt oferite la cumpărare',
			answers: 'Garanțiile oferite de dezvoltator, în conformitate cu dispozițiile legale, sunt:Garanție pentru evicțiune, nelimitat – înseamnă protecție împotriva pretențiilor formulate de orice terță parte privind dreptul de proprietate asupra locuinței.Garanție pentru vicii ascunse ale clădirii pentru 3 ani – această garanție se referă la posibile defecte ale apartamentului care sunt descoperite într-o perioadă de 3 ani de la recepție și pe care dezvoltatorul le va remedia cu fonduri proprii.Valabilitate și garanții legate de materiale – a se vedea specificațiile și materialele care vor fi folosite.Garanție pentru structura clădirii, nelimitat – se referă la viciile în structura de rezistență a clădirii, derivate din neconcordanța cu specificațiile de design ale proiectului și cu normele de execuție.'
	}]}, {
		categoryName: 'B',
		questions: [{
			question: 'Cât vor costa apartamentele la Orso Bruno?',
			answers: 'Prețurile apartamentelor din ansamblul rezidențial Mandachi Twins sunt corecte și fair-play. Momentan, prețul apartamentelor este de 1550 euro/mp, cu TVA inclus. Atenție, suprafața terasabilă a balcoanelor se vinde separat, la jumătate de preț, deci la prețul de 775 euro/mp. Tipurile de apartamente prezentate pe site la secțiunea ”Apartamente” din meniu nu includ suprafața balconului, ci doar suprafața utilă interioară. Cu titlu de exemplu, apartamentul tip A de 50 mp nu include și suprafața balcoanelor. Daca la acest apartament, suprafața balcoanelor este de 7,35 mp, atunci la vânzare se va achita contravaloarea suprafeței de 50 mp x 1550 euro + 7,35 mp x 775 euro. Alte informații cu privire la prețuri și oferte pot fi obținute într-o întâlnire cu consultanții noștri. ATENȚIE, ținând cont de variația total imprevizibilă a prețurilor de achiziție pe piața materialelor de construcție, prețul pe metru pătrat poate crește, chiar și de la o zi la alta. Singura metodă să afli prețul actualizat este să suni direct la dezvoltator, la numărul +40 756 035 396 sau să ne scrii la adresa office@mandachitwins.ro.'
		}, {
			question: 'Se oferă discount? În ce condiți?',
			answers: 'Pentru apartamentele vândute la stadiu de proiect există o structură de discount-uri, denumită Early Twins. Discountul pentru plata integrală, anticipată a unui apartament la MANDACHI TWINS este de 4%. În funcție de apartament și de numărul de apartamente achiziționate, discountul poate crește, în anumite condiții. Poți afla mai multe detalii în cadrul unei discuții cu echipa de consultanți MANDACHI TWINS. Intră în legătură cu noi la telefon +40 756 035 396 sau pe adresa de email office@mandachitwins.ro'
		}, {
			question: 'Ce metode de finanțare se acceptă',
			answers: 'Achiziționarea apartamentelor în Mandachi Twins se poate face, în funcție de nevoile tale, prin :Plată cash. Prin cash se înțelege, evident, transfer bancar, toate tranzacțiile noastre fiind 100% fiscalizate:Finanțare directă de la dezvoltator, prin programul Twins Advantage, creat exclusiv pentru clienții MANDACHI IMOBILIARE;Credit bancar.'
	}]}, {
		categoryName: 'C',
		questions: [ {
			question: 'Cine va administra proiectul dupa receptia finală?',
			answers: 'Managementul Complexului Rezidențial va fi asigurat pentru o perioadă de cel puțin cinci ani de la recepția finală de către o companie subsidiară de administrație a Vânzătorului. Tocmai pentru a fi siguri că oferim un produs de calitate, vrem ca fiecare dintre clienții noștri să fie foarte mulțumit și să se bucure de locuința proaspăt cumpărată.'
		}, {
			question: 'Ce servicii și ce costuri de intreținere vor fi?',
			answers: 'Serviciile administrative sunt necesare pentru funcționarea și întreținerea Mandachi Twins, și anume utilități, colectarea gunoiului, curățenie, întreținere peisagistică, iluminat stradal, întreținerea lifturilor, a instalațiilor sanitare și electrice, securitate și controlul accesului, îndepărtarea zăpezii, reparații curente și altele. Costul acestor servicii va fi stabilit la momentul încheierii contractului la un preț comparabil cu media pieței pentru astfel de servicii.'
		}, {
			question: 'Cine va întreține spațiile verzi?',
			answers: 'Pentru spațiile comune exterioare care impun înterținere și o estetică fresh, compania de management responsabilă va avea grijă de întregul proces de întreținere a spațiului peisagistic, evident contra-cost.'
	}]}, {
		categoryName: 'D',
		questions: [ {
			question: 'Etape ale construcției',
			answers: 'Momentan, suntem în procesul de obținere a Autorizației de Construire, urmând ca lucrările să înceapă în scurt timp. Finalizarea lucrărilor va fi certificată prin recepția clădirilor. După faza de recepție, clădirile respective vor fi înregistrate la Oficiul de Cadastru. Vom face apoi pașii necesari pentru a pregăti documentele pentru încheierea contractelor de vânzare.'
		}, {
			question: 'Cand se va finaliza proiectul?',
			answers: 'Lucrările pentru prima fază a proiectului MANDACHI TWINS vor începe la mijlocul anului 2021, urmând ca  finalizarea construcției să fie în anul 2023, iar procesul de predare se finalizează în decembrie 2023.'
		}, {
			question: 'Se poate vinde și în rate? Dacă de, pe cați ani?',
			answers: 'Da, poți achita apartamentul și în rate, pe maxim 4 ani.'
	}]}, {
		categoryName: 'E',
		questions: [ {
			question: 'Intrarea în posesia apartamentului',
			answers: 'Prin semnarea contractului, Cumpărătorul intră în posesia apartamentului. Vânzătorul va preda în mod concret proprietatea în aceeași zi sau mai târziu, în modul agreat de către Părți, pe baza unui Document de Predare.'
		}, {
			question: 'Inspecția dinaintea predării',
			answers: 'Programăm o vizită de inspectare, în care toată locuința este verificată în cele mai mici detalii și orice problemă sesizată este înregistrată și discutată cu reprezentantul MANDACHI IMOBILIARE. Este important să verifici cheile, deschiderea ușilor și a ferestrelor, să tragi apa la toalete, să deschizi robinetele și să verifici în detaliu fiecare cameră, fiecare priză, fiecare întrerupător – lista este semnată ca parte a procesului de predare și orice problemă este înregistrată și rezolvată înainte de înmânarea cheilor.'
		}, {
			question: 'Unde parchez mașina? Locul de parcare cât costă?',
			answers: 'Locatarii ansamblului rezidențial MANDACHI TWINS au la dispoziție, 100 locuri de parcare. Din acest total, 26 de locuri de parcare sunt în parcarea subterană, în timp ce 74 locuri de parcare sunt la parcarea supraterană. Prețul unui loc variază în funcție de tipul de parcare ales, parcarea acoperită de la demisol fiind cu 2000 euro mai scumpă decât cea de la cota 0. Consultanții noștri îți pot oferi mai multe informații. Contactează-ne la +40 756 035 396 sau pe adresa de email office@mandachitwins.ro pentru a stabili o întâlnire.			'
	}]}, {
		categoryName: 'F',
		questions: [ {
			question: 'Am o infiltrație. Cine e responsabil să o repare?',
			answers: 'Toate clădirile au o garanție pentru vicii ascunse pentru 3 ani. Aceasta înseamnă că, dacă scurgerea apare în urma unei defecțiuni ascunse a instalației, trebuie să îl informezi pe administrator și reparația va fi făcută fără costuri suplimentare. Dacă scurgerea apare în urma unui lucru pe care l-ai făcut (sau nu l-ai făcut), îți oferim suportul nostru pe tot parcursul procesului la costuri minime.'
		}, {
			question: 'Sunt permise modificările exterioare?',
			answers: 'Orice schimbare care poate afecta imaginea exterioară a clădirii este strict interzisă. Fără aprobarea administrației complexului, orice schimbare a fațadelor, precum închiderea balcoanelor, montarea de aparate de ventilație sau aer condiționat într-un loc nepermis de contract, colorarea peretilor exteriori din zona apartamentului propriu sau schimbarea cromaticii tâmplăriei reprezintă un fapt generator de prejudicii, iar dezvoltatorul are dreptul să oblige pe beneficiarul-locatar să remedieze în cel mai scurt timp pe cheltuiala proprie toate modificările nepermise, sau îl poate acționa în instanță.'
		}, {
			question: 'Codul de conduită în Orso Bruno',
			answers: 'Printr-o anexă la Contractul de Rezervare / Antecontractul de Vânzare-Cumpărare se va stabili un set de reguli, care își propune să stabilească conduita generală pentru toți rezidenții, astfel încât aceștia să se bucure de bună vecinătate și de un mediu plăcut și sigur.'
		}]
	},
	];

	return (
		<>
			<h1>Intrebari</h1>
			<Tabs.Root defaultValue="B" orientation="vertical">
				{/* show a tab with all the categories */}
				<Tabs.List aria-label="categori">
					{QAData.map(({categoryName}) => (
						<Tabs.Trigger key={categoryName} value={categoryName}>{categoryName}</Tabs.Trigger>
					))}
				</Tabs.List>

				{/* for each category create an accordion */}
				{QAData.map(({categoryName, questions}) => (
					<Tabs.Content key={categoryName} value={categoryName}>
						<Accordion.Root type='single' collapsible>

							{/* fore each question inside the category */}
							{questions.map(({question, answers}) => (
								<Accordion.Item key={question} value={question}>

									<Accordion.Header>
										<Accordion.Trigger>
											{question}
											<ChevronDownIcon aria-hidden />
										</Accordion.Trigger>
									</Accordion.Header>

									<Accordion.Content>
										{answers}
									</Accordion.Content>

								</Accordion.Item>
							))}
						</Accordion.Root>
					</Tabs.Content>
				))}
			</Tabs.Root>
		</>
	)
}
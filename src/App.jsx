import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

import { useState, useEffect } from "react";


const sections = [
	{ id: "onas", label: "O nás" },
	{ id: "misto", label: "Místo" },
	{ id: "ubytovani", label: "Ubytování" },
	{ id: "formular", label: "Formulář" },
	{ id: "dresscode", label: "Dresscode" },	
	{ id: "harmonogram", label: "Harmonogram" },	
	{ id: "parkovani", label: "Parkování" },
	{ id: "fotky", label: "Fotky" },
	{ id: "dary", label: "Dary" },		
	{ id: "kontakty", label: "Kontakty" }
];

const PASSWORD_KEY = "wedding_auth";
const CORRECT_PASSWORD = "svatba25";

function AuthorizationGate({ children }) {
	const [authorized, setAuthorized] = useState(false);
	const [password, setPassword] = useState("");

useEffect(() => {
  const stored = localStorage.getItem(PASSWORD_KEY);
  const urlParams = new URLSearchParams(window.location.search);
  const urlPassword = urlParams.get("access");

  console.log("stored:", stored);
  console.log("urlPassword:", urlPassword);

  if (stored === CORRECT_PASSWORD) {
    console.log("✅ Authorized via localStorage");
    setAuthorized(true);
  } else if (urlPassword === CORRECT_PASSWORD) {
    console.log("✅ Authorized via URL param");
    localStorage.setItem(PASSWORD_KEY, CORRECT_PASSWORD);
    setAuthorized(true);
  } else {
    console.log("❌ Not authorized");
  }
}, []);

	const handleSubmit = (e) => {e.preventDefault();
	if (password === CORRECT_PASSWORD) {
		localStorage.setItem(PASSWORD_KEY, CORRECT_PASSWORD);
		setAuthorized(true);
	} else {
		alert("Nesprávné heslo.");
	}
	};

	if (authorized) 
		return children;

	return (
	<div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
	  <Card className="w-full max-w-md p-6 bg-gray-100">
		<CardContent className="space-y-4">
		  <h2 className="text-xl font-serif text-[#5A3E36]">Vítejte</h2>
		  <p>Zadejte prosím heslo pro přístup na svatební web.</p>
		  <form onSubmit={handleSubmit} className="space-y-3">
			<Input
			  type="password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  placeholder="Heslo"
			/>
			<Button type="submit">Odeslat</Button>
		  </form>
		</CardContent>
	  </Card>
	</div>
	);
}


export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
	<AuthorizationGate>
		<div
		className="min-h-screen bg-cover bg-center bg-fixed"
		style={{ backgroundImage: "url('./images/background.jpg')" }}>
	
			<div className="bg-white bg-opacity-80 min-h-screen">
				<div className="p-4 max-w-4xl mx-auto space-y-12">
				{/* Menu */}
				<nav className="sticky top-0 z-10 bg-white bg-opacity-90 shadow mb-6 mt-8 rounded-xl backdrop-blur">
				<div className="flex items-center justify-between p-4">
					<h1 className="text-xl font-serif text-[#5A3E36]">Svatba Tom & Veru</h1>
					<button
					className="md:hidden"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu">
					☰
					</button>
					<ul className="hidden md:flex gap-4">
					{sections.map((s) => (
					  <li key={s.id}>
						<a href={`#${s.id}`} className="text-sm text-[#5A3E36] hover:underline">
						  {s.label}
						</a>
					  </li>
					))}
					</ul>
				</div>
				{menuOpen && (
				  <ul className="flex flex-col items-center gap-2 pb-4 md:hidden">
					{sections.map((s) => (
					  <li key={s.id}>
						<a
						  href={`#${s.id}`}
						  onClick={() => setMenuOpen(false)}
						  className="text-sm text-[#5A3E36] hover:underline"
						>
						  {s.label}
						</a>
					  </li>
					))}
				  </ul>
				)}
				</nav>

				<section id="onas" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				  <h2 className="text-2xl font-serif text-[#5A3E36]">O nás</h2>
				  <Card className="bg-gray-200">
					<CardContent className="bg-gray-100 p-6 pt-6 rounded-xl space-y-4">
						<img
							src="./images/tom_veru.jpeg"
							alt="Tomáš a Verča"
							className="w-full max-h-[400px] object-cover object-[center_42%] rounded-xl shadow-md"
						/>
						<p>
						Jsme Tom a Veru a za posledních pět let jsme nasbírali spoustu zážitků, razítek v pase a historek, které bychom možná neměli vyprávět nahlas. Spojuje nás chuť objevovat svět i sebe navzájem a smysl pro humor, bez kterého by to s námi nešlo. Společně jsme sjeli hory na prkně, rybníky na waku, oceán na surfu a půlku světa s batohem na zádech. Teď jsme se rozhodli naskočit do dalšího dobrodružství – manželství. A jak se známe, vezmeme to s nadhledem, humorem a nejspíš i helmou. Děkujeme, že jste u toho s námi.
						</p>
					</CardContent>
				  </Card>
				</section>

				<section id="misto" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				  <h2 className="text-2xl font-serif text-[#5A3E36]">Místo konání</h2>
				  <Card className="bg-gray-200">
					<CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
					  <p>
						Svatba se koná na krásném a klidném místě s romantickou atmosférou – v <strong>Dohnalově mlýně</strong> v Zástřizlech.
						Tento mlýn obklopený přírodou je jako stvořený pro svatbu snů. 💐
					  </p>
					  <img
						src="./images/dohnaluv_mlyn.jpg"
						alt="Dohnalův mlýn"
						className="w-full rounded-xl shadow-md"
					  />
					  <div>
						<a
						  href="https://www.google.com/maps/place/Z%C3%A1st%C5%99izly+87,+768+05/@49.1616299,17.2152273,17z"
						  target="_blank"
						  className="text-blue-600 underline"
						>
						  📍 Zobrazit Dohnalův mlýn na mapě
						</a>
					  </div>
					</CardContent>
				  </Card>
				</section>
				
				<section id="ubytovani" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Ubytování</h2>
				<Card className="bg-gray-200">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
					<p>
					  V hlavní budově v Dohnalově mlýně bude k dispozici omezený počet míst pro přespání, které máme určené pro nejbližší rodinu. Prosíme ty, které jsme neinfromovali o tom, že mají zajištěné místo na spaní, aby vyplnili ve formuláři níže, o jaké ubytování máte zájem.
					Pokud chcete ušetřit a přespat zadarmo, je možné přespat na místě v Dohnalově mlýně, kde je velká louka se třemi glampingovými stany a dají se zde postavit i další. Případně je možné přijet i s karavanem nebo přespat v autě.
					Pokud máte rádi pohodlí, doporučujeme co nejdříve rezervovat ubytování v penzionech v okolí, kam vám rádi zajistíme rozvoz, kdykoliv budete chtít.
					Zde jsou ubytovací možnosti: 
						<a href="https://www.motorestsamota.cz/ubytovani/"
						  target="_blank"
						  className="text-blue-600 underline"
						>Motorest Samota</a>
						<a href="https://www.e-chalupy.cz/ubytovani-zastrizly-probuzena-chalupa-k-pronajmu-o15926#mapa"
						  target="_blank"
						  className="text-blue-600 underline"
						>Chata Zástřizly</a>
						<a href="https://www.booking.com/hotel/cz/chaticka-hanicka-u-lesa.cs.html?label=cs-cz-booking-desktop-earHHgH3FZx9dDdzrjamRwS652828999198%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9211630%3Ali%3Adec%3Adm&aid=2311236&ucfs=1&checkin=2025-09-25&checkout=2025-09-26&dest_id=0&dest_type=latlong&group_adults=2&no_rooms=1&group_children=0&nflt=oos%3D1&srpvid=b3c98b4bc66f03e9&srepoch=1748980134&matching_block_id=1263414501_398988382_2_0_0&atlas_src=sr_iw_title"
						  target="_blank"
						  className="text-blue-600 underline"
						>Chata Střílky</a>
						<a href="https://www.booking.com/hotel/cz/penzion-vila-winter.cs.html?label=cs-cz-booking-desktop-earHHgH3FZx9dDdzrjamRwS652828999198%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9211630%3Ali%3Adec%3Adm&aid=2311236&ucfs=1&checkin=2025-09-25&checkout=2025-09-26&dest_id=0&dest_type=latlong&group_adults=2&no_rooms=1&group_children=0&nflt=oos%3D1&srpvid=b3c98b4bc66f03e9&srepoch=1748980191&matching_block_id=751965801_412284979_2_0_0&atlas_src=sr_iw_title"
						  target="_blank"
						  className="text-blue-600 underline"
						>Penzion Vila Winter</a>
						<a href="https://pension-buchlovsky-dvur.penzion.cz/?gad_source=1&gad_campaignid=872974319&gbraid=0AAAAADMHvSJzuUgzIo4y-G2qkyZutXgAr&gclid=Cj0KCQjwuvrBBhDcARIsAKRrkjdo8_tOPiH2kUJnBQ8bk9HkbaHue2Y2ALPEU0PNYPyC61rR_lmEsSQaAnetEALw_wcB"
						  target="_blank"
						  className="text-blue-600 underline"
						>Penzion Buchlovský dvůr</a>
						Více na: e-chalupy.cz, booking.com, airbnb.cz
					</p>
					<img
						src="./images//ubytko.jpg"
						alt="Ubytování"
						className="rounded-xl w-full object-cover max-h-[400px]"
					/>
				  </CardContent>
				</Card>
				</section>
				
				<section id="formular" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				  <h2 className="text-2xl font-serif text-[#5A3E36]">Potvrď svou účast</h2>
				  <Card className="bg-gray-200">
					<CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
					  <p>
						Prosíme o vyplnění formuláře – abychom věděli, s kým máme počítat a co připravit.
						Zvládnete to za minutku. ❤
					  </p>
					  <p>
						Otevřete si jej přímo zde:&nbsp;
						<a
						  href="https://tally.so/r/wAGQNy"
						  target="_blank"
						  rel="noopener noreferrer"
						  className="text-blue-600 underline"
						>
						  formulář k potvrzení účasti
						</a>
					  </p>
					</CardContent>
				  </Card>
				</section>

				
				<section id="dresscode" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Dresscode</h2>
				<Card className="bg-gray-200">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
					<p>
					  Naše svatba se ponese v duchu lehké elegance a pohodové atmosféry. Prosíme vás proto
					  o světlé barvy v casual stylu. Dámy mohou sáhnout po jemných pastelových tónech, třeba
					  mintové, pudrové nebo krémové – šaty, sukně či elegantní kalhoty jsou vítané.
					</p>
					<p>
					  Pánům bude slušet světlá košile, krémové nebo béžové kalhoty, klidně i vestička nebo
					  sako. Kravata není nutností – důležitá je pohoda a úsměv 😊
					</p>
					<div className="flex flex-wrap justify-center items-center gap-4 mt-4">
						<div className="w-14 h-14 rounded-full bg-[#bda8c2]" title="fialová" />
						<div className="w-14 h-14 rounded-full bg-[#bfc9a3]" title="světle zelená" />
						<div className="w-14 h-14 rounded-full bg-[#53774b]" title="tmavě zelená" />
						<div className="w-14 h-14 rounded-full bg-[#d68a1e]" title="hořčicová" />
						<div className="w-14 h-14 rounded-full bg-[#e1b521]" title="žlutá" />
						<div className="w-14 h-14 rounded-full bg-[#e2c6a3]" title="béžová" />
					</div>
				  </CardContent>
				</Card>
				</section>

				<section id="harmonogram" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Harmonogram dne</h2>
				<Card className="bg-gray-200">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
					<ul className="list-disc list-inside space-y-1">
					  <li><strong>11:00</strong> – Příjezd hostů, vítání, welcome drink</li>
					  <li><strong>12:00</strong> – Obřad pod širým nebem</li>
					  <li><strong>13:00</strong> – Společné focení a oběd</li>
					  <li><strong>Odpoledne</strong> – Volná zábava, káva, dort, chill zóna</li>
					  <li><strong>16:30</strong> – Raut plný dobrot</li>
					  <li><strong>19:00</strong> – První svatební tanec</li>
					  <li><strong>Večer</strong> – Párty a radovánky až do ranních hodin 🎉</li>
					</ul>
				  </CardContent>
				</Card>
				</section>
				
				<section id="parkovani" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Parkování</h2>
				<Card className="bg-gray-200">
					<CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
					  <p>
						Před areálem Dohnalova mlýna můžete pohodlně zaparkovat přímo u cesty. K dispozici je také rozlehlá louka, kde je dostatek místa pro auta všech hostů – a to bez nutnosti dlouhého hledání parkovacího místa.
					  </p>
					  <img
						src="./images/parkovani.jpg"
						alt="Parkování u Dohnalova mlýna"
						className="rounded-xl w-full object-cover max-h-[400px]"
					  />
					</CardContent>
				</Card>
				</section>
				
				<section id="fotky" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Sdílej fotky z našeho dne</h2>
					<Card className="bg-gray-200">
						<CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
							<p>
							Fotky od fotografa budou krásné, ale ty nejúžasnější momentky často vznikají z rukou vás – našich hostů. Sdílet můžete nejen fotky, ale i videa. Na oplátku se s vámi rádi podělíme o ty oficiální.
							<br/>
							Stačí použít <a href="https://drive.google.com/drive/folders/1x46_RCJCCX0LizBKDRZHFJRvwVXvZdjA?usp=sharing" target="_blank" className="text-blue-600 underline"> tento odkaz na náš sdílený Google Disk</a>.
							</p>
						</CardContent>
					</Card>
				</section>

				<section id="dary" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Dary</h2>
				<Card className="bg-gray-200">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
					<p>
					  Největším darem pro nás je vaše přítomnost a to, že s námi prožijete tento den.
					</p>
					<p>
					  Pokud byste nás přesto chtěli obdarovat, potěší nás finanční příspěvek na svatební cestu, nebo na něco krásného do našeho společného domova.
					</p>
					<p>
					  Děkujeme, že jste součástí našeho příběhu 💕
					</p>
				  </CardContent>
				</Card>
				</section>

				<section id="kontakty" className="scroll-mt-24 p-6 bg-gray-200 max-w-md mx-auto rounded-xl space-y-4">
					<h2 className="text-2xl font-serif text-[#5A3E36]">Kontakty</h2>
					<Card className="bg-gray-200">
						<CardContent className="p-6 space-y-4 pt-6 bg-gray-200 rounded-xl">
							<p>Máte otázku, něco vám není jasné, nebo jste něco nenašli na webu či ve formuláři?</p>
							<p>Ozvěte se nám kdykoliv:</p>
							<ul className="list-disc list-inside">
							  <li><strong>Tomáš</strong>: <a href="tel:+420724963979" className="text-blue-600 underline">+420 724 963 979</a></li>
							  <li><strong>Veru</strong>: <a href="tel:+420776026838" className="text-blue-600 underline">+420 776 026 838</a></li>
							</ul>
						</CardContent>
					</Card>
				</section>
				</div>
			</div>
		</div>  
	</AuthorizationGate>  
  );
}

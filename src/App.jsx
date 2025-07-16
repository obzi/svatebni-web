import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Inspirace from "./Inspirace";
import { Link } from 'react-router-dom';


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
		  <h2 className="text-xl font-serif text-emeraldDeep">Vítejte</h2>
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
	<Routes>
      <Route
        path="/*"
        element={
          <>
			<AuthorizationGate>
				<div
				className="min-h-screen bg-cover bg-center bg-fixed"
				style={{ backgroundImage: "url('./images/background.jpg')" }}>
			
					<div className="bg-white bg-opacity-80 min-h-screen">
						<div className="p-4 max-w-4xl mx-auto space-y-12">
						
						{/* Menu */}
						<nav className="sticky top-0 z-10 bg-sage-medium bg-opacity-90 shadow mb-6 mt-8 rounded-xl backdrop-blur">
						  <div className="flex items-center justify-between p-4">
							<div className="flex flex-col items-start">
							  <span className="text-xl font-serif text-emeraldDeep leading-tight">Svatba</span>
							  <span className="text-xl font-serif text-emeraldDeep leading-tight">Tom & Veru</span>
							</div>
							<button
							  className="md:hidden focus:outline-none"
							  onClick={() => setMenuOpen(!menuOpen)}
							  aria-label="Toggle menu">
							  ☰
							</button>
							<ul className="hidden md:flex gap-4">
							  {sections.map((s) => (
								<li key={s.id}>
								<a
								  href={`#${s.id}`}
								  onClick={e => {
									e.preventDefault();
									const el = document.getElementById(s.id);
									if (el) {
									  el.scrollIntoView({ behavior: "smooth" });
									  history.replaceState(null, '', `#${s.id}`); // aktualizuj hash v URL
									}
									setMenuOpen(false);
								  }}
								  className="text-sm text-emeraldDeep hover:underline"
								>
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
									  onClick={e => {
										e.preventDefault();
										setMenuOpen(false);
										setTimeout(() => {
										  const el = document.getElementById(s.id);
										  if (el) {
											el.scrollIntoView({ behavior: "smooth", block: "start" });
											history.replaceState(null, '', `#${s.id}`);
										  }
										}, 200);
									  }}
									  className="text-sm text-emeraldDeep hover:underline"
									>
									  {s.label}
									</a>
								  </li>
								))}
							  </ul>
							)}
						</nav>


						<section id="onas" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						  <h2 className="text-2xl font-serif text-emeraldDeep">O nás</h2>
							<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
								<img
									src="./images/tom_veru.jpg"
									alt="Tomáš a Verča"
									className="w-full max-h-[400px] object-cover object-[center_14%] rounded-xl shadow-md"
								/>
								<p>
								Jsme Tom a Veru a za posledních pět let jsme nasbírali spoustu zážitků, razítek v pase a historek, které bychom možná neměli vyprávět nahlas. Spojuje nás chuť objevovat svět i sebe navzájem a smysl pro humor, bez kterého by to s námi nešlo. Společně jsme sjeli hory na prkně, rybníky na waku, oceán na surfu a půlku světa s batohem na zádech. Teď jsme se rozhodli naskočit do dalšího dobrodružství – manželství. A jak se známe, vezmeme to s nadhledem, humorem a nejspíš i helmou. Děkujeme, že jste u toho s námi.
								</p>
							</div>
						</section>

						<section id="misto" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						  <h2 className="text-2xl font-serif text-emeraldDeep">Místo a datum konání</h2>
						  <div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							  <p>
								Svatba se koná ve čtvrtek 25. 9. 2025 na krásném a klidném místě s romantickou atmosférou v <strong>Dohnalově mlýně</strong> v Zástřizlech.
								Tento mlýn obklopený přírodou je jako stvořený pro svatbu snů. 💐
							  </p>
							  <img
								src="./images/dohnaluv_mlyn.jpg"
								alt="Dohnalův mlýn"
								className="w-full rounded-xl shadow-md" 
								/>
							  <div>
								<a href="https://www.google.com/maps/place/Z%C3%A1st%C5%99izly+87,+768+05/@49.1616299,17.2152273,17z"
								  target="_blank"
								  className="text-blue-600 underline">
								  📍 Dohnalův mlýn na mapě
								</a>
							  </div>
						  </div>
						</section>
						
						<section id="ubytovani" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
							<h2 className="text-2xl font-serif text-emeraldDeep">Ubytování</h2>
							<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
								<p>
								  V hlavní budově v Dohnalově mlýně bude k dispozici omezený počet míst pro přespání, které máme určené pro nejbližší rodinu. Prosíme ty, které jsme neinfromovali o tom, že mají zajištěné místo na spaní, aby vyplnili ve formuláři níže, o jaké ubytování máte zájem.
								<br/>Pokud chcete ušetřit a přespat zadarmo, je možné přespat na místě v Dohnalově mlýně, kde je velká louka se třemi glampingovými stany a dají se zde postavit i další. Případně je možné přijet i s karavanem nebo přespat v autě.
								<br/>Pokud máte rádi pohodlí, doporučujeme co nejdříve rezervovat ubytování v penzionech v okolí, kam vám rádi zajistíme rozvoz, kdykoliv budete chtít.<br/>
								Zde jsou ubytovací možnosti:<br/>
									<a href="https://www.motorestsamota.cz/ubytovani/"
									  target="_blank"
									  className="text-blue-600 underline"
									>Motorest Samota</a>
									<br/>
									<a href="https://www.e-chalupy.cz/ubytovani-zastrizly-probuzena-chalupa-k-pronajmu-o15926#mapa"
									  target="_blank"
									  className="text-blue-600 underline"
									>Chata Zástřizly</a>
									<br/>
									<a href="https://www.booking.com/hotel/cz/chaticka-hanicka-u-lesa.cs.html?label=cs-cz-booking-desktop-earHHgH3FZx9dDdzrjamRwS652828999198%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9211630%3Ali%3Adec%3Adm&aid=2311236&ucfs=1&checkin=2025-09-25&checkout=2025-09-26&dest_id=0&dest_type=latlong&group_adults=2&no_rooms=1&group_children=0&nflt=oos%3D1&srpvid=b3c98b4bc66f03e9&srepoch=1748980134&matching_block_id=1263414501_398988382_2_0_0&atlas_src=sr_iw_title"
									  target="_blank"
									  className="text-blue-600 underline"
									>Chata Střílky</a>
									<br/>
									<a href="https://www.booking.com/hotel/cz/penzion-vila-winter.cs.html?label=cs-cz-booking-desktop-earHHgH3FZx9dDdzrjamRwS652828999198%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9211630%3Ali%3Adec%3Adm&aid=2311236&ucfs=1&checkin=2025-09-25&checkout=2025-09-26&dest_id=0&dest_type=latlong&group_adults=2&no_rooms=1&group_children=0&nflt=oos%3D1&srpvid=b3c98b4bc66f03e9&srepoch=1748980191&matching_block_id=751965801_412284979_2_0_0&atlas_src=sr_iw_title"
									  target="_blank"
									  className="text-blue-600 underline"
									>Penzion Vila Winter</a>
									<br/>
									<a href="https://pension-buchlovsky-dvur.penzion.cz/?gad_source=1&gad_campaignid=872974319&gbraid=0AAAAADMHvSJzuUgzIo4y-G2qkyZutXgAr&gclid=Cj0KCQjwuvrBBhDcARIsAKRrkjdo8_tOPiH2kUJnBQ8bk9HkbaHue2Y2ALPEU0PNYPyC61rR_lmEsSQaAnetEALw_wcB"
									  target="_blank"
									  className="text-blue-600 underline"
									>Penzion Buchlovský dvůr</a>
									<br/>
									Více na: e-chalupy.cz, booking.com, airbnb.cz
								</p>
								<img
									src="./images//ubytko.jpg"
									alt="Ubytování"
									className="rounded-xl w-full object-cover max-h-[400px]"
								/>
							</div>
						</section>
						
						<section id="formular" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
							<h2 className="text-2xl font-serif text-emeraldDeep">Vyplň formulář a potvrď svou účast</h2>
							<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							  <p>
								Prosíme o vyplnění formuláře, abychom věděli, s kým máme počítat a co připravit.
								Zvládnete to za minutku. ❤
							  </p>
							  <p>
								<span className="hidden sm:inline">Otevřete si jej přímo zde: </span>
								<span className="sm:hidden">Otevřete si jej přímo zde:<br /></span>
								<a href="https://tally.so/r/wAGQNy" 
									target="_blank"
									rel="noopener noreferrer" 
									className="underline text-blue-700">Formulář k potvrzení účasti</a>.
							  </p>
						  </div>
						</section>
						
						<section id="dresscode" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Dresscode</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<p>
								Naše svatba se ponese v duchu lehké elegance a pohodové atmosféry. Pokud budete chtít sladit svůj outfit s celkovým laděním dne, budeme moc rádi.
								Líbí se nám jemné, přírodní a zemité tóny. Styl spíše neformální, ale stále lehce elegantní.
							</p>
							<p>
								Dámy mohou sáhnout po šatech, sukni nebo elegantních kalhotách v odstínech šalvějově zelené, sytější smaragdové nebo krémové.
							</p>
							<p>
								Pánům bude slušet světlá košile, může být i v zelených tónech. Kalhoty v béžové, hnědé nebo černé, případně doplněné vestičkou či sakem. Kravata není nutná, hlavní je pohodlí, úsměv a dobrá nálada.😊
							</p>

							{/* DESKTOP VARIANTA */}
							<div className="hidden md:flex flex-row justify-center gap-6 mt-4 p-4 rounded-xl bg-white shadow">
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-sage-medium mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">světle šalvějová</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-sage-green mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">šalvějová</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-viridian mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">smaragdová</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-almond mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">mandlová</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-lightbrown mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">světle béžová</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-goldenbrown mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">tmavě béžová</span>
							  </div>
							</div>

							{/* MOBIL VARIANTA */}
							<div className="block md:hidden">
							  <div className="bg-white rounded-xl shadow mx-auto max-w-md p-4">
								<div className="grid grid-cols-3 gap-x-5 gap-y-3 justify-items-center">
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-sage-medium mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">světle šalvějová</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-sage-green mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">šalvějová</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-viridian mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">smaragdová</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-almond mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">mandlová</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-lightbrown mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">světle béžová</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-goldenbrown mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">tmavě béžová</span>
								  </div>
								</div>
							  </div>
							</div>

						<a href="#/inspirace" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
						  Zde inspirace
						</a>

						</div>
						</section>

						<section id="harmonogram" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Harmonogram dne</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<ul className="list-disc list-inside space-y-1">
							  <li><strong>11:00</strong> – Přivítání hostů</li>
							  <li><strong>12:00</strong> – Svatební obřad</li>
							  <li><strong>13:00</strong> – Oběd</li>
							  <li><strong>14:00</strong> – Focení s novomanželi</li>
							  <li><strong>15:00</strong> – Odpolední káva, svatební hry</li>
							  <li><strong>17:00</strong> – Raut plný dobrot</li>
							  <li><strong>19:00</strong> – První, druhý a třetí tanec</li>
							  <li><strong>20:00</strong> – Taneční soutěž</li>
							  <li><strong>21:00</strong> – Párty a radovánky až do ranních hodin 🎉</li>
							</ul>
						</div>
						</section>
						
						<section id="parkovani" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Parkování</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
						  <p>
							Před areálem Dohnalova mlýna můžete pohodlně zaparkovat přímo u cesty. K dispozici je také rozlehlá louka, kde je dostatek místa pro auta všech hostů.
						  </p>
						  <img
							src="./images/parkovani.jpg"
							alt="Parkování u Dohnalova mlýna"
							className="rounded-xl w-full object-cover max-h-[400px]"
						  />
						</div>
						</section>
						
						<section id="fotky" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Sdílej fotky z našeho dne</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<p>
							Fotky od fotografa budou krásné, ale ty nejúžasnější momentky často vznikají z rukou vás, našich hostů. Sdílet můžete nejen fotky, ale i videa. Na oplátku se s vámi rádi podělíme o ty oficiální.
							<br/>
							Stačí použít <a href="https://drive.google.com/drive/folders/1x46_RCJCCX0LizBKDRZHFJRvwVXvZdjA?usp=sharing" target="_blank" className="text-blue-600 underline"> tento odkaz na náš sdílený Google Disk</a>.
							</p>
						</div>
						</section>

						<section id="dary" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Dary</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<p>
							  Největším darem pro nás je vaše přítomnost a to, že s námi prožijete tento den.
							</p>
							<p>
							  Pokud byste nás přesto chtěli obdarovat, potěší nás finanční příspěvek do domácnosti, nebo na naší svatební cestu.
							</p>
							<p>
							  Děkujeme, že jste součástí našeho příběhu 💕
							</p>
						</div>
						</section>

						<section id="kontakty" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Kontakty</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<p>Máte otázku, něco vám není jasné, nebo jste něco nenašli na webu či ve formuláři?</p>
							<p>Ozvěte se nám kdykoliv:</p>
							<div className="space-y-2 mt-2">
								<div className="flex flex-row items-center">
									<span className="font-semibold w-24">Tomáš:</span>
									<a href="tel:+420724963979" className="underline text-blue-700 whitespace-nowrap">+420 724 963 979</a>
								</div>
								<div className="flex flex-row items-center">
									<span className="font-semibold w-24">Veru:</span>
									<a href="tel:+420776026838" className="underline text-blue-700 whitespace-nowrap">+420 776 026 838</a>
								</div>
							</div>
						</div>
						</section>
						</div>
					</div>
				</div>  
			</AuthorizationGate>  
          </>
        }
      />
      <Route path="/inspirace" element={<Inspirace />} />
    </Routes>
  );
}

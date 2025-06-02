import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

import { useState, useEffect } from "react";


const sections = [
	{ id: "onas", label: "O nás" },
	{ id: "misto", label: "Místo" },
	{ id: "harmonogram", label: "Harmonogram" },
	{ id: "dresscode", label: "Dresscode" },
	{ id: "ubytovani", label: "Ubytování" },
	{ id: "dary", label: "Dary" },
	{ id: "formular", label: "Formulář" },
	{ id: "fotky", label: "Fotky" },
	{ id: "kontakty", label: "Kontakty" }
];

const PASSWORD_KEY = "wedding_auth";
const CORRECT_PASSWORD = "kravicka31";

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
					<h1 className="text-xl font-serif text-[#5A3E36]">Verča & Tomáš</h1>
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

				<section id="onas" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				  <h2 className="text-2xl font-serif text-[#5A3E36]">O nás</h2>
				  <Card className="bg-gray-100">
					<CardContent className="bg-gray-100 p-6 pt-6 rounded-xl space-y-4">
						<img
							src="./images/tom_veru.jpeg"
							alt="Tomáš a Verča"
							className="w-full max-h-[400px] object-cover object-[center_42%] rounded-xl shadow-md"
						/>
						<p>
						Jsme Verča a Tomáš – dva lidé, kteří se rozhodli spojit své cesty životem. Naše svatba bude oslavou nejen naší lásky, ale i všech krásných momentů, které jsme zažili a které nás ještě čekají. Děkujeme, že v tento den budete s námi. ❤️
						</p>
					</CardContent>
				  </Card>
				</section>

				<section id="misto" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				  <h2 className="text-2xl font-serif text-[#5A3E36]">Místo konání</h2>
				  <Card className="bg-gray-100">
					<CardContent className="p-6 space-y-4 pt-6 bg-gray-100 rounded-xl">
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

				<section id="harmonogram" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Harmonogram dne</h2>
				<Card className="bg-gray-100">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-100 rounded-xl">
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

				<section id="dresscode" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Dresscode</h2>
				<Card className="bg-gray-100">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-100 rounded-xl">
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

				<section id="ubytovani" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Ubytování</h2>
				<Card className="bg-gray-100">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-100 rounded-xl">
					<p>
					  V Dohnalově mlýně bude k dispozici omezený počet míst pro přespání. Pokud máte zájem o ubytování, uveďte to prosím ve formuláři níže. 
					  <br/>
					  Případně si můžete zajistit vlastní ubytování v okolí – rádi doporučíme.
					</p>
					<img
						src="./images//ubytko.jpg"
						alt="Ubytování"
						className="rounded-xl w-full object-cover max-h-[400px]"
					/>
				  </CardContent>
				</Card>
				</section>

				<section id="dary" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Dary</h2>
				<Card className="bg-gray-100">
				  <CardContent className="p-6 space-y-4 pt-6 bg-gray-100 rounded-xl">
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

				<section id="formular" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				  <h2 className="text-2xl font-serif text-[#5A3E36]">Potvrď svou účast</h2>
				  <Card className="bg-gray-100">
					<CardContent className="p-6 bg-gray-100 rounded-xl space-y-4">
					  <p>
						Prosíme o vyplnění formuláře – abychom věděli, s kým máme počítat a co připravit.
						Zvládnete to za minutku. ❤️
					  </p>

					  <iframe
						src="https://tally.so/r/wAGQNy?transparentBackground=1"
						width="100%"
						height="250"
						frameBorder="0"
						marginHeight="0"
						marginWidth="0"
						title="Svatební formulář"
						loading="lazy"
						allowFullScreen
						className="rounded-xl"
					  ></iframe>

					  <p>
						Nebo si jej otevřete přímo&nbsp;
						<a
						  href="https://tally.so/r/wAGQNy"
						  target="_blank"
						  rel="noopener noreferrer"
						  className="text-blue-600 underline"
						>
						  v novém okně
						</a>.
					  </p>
					</CardContent>
				  </Card>
				</section>

				<section id="fotky" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
				<h2 className="text-2xl font-serif text-[#5A3E36]">Sdílej fotky z našeho dne</h2>
					<Card className="bg-gray-100">
						<CardContent className="p-6 space-y-4 pt-6 bg-gray-100 rounded-xl">
							<p>
							Fotky od fotografa budou krásné, ale ty nejúžasnější momentky často vznikají z rukou vás – našich hostů. Sdílet můžete nejen fotky, ale i videa. Na oplátku se s vámi rádi podělíme o ty oficiální.
							<br/>
							Stačí použít <a href="https://drive.google.com/drive/folders/1x46_RCJCCX0LizBKDRZHFJRvwVXvZdjA?usp=sharing" target="_blank" className="text-blue-600 underline"> tento odkaz na náš sdílený Google Disk</a>.
							</p>
						</CardContent>
					</Card>
				</section>

				<section id="kontakty" className="scroll-mt-24 p-6 bg-gray-100 rounded-xl space-y-4">
					<h2 className="text-2xl font-serif text-[#5A3E36]">Kontakty</h2>
					<Card className="bg-gray-100">
						<CardContent className="p-6 space-y-4 pt-6 bg-gray-100 rounded-xl">
							<p>Máte otázku, něco vám není jasné, nebo jste něco nenašli na webu či ve formuláři?</p>
							<p>Ozvěte se nám kdykoliv:</p>
							<ul className="list-disc list-inside">
							  <li><strong>Tomáš</strong>: <a href="tel:+420724963979" className="text-blue-600 underline">+420 724 963 979</a></li>
							  <li><strong>Verča</strong>: <a href="tel:+420776026838" className="text-blue-600 underline">+420 776 026 838</a></li>
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

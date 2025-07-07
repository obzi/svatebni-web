import React from "react";

const damy = [
  { src: "/images/damy1.png", alt: "Dáma 1" },
  { src: "/images/damy2.png", alt: "Dáma 2" },
  { src: "/images/damy3.png", alt: "Dáma 3" },
];
const panove = [
  { src: "/images/panove1.jpg", alt: "Pán 1", objectPos: "object-top" },
  { src: "/images/panove2.jpg", alt: "Pán 2", objectPos: "object-top" },
  { src: "/images/panove3.jpg", alt: "Pán 3", objectPos: "object-top" },
];

export default function Inspirace() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10">
      <h1 className="text-2xl font-bold mb-4">Inspirace Dresscode</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md w-full mb-8">
        {damy.map((dama, i) => (
          <React.Fragment key={i}>
            {/* Dámy vlevo */}
            <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={dama.src}
                alt={dama.alt}
                className="object-cover w-full h-full object-top"
                loading="lazy"
              />
            </div>
            {/* Páni vpravo */}
            <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={panove[i].src}
                alt={panove[i].alt}
                className={`object-cover w-full h-full ${panove[i].objectPos}`}
                loading="lazy"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <button
        className="mt-8 px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-800 transition"
        onClick={() => window.close()}
      >
        Zpět na svatební web
      </button>
    </div>
  );
}

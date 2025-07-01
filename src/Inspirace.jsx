import React from "react";

export default function Inspirace() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10">
      <h1 className="text-2xl font-bold mb-4">Inspirace Dresscode</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md w-full mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-lg">
            Fotka {i + 1}
          </div>
        ))}
      </div>
		<button
		  className="mt-8 px-6 py-2 rounded-xl bg-emeraldDeep text-white font-semibold shadow hover:bg-emerald-800 transition"
		  onClick={() => window.close()}
		>
		  Zpět na svatební web
		</button>

    </div>
  );
}

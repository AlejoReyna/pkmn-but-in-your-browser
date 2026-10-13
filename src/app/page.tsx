"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/lang-context";

const GameBoyPlayer = dynamic(() => import("@/components/v2/gameboy-player"), { ssr: false });

const COPY = {
  es: {
    title: "Pokémon Gold en tu navegador",
    blurb: "El motor Game Boy original aislado de monSite. Necesitas tu propio ROM (no incluido).",
    play: "Jugar",
    missing: "Falta public/games/pokemon-gold.gbc — consulta public/games/README.md.",
  },
  en: {
    title: "Pokémon Gold in your browser",
    blurb: "The original Game Boy engine isolated from monSite. You need your own ROM (not included).",
    play: "Play",
    missing: "Missing public/games/pokemon-gold.gbc — see public/games/README.md.",
  },
} as const;

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const copy = COPY[language];
  const [playing, setPlaying] = useState(false);

  if (playing) return <GameBoyPlayer onExit={() => setPlaying(false)} />;

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#18191d",
        color: "#e6e2d5",
        fontFamily: "monospace",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <h1 style={{ fontWeight: 400, fontSize: 24 }}>{copy.title}</h1>
        <p style={{ color: "#b4b3b6", fontSize: 13, lineHeight: 1.8 }}>{copy.blurb}</p>
        <p style={{ color: "#8a8a8a", fontSize: 11, lineHeight: 1.8 }}>{copy.missing}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            style={{
              font: "inherit",
              fontSize: 14,
              padding: "12px 28px",
              background: "#292a30",
              color: "#e3c477",
              border: "2px solid #e3c477",
              cursor: "pointer",
            }}
          >
            {copy.play} ▸
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          {(["en", "es"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              aria-pressed={language === lang}
              style={{
                font: "inherit",
                fontSize: 11,
                padding: "6px 12px",
                background: language === lang ? "#3b3b3e" : "transparent",
                color: "#e6e2d5",
                border: "1px solid #59595e",
                cursor: "pointer",
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

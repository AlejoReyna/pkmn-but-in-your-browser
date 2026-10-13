# pkmn-but-in-your-browser

Game Boy Color Pokémon Gold in the browser, isolated from
[monSite](https://github.com/AlejoReyna/monSite) without removing it there.

> Note: despite the request wording, this is a **Game Boy Color**
> (`.gbc`, Gambatte core) setup — not Game Boy Advance. The engine,
> saves, and tests are all GBC-specific.

Standalone Next.js app: the original React player runs at `/` (no
static export, no extra demo page). The original Next.js/React source is
preserved under `src/` — `src/app/` is new and minimal (launch screen +
`GameBoyPlayer`), everything else is verbatim from monSite.

## What is included

Verbatim isolation from monSite (nothing deleted there):

- `public/gameboy/frame.html` — internal engine surface (iframe)
- `public/gameboy/bridge.js` — EmulatorJS adapter (documented `EJS_*`
  options + native UI actions only; no `EJS_emulator`/WASM internals)
- `public/gameboy/cartridge.js` — IDBFS SRAM + separate RTC backup codec
- `public/emulatorjs/4.2.3/` — official unmodified precompiled
  EmulatorJS + Gambatte cores, `manifest.json` hashes, licenses
- `public/Minecraft.ttf` — pixel font used by the player UI
- `src/lib/gameboy/` — `save.ts`, `library.ts`, `preload.ts`,
  `presentation.ts` (backup validation, game list, HTTP preload,
  casing + fullscreen helpers)
- `src/lib/terminal/konami.ts` — Konami sequence helper
- `src/components/v2/` — original `gameboy-player.tsx`,
  `konami-challenge.tsx`, `terminal-close-easter-egg.tsx` + CSS modules
- `scripts/test-gameboy.mjs`, `scripts/test-konami.mjs` — adapter/static
  checks (run with a bounded Node heap, one at a time)
- `docs/pokemon-gold-easter-egg.md` — original behavior/spec note

New in this repo:

- `public/index.html` — minimal vanilla-JS host (iframe + toolbar +
  touch controls + import/export + fullscreen). No Next.js, no build.
- `public/games/` — intentionally empty; add your own ROM here
  (gitignored, see `public/games/README.md`).
- `package.json`, `.gitignore`, this README.

## What is NOT included

`public/games/pokemon-gold.gbc` (2,097,152 bytes, SHA-256
`fb0016d27b…7e4e`) stays only in monSite and is **not** committed here.
ROMs are copyrighted Nintendo data. Supply your own legally-dumped
image at `public/games/pokemon-gold.gbc` (see `public/games/README.md`).

## Run it (Next.js)

```bash
npm install
npm run dev -- --allow-server  # deliberate local startup; http://localhost:3000
```

`npm run dev` without `--allow-server` exits without starting anything
(same guard as monSite — this 8 GB Mac has experienced system freezes).
Local dev uses Webpack with a 1536 MiB Node old-space limit. Other
scripts: `npm run build` → `npm start`.

Controls: Arrows · X: A · Z: B · Enter: Start · Shift: Select ·
Esc: pause. Use SAVE inside Pokémon Gold; the cartridge (32 KiB SRAM +
8-byte RTC) flushes every 15 s and on hide/exit into IndexedDB
(`/data/saves`, v21, `FILE_DATA`) plus a `localStorage` mirror.

## Verify

One process at a time, bounded heap:

```bash
NODE_OPTIONS=--max-old-space-size=512 node --test scripts/test-konami.mjs
NODE_OPTIONS=--max-old-space-size=512 node --test scripts/test-gameboy.mjs
```

`test-gameboy.mjs` skips only the byte-identical ROM check when
`public/games/pokemon-gold.gbc` is absent (expected here); with your own
dump in place it validates size, SHA-256, MBC3+RTC header, and checksum.
Vendor files are always hash-checked against
`public/emulatorjs/4.2.3/manifest.json`.

## Licenses

- EmulatorJS 4.2.3: GPL-3.0 (`public/emulatorjs/4.2.3/licenses/`)
- Gambatte core bundle: GPL-2.0 (source:
  https://github.com/EmulatorJS/gambatte-libretro)
- RetroArch frontend: GPL-3.0
- 7z extractor: 7-Zip licensing
- Original Gambatte license preserved verbatim in
  `public/emulatorjs/4.2.3/licenses/Gambatte-bundled-license.txt`

ROM licensing is separate from these emulator licenses. This repo's own
host/player glue follows the monSite source it was copied from.

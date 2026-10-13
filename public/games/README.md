# games/

Place your own legally-dumped Game Boy Color ROM here.

This folder is intentionally empty in git. `*.gb`, `*.gbc`, `*.gba`
files are ignored (see root `.gitignore`) because game ROMs are
copyrighted data, not code.

The default engine expects:

```
public/games/pokemon-gold.gbc
```

That file must be a 2,097,152-byte Pokémon Gold (MBC3+timer+battery,
32 KiB SRAM) image whose SHA-256 is:

```
fb0016d27b1e5374e1ec9fcad60e6628d8646103b5313ca683417f52b97e7e4e
```

The standalone demo (`public/index.html`) and `public/gameboy/bridge.js`
both request `/games/pokemon-gold.gbc`. If you use a different ROM,
update `window.EJS_gameUrl` in your own copy of the bridge config and
the backup validator in `src/lib/gameboy/save.ts` /
`public/gameboy/cartridge.js`.

Do not commit ROMs to a public repository.

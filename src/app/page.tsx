"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const GameBoyPlayer = dynamic(() => import("@/components/v2/gameboy-player"), { ssr: false });

// The player boots into its own game library, so no launch screen is needed.
// Exiting remounts a fresh player (back to the library); the engine iframe
// is destroyed with the old instance. Language comes from the provider.
export default function Home() {
  const [session, setSession] = useState(0);
  return <GameBoyPlayer key={session} onExit={() => setSession((value) => value + 1)} />;
}

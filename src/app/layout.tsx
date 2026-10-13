import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/lang-context";

export const metadata = {
  title: "Pokémon Gold in your browser",
  description: "Game Boy Color Pokémon Gold playable in the browser (EmulatorJS/Gambatte). Bring your own ROM.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#18191d" }}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

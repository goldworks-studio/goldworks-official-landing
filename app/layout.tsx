import type { Metadata } from "next";
import { Syne, Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rawBasePath = process.env.PAGES_BASE_PATH?.trim() ?? "";
const metadataBasePath =
  rawBasePath && rawBasePath !== "/"
    ? rawBasePath.startsWith("/")
      ? rawBasePath.replace(/\/+$/, "")
      : `/${rawBasePath.replace(/\/+$/, "")}`
    : "";

const withBasePath = (assetPath: string) => `${metadataBasePath}${assetPath}`;

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldworks.net"),
  title: {
    default: "GoldWorks — Independent Game Studio",
    template: "%s | GoldWorks",
  },
  description:
    "GoldWorks is an independent game studio turning bright ideas into experiences worth coming back to. Crafting play. Making it matter.",
  alternates: { canonical: `${metadataBasePath}/` },
  openGraph: {
    title: "GoldWorks — Independent Game Studio",
    description:
      "An independent game studio turning bright ideas into experiences worth coming back to. Crafting play. Making it matter.",
    url: `${metadataBasePath}/`,
    siteName: "GoldWorks",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: withBasePath("/goldworks-favicon-32x32.png"),
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: withBasePath("/goldworks-icon.svg"),
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: withBasePath("/goldworks-apple-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Extensions may add data-* attributes here. Keep checks inside the page active.
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

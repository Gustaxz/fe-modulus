import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Modulus - Cursos Interativos",
	description:
		"Aprenda programação Canvas e JavaScript com exemplos práticos e editores de código interativos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className="scroll-smooth">
			<body className={`${roboto.className} antialiased`}>{children}</body>
		</html>
	);
}

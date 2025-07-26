import type {Metadata} from "next";
import {JetBrains_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import I18nProvider from "@/components/I18nProvider";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-jetbrainsMono"
});

export const metadata: Metadata = {
    title: "Portfolio - Jesse Sissala",
    description: "A portfolio website showcasing my projects and skills.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${jetbrainsMono.variable} antialiased`}
        >
        <I18nProvider>
            <Header/>
            <StairTransition/>
            <PageTransition>
                {children}
            </PageTransition>
        </I18nProvider>
        </body>
        </html>
    );
}

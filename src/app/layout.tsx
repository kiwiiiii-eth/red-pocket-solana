import type { Metadata } from "next";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";

export const metadata: Metadata = {
    title: "Solana Dapp",
    description: "My first Solana Dapp",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <WalletContextProvider>{children}</WalletContextProvider>
        </body>
        </html>
    );
}
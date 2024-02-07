import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Infinity",
  description: "AI Blog or Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Life Hacks",
  description: "Quick tips and little tricks to make your life easier.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">

        <NavBar />

        <main className="max-w-4xl mx-auto p-4">
          {children}
        </main>

      </body>
    </html>
    </ClerkProvider>
  );
}
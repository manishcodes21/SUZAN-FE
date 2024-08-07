import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider/ClientProvider";
import { AuthProvider } from '@/context/AuthContext'; // Import the context provider
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "SUZAN",
  description: "Soochan For Gen-Z",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
      <AuthProvider>
        <ClientProvider>
          {children}
          <Toaster/>
        </ClientProvider>
      </AuthProvider>
      </body>
    </html>
  );
}

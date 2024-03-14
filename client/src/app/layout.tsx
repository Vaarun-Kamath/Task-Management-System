import { Open_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/utils/sessionProvider";

const inter = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.variable}>
      <head></head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;

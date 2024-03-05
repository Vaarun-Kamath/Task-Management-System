import { Open_Sans } from "next/font/google";
import "./globals.css";
import { favicons } from "@/constants/FaviconList";

const inter = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;

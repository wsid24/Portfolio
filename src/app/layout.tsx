import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "Siddhant Wani",
  description: "Full-Stack Engineer · AI Systems Builder · Competitive Programmer. Codeforces Expert, LeetCode Guardian. Building fast, intelligent web systems.",
  keywords: ["Siddhant Wani", "Full Stack Developer", "Competitive Programmer", "AI Engineer", "LeetCode", "Codeforces", "Next.js"],
  authors: [{ name: "Siddhant Wani" }],
};

const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    // Default to dark
    var theme = stored === 'light' ? 'light' : 'dark';
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

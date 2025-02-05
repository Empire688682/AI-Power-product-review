import NavBar from "@/Component/NavBar/NavBar";
import "./globals.css";
import { AppProvider } from "@/Component/Context";

export const metadata = {
  title: "AI-Power Review",
  description: "Customers revivew analyzer with OpenAI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <NavBar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

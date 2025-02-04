import "./globals.css";
import { AppProvider } from "@/Component/Context";

export const metadata = {
  title: "AI-Power Review",
  description: "Customers revivew analyzer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
        {children}
        </AppProvider>
      </body>
    </html>
  );
}

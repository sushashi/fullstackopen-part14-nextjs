import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import { NotificationProvider } from "./components/NotificationContext";
import Notification from "./components/Notification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-screen bg-background text-foreground overflow-y-scroll">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <div className="max-w-xl mx-auto p-6 pt-20">
              <Notification />
              {children}
            </div>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
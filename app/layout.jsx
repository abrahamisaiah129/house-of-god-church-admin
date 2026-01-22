"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { AuthProvider } from "@/lib/AuthContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  // Hide Sidebar and Header on login and register pages
  const isAuthPage =
    pathname === "/login" || pathname === "/" || pathname === "/register";

  return (
    <html lang="en">
      <head>
        <title>House of God Church Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* FontAwesome for Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Google Fonts: Poppins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-gray-900 bg-gray-50">
        <AuthProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Hidden on auth pages */}
            {!isAuthPage && (
              <aside className="w-64 shrink-0 bg-black text-white hidden md:flex flex-col border-r border-gray-800 transition-all duration-300">
                <Sidebar />
              </aside>
            )}

            {/* Main Content Area */}
            <div className="flex flex-col grow overflow-hidden bg-gray-50 relative">
              {!isAuthPage && (
                <div className="shrink-0 z-10 sticky top-0">
                  <Header />
                </div>
              )}
              <main
                className={`grow overflow-auto ${!isAuthPage ? "p-6" : ""}`}
              >
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

// layout.tsx
"use client";
import React from "react";
import "./globals.css"; // Ensure you reference your global styles here

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
      <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Blockchain-Based Healthcare Data Sharing</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Healthcare Data Sharing Platform
        </div>
      </footer>
    </div>
      </body>
    </html>
    
  );
}

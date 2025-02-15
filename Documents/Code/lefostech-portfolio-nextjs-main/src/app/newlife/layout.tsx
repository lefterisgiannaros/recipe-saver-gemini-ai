// app/newlife/layout.tsx
import NewlifeNavbar from "./components/NewlifeNavbar";
import React from "react";

export default function NewlifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* You can add a header here if needed */}
      <main className="pb-20">{children}</main>
      <NewlifeNavbar />
    </div>
  );
}

"use client";

import React from "react";
import CookingMenu from "../components/CookingMenu";

export default function CookingPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cooking</h1>
      <CookingMenu />
    </div>
  );
}

"use client";

import React from "react";
import DashboardStats from "./components/DashboardStats";
import MealCalendar from "./components/MealCalendar";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <DashboardStats />
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Today's Mediterranean Diet</h2>
        <MealCalendar />
      </div>
    </div>
  );
}

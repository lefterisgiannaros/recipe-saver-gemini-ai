"use client";

import React from "react";
import cookingData from "../data/cooking.json";

type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

interface Meal {
  name: string;
  time: string;
}

interface DaySchedule {
  meals: Meal[];
  fasting: { start: string; end: string; }[];
}

interface MealCalendar {
  [date: string]: DaySchedule;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default function CalendarView() {
  const { mealCalendar }: { mealCalendar: MealCalendar } = cookingData;
  const daysOfWeek: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayIndex = new Date().getDay();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const meals = mealCalendar[formatDate(new Date())]?.meals || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Meal Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day, index) => {
          const meals = mealCalendar[formatDate(new Date())]?.meals || [];
          return (
            <div
              key={day}
              className={`border p-2 rounded ${
                index === currentDayIndex ? "bg-blue-100" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{day}</span>
                {index === currentDayIndex && (
                  <span className="text-xs text-red-500">{currentTime}</span>
                )}
              </div>
              <ul className="text-sm">
                {meals.map((meal, idx) => (
                  <li key={idx}>{meal.name}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

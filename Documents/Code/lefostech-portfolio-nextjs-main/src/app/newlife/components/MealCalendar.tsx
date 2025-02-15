"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import cookingData from "../data/cooking.json";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface Meal {
  name: string;
  time: string; // "HH:mm"
  eaten?: boolean;
}

interface FastingPeriod {
  start: string; // "HH:mm"
  end: string;   // "HH:mm"
}

interface DaySchedule {
  meals: Meal[];
  fasting: FastingPeriod[];
}

const MEAL_DURATION = 30; // in minutes

// Converts a "HH:mm" string to minutes from midnight.
function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Formats minutes (from midnight) back into a "HH:mm" string.
function formatMinutes(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

// Formats a Date object as "DD/MM/YYYY"
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function MealCalendar() {
  // Force the selected date for testing.
  const [selectedDate, setSelectedDate] = useState(new Date("2025-02-15T00:00:00Z"));
  const [schedule, setSchedule] = useState<DaySchedule | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const initialScrollDone = useRef(false);

  // Log formatted date for debugging.
  useEffect(() => {
    console.log("Formatted date:", formatDate(selectedDate));
    // Reset auto-scroll flag when date changes.
    initialScrollDone.current = false;
  }, [selectedDate]);

  // Update current time every minute.
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Load schedule from Firebase if available, else fallback to JSON.
  const loadSchedule = async (date: Date) => {
    setLoading(true);
    const dateKey = formatDate(date);
    try {
      const docRef = doc(db, "cooking", "mealCalendar", "dates", dateKey);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSchedule(docSnap.data() as DaySchedule);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error loading schedule from Firebase:", error);
    }
    const jsonSchedule = (cookingData.mealCalendar as Record<string, DaySchedule>)[dateKey];
    setSchedule(jsonSchedule || null);
    setLoading(false);
  };

  useEffect(() => {
    loadSchedule(selectedDate);
  }, [selectedDate]);

  // Auto-scroll to current time only once (or when selectedDate changes)
  useLayoutEffect(() => {
    if (timelineContainerRef.current && !initialScrollDone.current) {
      const containerHeight = timelineContainerRef.current.clientHeight;
      const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      timelineContainerRef.current.scrollTop = Math.max(currentMinutes - containerHeight / 2, 0);
      initialScrollDone.current = true;
    }
  }, [currentTime, schedule]);

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  // Toggle a meal's "eaten" status and update Firebase.
  const handleMealToggle = async (mealIndex: number) => {
    if (!schedule) return;
    const updatedMeals = schedule.meals.map((meal, index) => {
      if (index === mealIndex) {
        return { ...meal, eaten: !meal.eaten };
      }
      return meal;
    });
    const updatedSchedule: DaySchedule = { ...schedule, meals: updatedMeals };
    setSchedule(updatedSchedule);
    try {
      const dateKey = formatDate(selectedDate);
      const docRef = doc(db, "cooking", "mealCalendar", "dates", dateKey);
      await setDoc(docRef, updatedSchedule, { merge: true });
    } catch (error) {
      console.error("Error updating meal schedule:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading schedule...</div>;
  }

  if (!schedule) {
    return (
      <div className="p-4">
        <p>No schedule found for {formatDate(selectedDate)}</p>
      </div>
    );
  }

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const activeMealIndex = schedule.meals.findIndex(meal => {
    const mealStart = parseTimeToMinutes(meal.time);
    return currentMinutes >= mealStart && currentMinutes < mealStart + MEAL_DURATION;
  });
  const nextMeal = schedule.meals.find(meal => parseTimeToMinutes(meal.time) > currentMinutes);
  const timelineTotalHeight = 1440; // total minutes in a day

  return (
    <div className="p-4 border rounded shadow">
      {/* Date Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevDay} className="px-2 py-1 border rounded">
          {"<"}
        </button>
        <h2 className="text-xl font-semibold">{formatDate(selectedDate)}</h2>
        <button onClick={handleNextDay} className="px-2 py-1 border rounded">
          {">"}
        </button>
      </div>
      {/* Scrollable Timeline Card */}
      <div
        ref={timelineContainerRef}
        className="relative border-l pl-8 overflow-y-scroll"
        style={{ height: "500px" }}
      >
        <div style={{ height: timelineTotalHeight, position: "relative" }}>
          {/* Hour Markers */}
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="absolute left-0 text-xs" style={{ top: i * 60 - 6 }}>
              {i.toString().padStart(2, "0")}:00
            </div>
          ))}
          {/* Meal Events */}
          {schedule.meals.map((meal, index) => {
            const mealStart = parseTimeToMinutes(meal.time);
            return (
              <div
                key={index}
                className={`absolute left-8 right-2 p-2 rounded border ${
                  activeMealIndex === index ? "bg-blue-100" : "bg-blue-50"
                }`}
                style={{ top: mealStart, height: MEAL_DURATION }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{meal.name}</span>
                  <input
                    type="checkbox"
                    checked={meal.eaten || false}
                    onChange={() => handleMealToggle(index)}
                    className="h-4 w-4"
                  />
                </div>
                <p className="text-xs">
                  {meal.time} - {formatMinutes(mealStart + MEAL_DURATION)}
                </p>
              </div>
            );
          })}
          {/* Fasting Periods */}
          {schedule.fasting.map((f, idx) => {
            const start = parseTimeToMinutes(f.start);
            const end = parseTimeToMinutes(f.end);
            return (
              <div
                key={idx}
                className="absolute left-8 right-2 bg-gray-300 opacity-50 rounded"
                style={{ top: start, height: end - start }}
              >
                <p className="text-xs text-center">
                  {f.start} - {f.end} Fasting
                </p>
              </div>
            );
          })}
          {/* Current Time Indicator */}
          <div
            className="absolute left-0 right-0 border-t-2 border-red-500"
            style={{ top: currentMinutes }}
          />
        </div>
      </div>
      {/* Detail Panel */}
      <div className="mt-4 p-4 border rounded bg-gray-50">
        {activeMealIndex !== -1 ? (
          <div>
            <p className="font-bold text-lg">
              {schedule.meals[activeMealIndex].name} (
              {schedule.meals[activeMealIndex].time} -{" "}
              {formatMinutes(parseTimeToMinutes(schedule.meals[activeMealIndex].time) + MEAL_DURATION)})
            </p>
            <p className="text-sm mt-1">Enjoy your meal during this period.</p>
          </div>
        ) : nextMeal ? (
          <div>
            <p className="font-bold text-lg">
              Next Meal: {nextMeal.name} at {nextMeal.time}
            </p>
            <p className="text-sm">
              Countdown:{" "}
              {Math.max(parseTimeToMinutes(nextMeal.time) - currentMinutes, 0)} minutes remaining.
            </p>
          </div>
        ) : (
          <p className="text-sm">No more meals scheduled for today.</p>
        )}
      </div>
    </div>
  );
}

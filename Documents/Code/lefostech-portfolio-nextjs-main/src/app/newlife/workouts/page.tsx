"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import workoutsData from "../data/workouts.json";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// --- Type Definitions ---
interface Exercise {
  name: string;
  description?: string;
  duration: number; // in seconds
  type: "exercise" | "rest";
}
interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  notes?: string;
}
interface WeeklySchedule {
  [day: string]: string; // "rest" or "workout1", "workout2", etc.
}
interface WorkoutsData {
  workoutTime: number;
  weeklySchedule: WeeklySchedule;
  workouts: Workout[];
}

export default function WorkoutPage() {
  const router = useRouter();
  const data: WorkoutsData = workoutsData;
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = dayNames[new Date().getDay()];
  const todaySchedule = data.weeklySchedule[todayName];

  if (todaySchedule === "rest") {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">Rest Day</h1>
        <p>Enjoy your recovery today!</p>
      </div>
    );
  }

  // Find today's workout by matching the ID from the schedule.
  const workout = data.workouts.find((w) => w.id === todaySchedule);
  if (!workout) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">Workout Not Found</h1>
      </div>
    );
  }

  // --- Workout Session State ---
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [globalTime, setGlobalTime] = useState(data.workoutTime);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(workout.exercises[0].duration);
  const [paused, setPaused] = useState(false);
  const [extraRestUsed, setExtraRestUsed] = useState(false);

  // Start Workout – UI is always visible so you can see the first exercise.
  const startWorkout = () => {
    setWorkoutStarted(true);
    setGlobalTime(data.workoutTime);
    setActiveExerciseIndex(0);
    setExerciseTime(workout.exercises[0].duration);
    window.onbeforeunload = (e) => {
      e.preventDefault();
      return "Workout in progress. Are you sure you want to leave?";
    };
  };

  // Restart Workout
  const restartWorkout = () => {
    setWorkoutStarted(false);
    setGlobalTime(data.workoutTime);
    setActiveExerciseIndex(0);
    setExerciseTime(workout.exercises[0].duration);
    setPaused(false);
    setExtraRestUsed(false);
    window.onbeforeunload = null;
  };

  // When workout completes, record completion in Firebase.
  useEffect(() => {
    if (workoutStarted && activeExerciseIndex === workout.exercises.length) {
      // Record today's workout completion in Firestore.
      (async () => {
        try {
          await addDoc(collection(db, "workoutHistory"), {
            completedAt: Timestamp.now(),
            workoutId: workout.id,
            day: new Date().toDateString(),
          });
        } catch (error) {
          console.error("Error recording workout completion:", error);
        }
      })();
      setWorkoutStarted(false);
      window.onbeforeunload = null;
    }
  }, [workoutStarted, activeExerciseIndex, workout]);

  // Global timer countdown
  useEffect(() => {
    if (!workoutStarted || paused) return;
    if (globalTime <= 0) return;
    const interval = setInterval(() => {
      setGlobalTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [workoutStarted, globalTime, paused]);

  // Exercise timer countdown
  useEffect(() => {
    if (!workoutStarted || paused) return;
    if (exerciseTime <= 0) {
      if (activeExerciseIndex < workout.exercises.length - 1) {
        setActiveExerciseIndex((prev) => prev + 1);
        setExerciseTime(workout.exercises[activeExerciseIndex + 1].duration);
        setExtraRestUsed(false);
      } else {
        // Mark workout complete by advancing index past last exercise.
        setActiveExerciseIndex(workout.exercises.length);
      }
      return;
    }
    const interval = setInterval(() => {
      setExerciseTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [workoutStarted, exerciseTime, activeExerciseIndex, workout, paused]);

  const togglePause = () => setPaused((prev) => !prev);

  const addExtraRest = () => {
    if (extraRestUsed) return;
    const currentEx = workout.exercises[activeExerciseIndex];
    if (currentEx && currentEx.type === "rest") {
      setExerciseTime((prev) => prev + 30);
      setExtraRestUsed(true);
    }
  };

  // Helper to format seconds as MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{workout.name}</h1>
        {workoutStarted ? (
          <button
            onClick={restartWorkout}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Restart Workout
          </button>
        ) : (
          <button
            onClick={startWorkout}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Start Workout
          </button>
        )}
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold">
          Global Time Left: {formatTime(globalTime)}
        </div>
        <div className="mt-2">
          <button
            onClick={togglePause}
            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={addExtraRest}
            disabled={extraRestUsed}
            className={`${
              extraRestUsed ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            } text-white px-2 py-1 rounded`}
          >
            Extra Rest +30s
          </button>
        </div>
      </div>
      {/* Active Exercise Card */}
      {activeExerciseIndex < workout.exercises.length && (
        <div className="mb-4">
          <div className="p-4 border rounded bg-white shadow-md transition-all duration-300 border-blue-500">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {workout.exercises[activeExerciseIndex].name}
              </h2>
              <div className="text-lg">{formatTime(exerciseTime)}</div>
            </div>
            {workout.exercises[activeExerciseIndex].description && (
              <p className="mt-2">
                {workout.exercises[activeExerciseIndex].description}
              </p>
            )}
          </div>
        </div>
      )}
      {/* Upcoming Exercises */}
      <div>
        {workout.exercises
          .slice(activeExerciseIndex + 1)
          .map((ex, i) => (
            <div
              key={i}
              className="p-4 border rounded bg-gray-200 opacity-50 mb-2 transition-all duration-300"
            >
              <h3 className="font-bold">{ex.name}</h3>
              {ex.description && <p>{ex.description}</p>}
              <p>Duration: {ex.duration} sec</p>
            </div>
          ))}
      </div>
    </div>
  );
}

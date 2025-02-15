"use client";

import React, { useState } from "react";
import { db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface Workout {
  id: string;
  name: string;
  description: string;
  time: string;
  duration?: string;
  rest?: string;
}

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStatus = e.target.checked;
    setCompleted(newStatus);
    try {
      await updateDoc(doc(db, "workouts", workout.id), {
        completed: newStatus,
      });
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{workout.name}</h2>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
      </div>
      <p>{workout.description}</p>
      <p className="text-sm text-gray-500">Time: {workout.time}</p>
      {workout.duration && (
        <p className="text-sm text-gray-500">Duration: {workout.duration}</p>
      )}
      {workout.rest && (
        <p className="text-sm text-gray-500">Rest: {workout.rest}</p>
      )}
    </div>
  );
}

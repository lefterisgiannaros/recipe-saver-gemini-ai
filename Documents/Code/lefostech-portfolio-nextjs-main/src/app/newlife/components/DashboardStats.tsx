"use client";

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardStats() {
  const [workoutDays, setWorkoutDays] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "workoutHistory"));
        setWorkoutDays(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching workout history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkoutHistory();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      {loading ? (
        <p>Loading workout stats...</p>
      ) : (
        <p className="text-xl">
          Workout Days Completed: <span className="font-bold">{workoutDays}</span>
        </p>
      )}
    </div>
  );
}

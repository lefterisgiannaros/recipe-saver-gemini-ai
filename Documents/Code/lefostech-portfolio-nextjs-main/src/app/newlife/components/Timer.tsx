"use client";

import React, { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };

  const formatTime = (secs: number) => {
    const getSeconds = `0${secs % 60}`.slice(-2);
    const minutes = Math.floor(secs / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(secs / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="flex items-center space-x-4 p-2 border rounded">
      <div className="text-xl font-mono">{formatTime(seconds)}</div>
      <button
        onClick={handleStart}
        className="px-2 py-1 bg-green-500 text-white rounded"
      >
        Start
      </button>
      <button
        onClick={handleStop}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        Stop
      </button>
      <button
        onClick={handleReset}
        className="px-2 py-1 bg-gray-500 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
}

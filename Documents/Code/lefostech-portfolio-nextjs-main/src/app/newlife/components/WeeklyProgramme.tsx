// app/newlife/components/WeeklyProgramme.tsx
import React from "react";
import cookingData from "../data/cooking.json";

export default function WeeklyProgramme() {
  const { weeklyProgramme } = cookingData;

  return (
    <div>
      <h2 className="text-xl font-semibold">Weekly/Daily Programme</h2>
      {Object.entries(weeklyProgramme).map(([day, recipes]: [string, any]) => (
        <div key={day} className="mb-4">
          <h3 className="font-semibold">{day}</h3>
          <ul className="list-disc ml-5">
            {recipes.map((recipe: string, index: number) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

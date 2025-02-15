"use client";

import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import MealCalendar from "./MealCalendar";
import MealPrep from "./MealPrep";

type Option = "shoppingList" | "mealCalendar" | "mealPrep";

export default function CookingMenu() {
  const [selected, setSelected] = useState<Option>("mealCalendar");

  const buttonClass = (option: Option) =>
    `px-4 py-2 ${
      selected === option
        ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
        : "text-gray-500"
    }`;

  return (
    <div>
      <div className="flex justify-around border-b mb-4">
        <button onClick={() => setSelected("shoppingList")} className={buttonClass("shoppingList")}>
          Shopping List
        </button>
        <button onClick={() => setSelected("mealCalendar")} className={buttonClass("mealCalendar")}>
          Meal Calendar
        </button>
        <button onClick={() => setSelected("mealPrep")} className={buttonClass("mealPrep")}>
          Meal Prep
        </button>
      </div>
      <div>
        {selected === "shoppingList" && <ShoppingList />}
        {selected === "mealCalendar" && <MealCalendar />}
        {selected === "mealPrep" && <MealPrep />}
      </div>
    </div>
  );
}

"use client";

import React from "react";

interface DropdownProps {
  selected: string;
  setSelected: (value: string) => void;
}

export default function Dropdown({ selected, setSelected }: DropdownProps) {
  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="shoppingList">Shopping List</option>
      <option value="calendar">Meal Calendar</option>
      <option value="mealPrep">Meal Prep</option>
    </select>
  );
}

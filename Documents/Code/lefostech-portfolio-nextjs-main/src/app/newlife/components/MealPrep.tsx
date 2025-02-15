"use client";

import React, { useState, useEffect } from "react";
import cookingData from "../data/cooking.json";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function MealPrep() {
  const initialPrep: string[] = cookingData.mealPrep ?? [];
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [mealPrepList] = useState<string[]>(initialPrep);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "cooking", "mealPrep");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.checkedItems) {
            setCheckedItems(data.checkedItems);
          }
        }
      } catch (error) {
        console.error("Error loading meal prep data:", error);
      }
    }
    loadData();
  }, []);

  const handleToggle = async (item: string) => {
    const newChecked = checkedItems.includes(item)
      ? checkedItems.filter((i) => i !== item)
      : [...checkedItems, item];
    setCheckedItems(newChecked);
    try {
      const docRef = doc(db, "cooking", "mealPrep");
      await updateDoc(docRef, { checkedItems: newChecked });
    } catch (error) {
      console.error("Error updating meal prep:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Meal Prep for Upcoming Days</h2>
      <ul className="list-disc ml-5">
        {mealPrepList.map((item, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={checkedItems.includes(item)}
              onChange={() => handleToggle(item)}
              className="mr-2"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

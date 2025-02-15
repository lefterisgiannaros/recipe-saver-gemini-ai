"use client";

import React, { useState, useEffect } from "react";
import cookingData from "../data/cooking.json";
import { db } from "../lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function ShoppingList() {
  // Fallback to an empty array if shoppingList is undefined.
  const initialList: string[] = cookingData.shoppingList ?? [];
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [shoppingList] = useState<string[]>(initialList);

  // Load saved state from Firebase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "cooking", "shoppingList");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.checkedItems) {
            setCheckedItems(data.checkedItems);
          }
        }
      } catch (error) {
        console.error("Error loading shopping list:", error);
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
      const docRef = doc(db, "cooking", "shoppingList");
      await updateDoc(docRef, { checkedItems: newChecked });
    } catch (error) {
      console.error("Error updating shopping list:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Shopping List</h2>
      <ul>
        {shoppingList.map((item, index) => (
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

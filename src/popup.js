import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API key and generative model
const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to scrape recipe content from the webpage
async function scrapeRecipeFromPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const title = document.querySelector("h1")?.innerText || "No title found";
        const ingredients = Array.from(document.querySelectorAll(".single-list-item.grocery-list-item"))
          .map(el => el.innerText.trim());
        const instructions = Array.from(document.querySelectorAll(".instructions li"))
          .map(el => el.innerText.trim());
        const url = window.location.href; // Get the current recipe URL
        return { title, ingredients, instructions, url };
      },
    });

    if (result && result[0]?.result) {
      return result[0].result;
    } else {
      throw new Error("No recipe content found on this page.");
    }
  } catch (error) {
    throw new Error(`Error scraping recipe: ${error.message}`);
  }
}

// Function to send the scraped recipe content to Gemini AI
async function analyzeRecipeWithGemini(recipe) {
  try {
    const prompt = `Here is a recipe:\n\nTitle: ${recipe.title}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nInstructions:\n${recipe.instructions.join('\n')}`;
    const result = await model.generateContent(prompt);
    
    // Log the result to inspect the structure
    console.log(result);

    // Ensure the response is a string or properly handle its structure
    const aiResponseText = result.response && result.response.text ? result.response.text() : "No response from AI";
    return aiResponseText;
  } catch (error) {
    throw new Error(`Error analyzing recipe: ${error.message}`);
  }
}

// Function to save the AI response to Chrome storage
function saveResponseToChrome(url, aiResponseText, instructions) {
  const data = {
    url,
    aiResponse: aiResponseText,
    instructions,  // Save the instructions separately
    timestamp: new Date().toISOString(),
  };

  chrome.storage.local.set({ [url]: data }, () => {
    loadAllRecipesFromChrome().then((recipes) => {
      displaySavedRecipesAsAccordion(recipes); // Refresh the saved recipes list
    });
    alert("Recipe saved!");
  });
}

// Function to load all saved recipes from Chrome storage
function loadAllRecipesFromChrome() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
}

// Function to display saved recipes as an accordion list
// Function to display saved recipes as an accordion list
function displaySavedRecipesAsAccordion(recipes) {
  const recipesList = document.getElementById("savedRecipesContainer");

  const renderRecipes = (filteredRecipes) => {
    recipesList.innerHTML = ""; // Clear existing recipes

    if (Object.keys(filteredRecipes).length === 0) {
      recipesList.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    Object.entries(filteredRecipes).forEach(([url, recipe]) => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("accordion-item");

      recipeElement.innerHTML = `
        <div class="accordion-header">
          <a href="${recipe.url}" target="_blank">${recipe.title}</a>
        </div>
        <div class="accordion-content" style="display: none;">
          <h4>Ingredients:</h4>
          <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
          <h4>Instructions:</h4>
          <ul>
            ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
          </ul>
        </div>
        <button class="delete-btn" data-url="${url}">Delete</button>
      `;

      recipesList.appendChild(recipeElement);

      // Accordion toggle functionality
      const accordionHeader = recipeElement.querySelector(".accordion-header");
      const accordionContent = recipeElement.querySelector(".accordion-content");

      accordionHeader.addEventListener("click", () => {
        accordionContent.style.display =
          accordionContent.style.display === "none" ? "block" : "none";
      });

      // Add delete functionality
      recipeElement.querySelector(".delete-btn").addEventListener("click", async () => {
        await deleteRecipe(url);
        loadAllRecipesFromChrome().then(displaySavedRecipesAsAccordion);
      });
    });
  };

  renderRecipes(recipes);
}

// Function to delete a saved recipe
function deleteRecipe(url) {
  return new Promise((resolve) => {
    chrome.storage.local.remove([url], () => {
      console.log(`Recipe for ${url} deleted from Chrome storage.`);
      resolve();
    });
  });
}

// Event handlers
document.getElementById("crawlBtn").addEventListener("click", async () => {
  const messageElement = document.getElementById("message");
  const errorElement = document.getElementById("error");
  const recipesList = document.getElementById("recipesList");
  recipesList.style.display = "none";
  messageElement.style.display = "block";

  messageElement.textContent = "";
  errorElement.textContent = "";

  try {
    const recipe = await scrapeRecipeFromPage();
    messageElement.textContent = "Analyzing the recipe with Gemini AI...";
    const aiResponse = await analyzeRecipeWithGemini(recipe);
    messageElement.innerHTML = `<h3>Recipe Summary</h3><a href="${recipe.url}" target="_blank"><h4>${recipe.url}</h4></a><p>${aiResponse.replace(/\n/g, "<br>")}</p>`;
    saveResponseToChrome(recipe);
  } catch (error) {
    errorElement.textContent = `Error: ${error.message}`;
  }
});

document.getElementById("viewRecipesBtn").addEventListener("click", async () => {
  const messageElement = document.getElementById("message");
  messageElement.style.display = "none";
  const recipesList = document.getElementById("recipesList");
  recipesList.style.display = "block";

  try {
    const recipes = await loadAllRecipesFromChrome();

    if (Object.keys(recipes).length > 0) {
      displaySavedRecipesAsAccordion(recipes);
    } else {
      messageElement.textContent = "No saved recipes found.";
    }
  } catch (error) {
    console.error("Error loading saved recipes:", error);
  }
});

document.getElementById("exportBtn").addEventListener("click", async () => {
  const recipes = await loadAllRecipesFromChrome();

  if (Object.keys(recipes).length > 0) {
    const exportType = prompt("Export as JSON or Excel? (Enter 'json' or 'excel')").toLowerCase();
    if (exportType === "json") {
      exportToJson(recipes);
    } else if (exportType === "excel") {
      exportToExcel(recipes);
    } else {
      alert("Invalid option! Please enter 'json' or 'excel'.");
    }
  } else {
    alert("No recipes to export.");
  }
});

// Function to export recipes to JSON
function exportToJson(recipes) {
  const blob = new Blob([JSON.stringify(recipes, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'recipes.json';
  link.click();
}

// Function to export recipes to Excel (using SheetJS)
function exportToExcel(recipes) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(Object.values(recipes).map(recipe => ({
    URL: recipe.url,
    Response: recipe.response,
    Timestamp: recipe.timestamp
  })));
  XLSX.utils.book_append_sheet(wb, ws, "Recipes");
  XLSX.writeFile(wb, "recipes.xlsx");
}

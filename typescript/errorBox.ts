import { error } from "console";

// Definieer een functie die een error box maakt
function showErrorBox(message: string): void {
    const errorBox = document.createElement("div");
    errorBox.classList.add("error-box");
    errorBox.textContent = message;
    document.body.appendChild(errorBox);
  }
  
  // Roep de functie aan wanneer er op een knop wordt gedrukt
  const a = document.querySelector("button");
  if(a != null){
  a.addEventListener("click", () => {
    // Simuleer een error
    const errorMessage = "Er is iets fout gegaan.";
  
    // Laat de error box zien
    showErrorBox(errorMessage);
  
  })};
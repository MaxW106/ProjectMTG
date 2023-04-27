import { error } from "console";

// Definieer een functie die een error box maakt
function showErrorBox(message) {
	const errorBox = document.createElement("div");
	errorBox.classList.add("error-box");
	errorBox.textContent = message;
	document.body.appendChild(errorBox);
}

console.log("test test");

// Roep de functie aan wanneer er op een knop wordt gedrukt
const a = document.querySelectorAll("a");
a.forEach((element) => {
	element.addEventListener("click", () => {
		// Simuleer een error
		const errorMessage = "Geen toegang tot deze pagina.";

		// Laat de error box zien
		showErrorBox(errorMessage);
	});
});

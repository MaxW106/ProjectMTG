import { error } from "console";

class ErrorBox {
	constructor(className) {
	  this.elements = document.getElementsByClassName(className);
	  this.box = document.getElementsByClassName('error-box')[0];
	  this.bindEvents();
	}
  
	bindEvents() {
	  for(let i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('input', () => {
		  if(this.isValid()) {
			this.hideBox();
		  } else {
			this.showBox();
		  }
		});
	  }
	}
  
	isValid() {
	  for(let i = 0; i < this.elements.length; i++) {
		if(this.elements[i].value === '') {
		  return false;
		}
	  }
	  return true;
	}
  
	showBox() {
	  this.box.style.display = 'block';
	}
  
	hideBox() {
	  this.box.style.display = 'none';
	}
  }

/*
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
*/


  

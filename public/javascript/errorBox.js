//let errorbox = document.getElementById("error-box");
let errorContainer = document.getElementById("error-container");
/*
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
  }*/

// Definieer een functie die een error box maakt
function getNewErrorBox() {
	const errorBox = document.createElement("div");
	errorBox.id = "error-box";
	const errorText = document.createElement("p");
	errorText.innerText =
		"Er is een fout opgetreden. Controleer uw invoer en probeer het opnieuw.";
	errorText.className = "paragraph-Landing";
	errorBox.appendChild(errorText);
	return errorBox;
}

// Roep de functie aan wanneer er op een knop wordt gedrukt
const a = document.querySelectorAll("a");
a.forEach((element) => {
	if (element.className == "a") {
		element.addEventListener("click", () => {
			const errorBox = getNewErrorBox();
			errorContainer.appendChild(errorBox);
			setTimeout(() => {
				errorBox.style.display = "none";
			}, 3000);
		});
	}
});

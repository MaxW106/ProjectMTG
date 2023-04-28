let errorbox = document.getElementById("error-box");
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
function addErrorBox(message) {
	const errorBox = document.createElement("div");
	/* errorBox.classList.add("error-box"); */
	errorBox.textContent = message;
	console.log(errorBox);
	document.body.appendChild(errorBox);
}

console.log("test test");

// Roep de functie aan wanneer er op een knop wordt gedrukt
const a = document.querySelectorAll("a");
a.forEach((element) => {
	if (element.className == "a") {
		element.addEventListener("click", () => {
			// Simuleer een error
			errorbox.style.animationName = "error";
			// Laat de error box zien
			addErrorBox("errorMessage");
		});
	}
});

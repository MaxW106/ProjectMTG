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


  

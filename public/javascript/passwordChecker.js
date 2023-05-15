import {createUser} from "../../mongo/db"

const password = document.getElementById("password");
const securePassword = document.getElementById("securePassword");
let pass;
let passwordCorrect = (a,b) => {
	if(a == b){
		pass = true;
	}
	else{
		pass = false;
	}
}




let password = document.getElementById("password");
let passwordChecker = document.getElementById("password-verification");
let registerButton = document.getElementById("register-button");
let formregister = document.getElementById("form-register");

function processForm(e){
    if(e.preventDefault) e.preventDefault();
    return false;
}
if(formregister.attachEvent){
    formregister.attachEvent("submit", processForm);

}else{
    formregister.addEventListener("submit", processForm);
}
/* checken wachtwoord */

// Definieer een functie die een error box maakt
let errorContainer = document.getElementById("error-password");
function ErrorBox() {
	const errorBox = document.createElement("div");
	errorBox.id = "error-box";
	const errorText = document.createElement("p");
	errorText.innerText =
		"Er is een fout opgetreden. Controleer uw invoer en probeer het opnieuw.";
	errorText.className = "paragraph-Landing";
	errorBox.appendChild(errorText);
	return errorBox;
}

registerButton.addEventListener("click", function (){
    if(passwordChecker != password){
        const errorBox = getNewErrorBox();
			errorContainer.appendChild(errorBox);
			setTimeout(() => {
				errorBox.style.display = "none";
			}, 5000);
    };
});



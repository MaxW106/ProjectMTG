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

registerButton.addEventListener("click", function (){
    if(passwordChecker != password){
        print("Your password is not the same!")
    };
});



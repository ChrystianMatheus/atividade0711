document.addEventListener("DOMContentLoaded", ()=>{
    const d = document;
    const form = d.getElementById("contactForm");
    const nameInput = d.getElementById("name");
    const lastNameInput = d.getElementById("lastName");
    const emailInput = d.getElementById("email");
    const generalQueryInput = d.getElementById("generalQuery");
    const supportQueryInput = d.getElementById("supportQuery");
    const messageInput = d.getElementById("message");
    const confirmationMessage = d.getElementById("successModal")
    const radioInputs = d.querySelectorAll("input[type='radio']");
    const radioError = d.getElementById("radioError");
    const consentCheckbox = d.getElementById("consent");
    const consentError = d.getElementById("consentError");

    const nameLastNameRegex = /^[A-Za-z-áéíóúÁÉÍÓÚñÑüÜ\s]/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    function validateField(input, regex, errorMessage){
        const value = input.value.trim(); 
        if(value === ""){
            input.classList.add(".error-border");
            input.classList.remove(".success-border");
            input.nextElementSibling.textContent="Este campo é obrigatório";
            return false;
        }else if(!regex.test(value)){
            input.classList.add(".error-border");
            input.classList.remove(".success-border");
            input.nextElementSibling.textContent = errorMessage;
            return false;
        }else{
            input.classList.remove(".error-border");
            input.classList.add(".success-border");
            input.nextElementSibling.textContent = "";
            return true;
        }
    }

function handlerBlur(input, regex, errorMessage) {
    input.addEventListener("blur", ()=>{
        validateField(input, regex, errorMessage);
    })
}
handlerBlur(nameInput,nameLastNameRegex,"O nome não é válido" );
handlerBlur(lastNameInput,nameLastNameRegex,"O sobrenome não é válido" );
handlerBlur(emailInput,emailRegex,"Email não válido" );
handlerBlur(messageInput, /.+/ ,"El mensaje no puede estar vacío 😡" );

    radioInputs.forEach((radio)=>{
        radio.addEventListener("change", ()=>{
            if(generalQueryInput.checked || supportQueryInput.checked){
                radioError.textContent = "" ;
            }
        })
    })

    consentCheckbox.addEventListener("change",()=>{
        if(consentCheckbox.checked){
            consentError.textContent = "" ;
        }
    })

        form.addEventListener("submit", (e)=>{
            e.preventDefault();

            const isNameValid =  validateField(nameInput,nameLastNameRegex,"El nombre no es valido 🥹" );
            const isLastNameValid = validateField(lastNameInput,nameLastNameRegex,"El apellido no es valido 🥹" );
            const isEmailValid = validateField(emailInput,emailRegex,"El email no es valido 🥹" );
            const isMessageValid = validateField(messageInput,/.+/,"El mensaje es requerido 🥹" );
            const isQueryValid =  generalQueryInput.checked || supportQueryInput.checked;
            const isConsentValid = consentCheckbox.checked;

            if(!isQueryValid){
                radioError.textContent = "Seleciona uma .-.";
            }else{
                radioError.textContent = "";
            }
            if(!isConsentValid){
                consentError.textContent = "Tem que aceitar man";
            }else{
                consentError.textContent = "Valeu";
            }

            if(isNameValid && isLastNameValid && isEmailValid && isMessageValid && isQueryValid && isConsentValid){
                form.reset();
                confirmationMessage.showModal();
                setTimeout(() => {
                    confirmationMessage.close();
                }, "7000");
            }
        })


})
export function displayModal() {
  const modal = document.getElementById("contact_modal");
modal.style.display = "block";
}
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
} 

// document.querySelector (".contact_button")
// .addEventListener ("click",function() {
//   displayModal ()
// } )


// document.querySelector (".closecross")
// .addEventListener ("click",function(){
//   closeModal ()
// })
const $registrationForm = document.querySelector(".contact__form");
const regexname = /^[A-Z|a-z|-]{2,}$/;

const photographerNameContact = document.getElementsByClassName("modal__h2");
// photographerNameContact.innerHTML = `Contactez-moi ${}`


function checkAll() {
  const firstNameInput = document.getElementById("first").value;
  const $firstNameErrorMsg = document.querySelector(".firstNameErrorMsg");
  const firstNameValid = regexname.test(firstNameInput);

  if (firstNameValid) {
    $firstNameErrorMsg.classList.add("hidden");
  } else {
    $firstNameErrorMsg.classList.remove("hidden");
  }

// function check Last Name
  const lastNameInput = document.getElementById("last").value;
  const $lastNameErrorMsg = document.querySelector(".lastNameErrorMsg");
  const lastNameValid = regexname.test(lastNameInput);

  if (lastNameValid) {
    $lastNameErrorMsg.classList.add("hidden");
  } else {
    $lastNameErrorMsg.classList.remove("hidden");
  }
  
// function check email
  const emailInput = document.getElementById("email").value;
  const regExMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const $emailErrorMsg = document.querySelector(".emailErrorMsg");
  const emailValid = regExMail.test(emailInput)

  if (emailValid) {
    $emailErrorMsg.classList.add("hidden")
  } else {
    $emailErrorMsg.classList.remove("hidden")
  }


  if (firstNameValid && lastNameValid && emailValid )
  return true
}

const formValid = () => checkAll() 

$registrationForm.addEventListener("submit", function(event) {
  event.preventDefault()
// if all booleans are true
  if (formValid()) {
   const formValid = document.getElementById("formValid")
    formValid.style.display = "none"

    const validationMessage = document.getElementById("validationMessage")
    validationMessage.style.display = "block"
  } 
})
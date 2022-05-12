/**
 * fonction créant le titre de la modale de contacte du photogapher avec sont nom
 * @param {string} name 
 */
function photographerNameModal(name) {
  const modalHeaderName = document.querySelector(".modale__h2");
  modalHeaderName.innerHTML = `Contactez ${name}`;
}

/**
 * fonction faisant apparetres la modale de contacte et force le focus sur la croix 
 * @param {string} name 
 */
export function displayModal(name) {
  const modal = document.getElementById("contact_modal");
  photographerNameModal(name);
  modal.style.display = "block";
  document.getElementById("crossTop").focus();
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
} 

  document.addEventListener ("keydown", evt => {
    if (evt.key === "Escape") {
      closeModal();
    }
  });

  /**
   * const permetant de garder le focus dans la modale
   */
const focusReturnTop = document.querySelector (".contact_button");
focusReturnTop.addEventListener ("keydown",function(e){
 
  if (e.key === "Tab") {
    e.preventDefault();
    document.querySelector("#crossTop").focus();
  }
})

const $registrationForm = document.querySelector(".contact__form");
const regexname = /^[A-Z|a-z|-]{2,}$/;

/**
 * fonction verifiant si toutes les zones de texte sont valides
 * @returns {boolean}
 */
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
  
  const messageInput = document.getElementById("message").value;
  const regExMesage = /^[A-Z|a-z|0-9| \r\n éèëêîïôûùâàô.,;:!-#$%&'*+=?^_`(){|}~-]{2,}$/;
  const $messageErrorMsg = document.querySelector(".messageErrorMsg");
  const messageValid = regExMesage.test(messageInput)

  if (messageValid) {
    $messageErrorMsg.classList.add("hidden")
  } else {
    $messageErrorMsg.classList.remove("hidden")
  }

  if (firstNameValid && lastNameValid && emailValid && messageValid)
  {
    const returnValues = {
      prenom: document.querySelector("#first").value,
      nom: document.querySelector("#last").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
    };
    console.log(returnValues);

    return true
  }

  return false
}

$registrationForm.addEventListener("submit", function(event) {
  event.preventDefault()
// si tout les boolean sont true, change la modale
  if (checkAll()) {
   const formValid = document.getElementById("contact__form")
    formValid.style.display = "none"
   const formValidMessage = document.getElementById("validationForm")
    formValidMessage.style.display = "block"
  } 
})

async function fetchPhotographers() {
  return fetch("../../../data/photographers.json")
  .then(function(result) {
    if(result.ok) {
      return result.json();
    }
  })
}
const getPhotographerData = async (UserId) => {
  const data = await fetchPhotographers ();
  const selectedPhotographer = data.photographers.filter((photographer) => photographer.id === UserId ) [0]
  return selectedPhotographer;
}
function photographerNameModal(name) {
  const modalHeaderDom = document.querySelector(".modalheader");
  const modalHeaderName = document.createElement("h2");
  modalHeaderDom.innerHTML="";
  modalHeaderName.className = "modale__h2";
  modalHeaderName.innerHTML = `Contactez ${name}`;
  modalHeaderDom.appendChild(modalHeaderName)

}
// const photographer_Id = Number (new URLSearchParams(window.location.search).get("id"));
// const selectedPhotographer = await getPhotographerData (photographer_Id);

export function displayModal(name) {
  const modal = document.getElementById("contact_modal");
  photographerNameModal(name);
  modal.style.display = "block";
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
} 

const $registrationForm = document.querySelector(".contact__form");
const regexname = /^[A-Z|a-z|-]{2,}$/;

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
   const formValid = document.getElementById("contact__form")
    formValid.style.display = "none"
   const formValidMessage = document.getElementById("validationForm")
    formValidMessage.style.display = "block"
    // const validationMessage = document.getElementById("validationMessage")
    // validationMessage.style.display = "block"
  } 
})
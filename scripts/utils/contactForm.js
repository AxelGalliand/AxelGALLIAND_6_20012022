
async function fetchPhotographers() {
  return fetch("./data/photographers.json")
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
  const modalHeaderName = document.querySelector(".modale__h2");
  modalHeaderName.innerHTML = `Contactez ${name}`;
  document.querySelector("#crossTop").focus();

}
// const photographer_Id = Number (new URLSearchParams(window.location.search).get("id"));
// const selectedPhotographer = await getPhotographerData (photographer_Id);

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

// function focusBoucle () {
//   const sendButton = document.querySelector('.contact_button');
//   if(document.activeElement === sendButton) {
//     console.log("test")
//       // document.getElementById("crossTop").focus();
//     }
//   }


// focusBoucle(); 



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
  
  const messageInput = document.getElementById("message").value;
  const regExMesage = /^[A-Z|a-z|0-9| éèëêîïôûùâàô.;!#$%&'*+=?^_`{|}~-]{2,}$/;
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
  }
  
 
 
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
import {photographerFactory} from "../factories/photographers.js"

async function getPhotographers() {
  return fetch("./data/photographers.json")
  .then(function(result) {
    if(result.ok) {
      return result.json();
    }
  })
  
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

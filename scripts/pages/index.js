import {photographerFactory} from "../factories/photographers.js"

/**
 * fonction async qui returns une promesse des données fetcher dans le dossier photographers.json
 * @async
 * @returns données fetcher dans le dossier photographers.json
 */
async function getPhotographers() {
  return fetch("./data/photographers.json")
  .then(function(result) {
    if(result.ok) {
      return result.json();
    }
  })
  
}

/**
 * fonction d'une boucle forEach 
 * @async
 * @param {{index: string, name: string, city: string, country: string, tagline: string, price: number, picture: string}} photographers 
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
  });
}

/**
 * initialise la création des cartes des photographes
 * @async
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

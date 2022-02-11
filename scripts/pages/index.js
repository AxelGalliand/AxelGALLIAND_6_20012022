import {photographerFactory} from "../factories/photographers.js"

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  return fetch("../../../data/photographers.json")
  .then(function(result) {
    if(result.ok) {
      return result.json();
    }
  })
  // return photographersDatas;

  // const photographers = [
  //     {
  //         name: "Ma data test",
  //         id: 1,
  //         city: "Paris",
  //         country: "France",
  //         tagline: "Ceci est ma data test",
  //         price: 400,
  //         portrait: "MimiKeel.jpg"
  //     },
  //     {
  //         "name": "Autre data test",
  //         "id": 2,
  //         "city": "Londres",
  //         "country": "UK",
  //         "tagline": "Ceci est ma data test 2",
  //         "price": 500,
  //         "portrait": "RhodeDubois.jpg"
  //     },
  // ]
  // et bien retourner le tableau photographers seulement une fois
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

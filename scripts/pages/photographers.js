import {displayModal, closeModal} from "../utils/contactForm.js"
import { MediaFactory } from "../factories/medias.js"

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

async function photographerHeader (photographer) {
  const photographerheaderSection = document.querySelector(".photographer-header");
  const photographerHeader__content = document.createElement("article");
  photographerHeader__content.className = "photographer__headerContent";
  photographerHeader__content.innerHTML = `
  <article class="photographer__info"> 
    <h1 class="photographer__h1">${photographer.name}</h1>
    <p class="photographer__local">${photographer.city}, ${photographer.country}</p>
    <p class="photographer__tagline">${photographer.tagline}</p>
  </article>
  <button class="contact_button">Contactez-moi</button>
  <img class="photographer__portrait" src="Sample_Photos/Photographers_ID_Photos/${photographer.portrait}" alt="portrait de ${photographer.name}"> `;

 photographerheaderSection.appendChild(photographerHeader__content);
}


const getMediaData = async (photographerMedia_Id) => {
  const data = await fetchPhotographers ();
  const selectedMedia = data.media.filter ((media) => media.photographerId === photographerMedia_Id);
  return selectedMedia;
}

async function photographerPortfolio (medias) {
  for(const media of medias)
  {
    media.render()
  }
  
  const totalLikes = document.querySelector(".footer__likes--total");
  let totalLikesArray = [];
  for(const media of medias)
  {
  totalLikesArray.push(media.likes);
  let sum = totalLikesArray.reduce((partialSum, a) => partialSum + a, 0);
  
  totalLikes.innerHTML = `${sum}`;
  }
  
  console.log(totalLikesArray);
  
}

// const selectedMedia = await getMediaData (photographer_Id);
// console.log(selectedMedia);

async function photographerFooter (photographer) {
  const photographerpherPrice = document.querySelector(".footer__priceday").innerHTML = `${photographer.price}/jours`;
}


const photographer_Id = Number (new URLSearchParams(window.location.search).get("id"));

const selectedPhotographer = await getPhotographerData (photographer_Id);
console.log (selectedPhotographer);

let  selectedMedia = await getMediaData (photographer_Id);
selectedMedia = selectedMedia.map((data) => MediaFactory(data));
console.log(selectedMedia);
console.log(MediaFactory);

// console.log(getTotalLikes(selectedMedia))



photographerHeader(selectedPhotographer);



document.querySelector (".contact_button")
.addEventListener ("click",function() {
  displayModal ()
} )

document.querySelector (".closecross")
.addEventListener ("click",function(){
  closeModal ()
})

photographerPortfolio (selectedMedia);

photographerFooter(selectedPhotographer);

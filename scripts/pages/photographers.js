import {displayModal, closeModal} from "../utils/contactForm.js"

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

const photographer_Id = Number (new URLSearchParams(window.location.search).get("id"));

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

const selectedPhotographer = await getPhotographerData (photographer_Id);
console.log (selectedPhotographer);

const getMediaData = async (photographerMedia_Id) => {
  const data = await fetchPhotographers ();
  const selectedMedia = data.media.filter ((media) => media.photographerId === photographerMedia_Id);
  return selectedMedia;
}

async function photographerPortfolio () {

  for(const media of selectedMedia)
  {

    const photographerMediaSection = document.querySelector(".photographer__portfolio");
    const photographerMedia__content = document.createElement("article");
    photographerMedia__content.className = "photographer__portfolio--media";

    if (media.video) {
    photographerMedia__content.innerHTML = `
     <video class="photographer__portfolio--media--video" poster="Sample_Photos/${media.video}">
      <source src="Sample_Photos/${media.video}#t=0.1" type="video/mp4">
     </video>  
     <div class="photographer__portfolio--media--info">
      <h3 class="photographer__portfolio--media--info--title">${media.title}</h3>
      <div class="photographer__portfolio--media--info--like">
        <span class="photographer__portfolio--media--info--like--count">${media.likes}</span>
        <i class="fa-heart far photographer__portfolio--media--info--like--heart"></i>
      </div>
     </div>
    `;
    }else {
     photographerMedia__content.innerHTML = `
      <img class="photographer__portfolio--media--content" src="Sample_Photos/${media.image}">
      <div class="photographer__portfolio--media--info">
       <h3 class="photographer__portfolio--media--info--title">${media.title}</h3>
       <div class="photographer__portfolio--media--info--like">
        <span class="photographer__portfolio--media--info--like--count">${media.likes}</span>
        <i class="fa-heart far photographer__portfolio--media--info--like--heart"></i>
       </div>
      </div>`;
    } 
   photographerMediaSection.appendChild(photographerMedia__content);
  }
  const totalLikes = document.querySelector(".footer__likes--total");
  let totalLikesArray = [];
  for(const media of selectedMedia)
  {
  totalLikesArray.push(media.likes);
  let sum = totalLikesArray.reduce((partialSum, a) => partialSum + a, 0);
  
  totalLikes.innerHTML = `${sum}`;
  }
  console.log(totalLikesArray);
  
}

const selectedMedia = await getMediaData (photographer_Id);
console.log(selectedMedia);

// function totaleLikesFooter () {


// const totalLikes = document.querySelector(".footer__likes--total");
// let totalLikesArray = [];
// totalLikesArray.push(selectedMedia.likes);
// let sum = totalLikesArray.reduce((partialSum, a) => partialSum + a, 0);

// let totalMediaLike = totalLikesArray;
// totalLikes.innerHTML = `${sum}`;
// console.log(totalLikesArray);
// console.log(totalMediaLike);
// console.log(sum);

// }

// totaleLikesFooter ();

// function likeNumber () {

// }


// const selectedMedia = await getMediaData (photographer_Id);
// console.log(selectedMedia);

async function photographerFooter (photographer) {
  const photographerpherPrice = document.querySelector(".footer__priceday").innerHTML = `${photographer.price}/jours`;
}
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
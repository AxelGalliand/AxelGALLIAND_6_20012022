async function fetchPhotographers() {
  return fetch("../../../data/photographers.json")
  .then(function(result) {
    if(result.ok) {
      return result.json();
    }
  })
}

// const getPhotographerData = async (UserId) => {
//   const data = await fetchPhotographers ();
//   const selectedPhotographer = data.photographers.filter ((photographer) => photographer.id === UserId ) [0]
// console.log(selectedPhotographer);
//   return getPhotographerData;
// }

// const getMediaData = async () => {
//   const data = await fetchPhotographers ();
//   return data.media;
// }

const photographer_Id = Number (new URLSearchParams(window.location.search).get("id"));

async function photographerHeader () {
  const data = await fetchPhotographers ();
  const selectedPhotographer = data.photographers.filter ((photographer) => photographer.id === photographer_Id ) [0]

  const photographerheaderSection = document.querySelector(".photographer-header");
  const photographerHeader__content = document.createElement("article");
  photographerHeader__content.className = "photographer__headerContent";
  photographerHeader__content.innerHTML = `
  <article class="photographer__info"> 
    <h1 class="photographer__h1">${selectedPhotographer.name}</h1>
    <p class="photographer__local">${selectedPhotographer.city}, ${selectedPhotographer.country}</p>
    <p class="photographer__tagline">${selectedPhotographer.tagline}</p>
  </article>
  <button class="contact_button">Contactez-moi</button>
  <img class="photographer__portrait" src="Sample_Photos/Photographers_ID_Photos/${selectedPhotographer.portrait}" alt="portrait de ${selectedPhotographer.name}"> `;

 photographerheaderSection.appendChild(photographerHeader__content);

//  return getPhotographerData;
}
photographerHeader();
async function photographerPortfolio () {
const data = await fetchPhotographers ();
const selectedMedia = data.media.filter ((media) => media.photographerId === photographer_Id) [0]
console.log(selectedMedia);
  const photographerMediaSection = document.querySelector(".photographer__portfolio");
  const photographerMedia__content = document.createElement("article");
  photographerMedia__content.className = "photographer__portfolio--media";
  if (selectedMedia.video) {
  photographerMedia__content.innerHTML = `
   <video class="photographer__portfolio--media--content" poster="Sample_Photos/${selectedMedia.video}">
      <source src="Sample_Photos/${selectedMedia.video}#t=0.1" type="video/mp4">
   </video>  
   <div class="photographer__portfolio--media--info">
      <h3 class="photographer__portfolio--media--info--title">${selectedMedia.title}</h3>
      <div class="photographer__portfolio--media--info--like">
        <span class="photographer__portfolio--media--info--like--count">${selectedMedia.likes}</span>
        <i class="fa-heart far photographer__portfolio--media--info--like--heart"></i>
      </div>
   </div>
  `;
  }else {
  photographerMedia__content.innerHTML = `
      <img class="photographer__portfolio--media--content" src="Sample_Photos/${selectedMedia.image}">
    <div class="photographer__portfolio--media--info">
      <h3 class="photographer__portfolio--media--info--title">${selectedMedia.title}</h3>
      <div class="photographer__portfolio--media--info--like">
        <span class="photographer__portfolio--media--info--like--count">${selectedMedia.likes}</span>
        <i class="fa-heart far photographer__portfolio--media--info--like--heart"></i>
      </div>
    </div>`;
  }

 photographerMediaSection.appendChild(photographerMedia__content);

}
photographerPortfolio ();



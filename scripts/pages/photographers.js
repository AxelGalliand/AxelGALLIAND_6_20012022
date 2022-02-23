async function fetchPhotographers() {
  return fetch("../../../data/photographers.json")
  .then(function(result) {
    if(result.ok) {
      return result.json();
    }
  })
  
}

const getPhotographerData = async (photographerId) => {
  const data = await fetchPhotographers ();
  const selectedPhotographer = data.photographers.filter ((photographer) => photographer.id === photographerId ) [0]
  console.log(selectedPhotographer);
  return selectedPhotographer;
}

// const getMediaData = async () => {
//   const data = await fetchPhotographers ();
//   return data.media;
// }

const photographerId = Number (new URLSearchParams(window.location.search).get("id"));
console.log(typeof photographerId);
getPhotographerData(photographerId);



async function photographerHeader () {
  const data = await getPhotographerData();
console.log(data);


  const photographerheaderSection = document.querySelector(".photographer-header");

  const photographerHeader__content = document.createElement("article");
  photographerHeader__content.className = "photographer__headerContent";
  photographerHeader__content.innerHTML = `
  <article class="photographer__info"> 
    <h1 class="photographer__h1">${getPhotographerData.name}</h1>
    <p class="photographer__local">London, UK</p>
    <p class="photographer__tagline">teste de tagline asser long pour voir </p>
  </article>
  <button class="contact_button">Contactez-moi</button>
  <img class="photographer__portrait" src="Sample_Photos/Photographers_ID_Photos/MimiKeel.jpg"> `;


 photographerheaderSection.appendChild(photographerHeader__content);

 return photographerHeader;
}

photographerHeader();




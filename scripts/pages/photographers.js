import {displayModal, closeModal} from "../utils/contactForm.js"
import { MediaFactory } from "../factories/medias.js"

/**
 * fonction async qui returns une promesse des données fetcher dans le dossier photographers.json
 * @async
 * @returns données fetcher dans le dossier photographers.json
 */
async function fetchPhotographers() {
  return fetch("./data/photographers.json")
  .then(function(result) {
    if(result.ok) {
      return result.json();
    }
  })
}

/**
 * const triant le photographe en fonction de son id et celui dans l'url de la page
 * @param {number} UserId 
 * @returns {number} l'ID du photographe corespondant 
 */
const getPhotographerData = async (UserId) => {
  const data = await fetchPhotographers ();
  const selectedPhotographer = data.photographers.filter((photographer) => photographer.id === UserId ) [0]
  return selectedPhotographer;
}

/**
 * fonction creant le header de la page photographer avec les bonnes informations fetchées
 * @param {{index: string, name: string, city: string, country: string, tagline: string, price: number, picture: string}} photographer 
 */
async function photographerHeader (photographer) {
  const photographerheaderSection = document.querySelector(".photographer-header");
  const photographerHeader__content = document.createElement("article");
  photographerHeader__content.className = "photographer__headerContent";
  photographerHeader__content.innerHTML = `
  <article class="photographer__info"> 
    <h1 class="photographer__h1" aria-label="${photographer.name}">${photographer.name}</h1>
    <p class="photographer__local" aria-label="localisation du photographe">${photographer.city}, ${photographer.country}</p>
    <p class="photographer__tagline" aria-label="slogan du photographe">${photographer.tagline}</p>
  </article>
  <button class="contact_button" aria-label="formulaire de contact">Contactez-moi</button>
  <img class="photographer__portrait" src="Sample_Photos/Photographers_ID_Photos/${photographer.portrait}" alt="portrait de ${photographer.name}" aria-label="portrait de ${photographer.name}"> `;

 photographerheaderSection.appendChild(photographerHeader__content);
}

/**
 * const triant les media en fontion di l'id du photographe 
 * @param {{id: number, photographerId : number, title: string, image: string, likes: number, date: number, price: number}} photographerMedia_Id 
 * @returns Array des medias du photographe
 */
const getMediaData = async (photographerMedia_Id) => {
  const data = await fetchPhotographers ();
  const selectedMediaFilter = data.media.filter ((media) => media.photographerId === photographerMedia_Id);
  return selectedMediaFilter;
}

/**
 * fonction calculant la somme des likes de chaque media et l'affiche en footer 
 * @param {{id: number, photographerId : number, title: string, image: string, likes: number, date: number, price: number}} medias 
 */
function totalLikes (medias) {
  const totalLikesDom = document.querySelector(".footer__likes--total");
  let totalLikesArray = [];
  for(const media of medias)
  {
  totalLikesArray.push(media.getLike());

  let sum = totalLikesArray.reduce((partialSum, a) => partialSum + a);
  
  totalLikesDom.innerHTML = `${sum}`;
  }
  
}

/**
 * fonction creant le portfolio du photograhe et l'interation des likes 
 * @param {{id: number, photographerId : number, title: string, image: string, likes: number, date: number, price: number}} medias 
 */
async function photographerPortfolio (medias) {
  for(const media of medias)
  {
    media.render()
  }
  
  totalLikes (medias);
  
    const dataLikes = document.querySelectorAll(".photographer__portfolio--media--info--like");
   
    dataLikes.forEach((dataLike, idx) => {
      const likesQuantity = dataLike.querySelector(".photographer__portfolio--media--info--like--count");
      const likeHeart = dataLike.querySelector("#like__heart");
      console.log(medias[0].isLiked)
      const likeAction = () => {
        medias[idx].isLiked = !medias[idx].isLiked;
  
        if (medias[idx].isLiked) {
          medias[idx].inc();
          likeHeart.classList.remove("far");
          likeHeart.classList.add("fas");
          totalLikes (medias)
        }else {
          medias[idx].dec();
          likeHeart.classList.remove("fas");
          likeHeart.classList.add("far");
          totalLikes (medias)
        }
      
        likesQuantity.textContent = medias[idx].getLike();
      }
      dataLike.addEventListener("click", likeAction )
      dataLike.addEventListener("enter", likeAction )
    })
}

async function photographerFooter (photographer) {
document.querySelector(".footer__priceday").innerHTML = `${photographer.price}/jours`;
}

/**
 * const recuperant l'id dans l'url de la page 
 */
const photographer_Id = Number (new URLSearchParams(window.location.search).get("id"));

const selectedPhotographer = await getPhotographerData (photographer_Id);
console.log (selectedPhotographer);
/**
 * let permetant de tirer les medias
 */
let  selectedMedia = await getMediaData (photographer_Id);
selectedMedia = selectedMedia.map((data) => MediaFactory(data));
console.log(selectedMedia);

function mediaSortDate () {
// selectedMedia.sort((a,b) => b.date - a.date)
selectedMedia.sort((a,b) => b.date < a.date ? -1 : 1)
}

function mediaSortpopularity () {
  // selectedMedia.sort((a,b) => b.likes - a.likes)
  selectedMedia.sort((a,b) => b.likes < a.likes ? -1 : 1)
}

function mediaSortTitle () {
  // selectedMedia.sort((a,b) => b.title - a.title)
  selectedMedia.sort((a,b) => b.title < a.title ? 1 : -1)
}

photographerHeader(selectedPhotographer);

photographerPortfolio (selectedMedia);

document.querySelector (".contact_button")
.addEventListener ("click",function(){
  displayModal (selectedPhotographer.name)
}) 


const closecross = document.querySelectorAll (".closeCross");

closecross.forEach((elem) => {
  elem.addEventListener ("click",function(){
    closeModal ()
  })
});

document.querySelector (".photographer__selectOption").addEventListener ("change", (e) => {
  console.log("before", selectedMedia);

  switch (e.target.value) {
    case 'date':
      mediaSortDate()
      break;
    case 'popularité':
      mediaSortpopularity()
      break;
    case 'titre':
      mediaSortTitle ()
      break;
    default:
      mediaSortpopularity()
  }

  console.log("after", selectedMedia);
  const photographerMediaSection = document.querySelector(".photographer__portfolio");
  photographerMediaSection.innerHTML = "";

  photographerPortfolio (selectedMedia);
  lightbox.init();
});

/**
 * @property {HTMLElement} element
 * @property {string[]} gallery Array des medias trillés
 * @property {tring} url URL du media afiché
 */
class lightbox {
   static init (){
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
    const gallery = links.map(link => link.getAttribute('href'))
     links.forEach(link => link.addEventListener('click' , e => {
       e.preventDefault()
       new lightbox(e.currentTarget.getAttribute('href'), gallery)
       console.log(gallery);
     }))
   }

   /**
    * @param {string} url URL du media
    * @param {string[]} gallery Array des medias trillés
    */
   constructor (url, gallery) {
    this.element = this.buildDOM(url)
    this.medias = gallery
    this.loadMedia(url)
    this.onKeyUp = this.onKeyUp.bind(this)
    document.body.appendChild(this.element)
    document.querySelector('.lightbox__close').focus();
    document.addEventListener('keydown', this.onKeyUp)
   }
    
   /**
    * @param {string} url URL du media
    */
   loadMedia (url) {
     if (url.endsWith(".jpg")) {
      this.url = null
      const image = new Image()
      const container = this.element.querySelector('.lightbox__container')
      container.innerHTML = ''
      image.onload = () => {
        container.appendChild(image)
        this.url = url
      }
      image.src = url
     } else {
      this.url = null;
      const video = document.createElement("video");
      video.setAttribute("controls", "");
      video.width = 950;
      video.height = 520;
      video.setAttribute("tabindex", "3");
      video.classList.add("lightbox__video")
      const videoSource = document.createElement("source");
      videoSource.setAttribute("src", `${url}`);
      videoSource.setAttribute("type", "video/mp4");

      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = ""
      video.innerHTML = videoSource;

      container.appendChild(video);

      const containerVideo = this.element.querySelector(".lightbox__container video");
      containerVideo.appendChild(videoSource);

      this.url = url;
      video.src = url;
    }
    
   }
   
    /**
     * @param {KeyboardEvent} e 
     */
    onKeyUp (e) {
      if (e.key == 'Escape') {
        this.close(e)
      } else if (e.key == 'ArrowLeft') {
        this.prev(e)
      } else if (e.key == 'ArrowRight') {
        this.next(e)
      } else if (e.key === "Tab") {
        if( document.activeElement === document.querySelector('.lightbox__prev')) {
        
              e.preventDefault()
              document.querySelector('.lightbox__close').focus()
        } 
      }
    }
    
    /**
     * @param {MouseEvent|KeyboardEvent} e 
     */
    close (e) {
      e.preventDefault()
      this.element.classList.add('fadeOut')
      window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element)
      }, 500)
      document.removeEventListener('keyup', this.onKeyUp)
    }

     /**
     * @param {MouseEvent|KeyboardEvent} e 
     */
    next (e) {
      e.preventDefault ()
      let i = this.medias.findIndex(image => image == this.url)
      if (i == this.medias.length - 1) {
        i= -1
      }
      this.loadMedia(this.medias[i + 1])
      const imageDomList = [...document.querySelectorAll(".photographer__portfolio--media--content")];
      const videoSourceDomList = [...document.querySelectorAll(".photographer__portfolio--media--video > source")]; 
      const selectedMediaDom = [...imageDomList,...videoSourceDomList].find((img) => img.src.includes(this.medias[i + 1]) );

      document.querySelector(".lightbox__title").textContent = selectedMediaDom.title;
    }

     /**
     * @param {MouseEvent|KeyboardEvent} e 
     */
    prev (e) {
      e.preventDefault ()
      let i = this.medias.findIndex(image => image == this.url)
      if (i == 0) {
        i = this.medias.length
      }
      this.loadMedia(this.medias[i - 1])
      const imageDomList = [...document.querySelectorAll(".photographer__portfolio--media--content")];
      const videoSourceDomList = [...document.querySelectorAll(".photographer__portfolio--media--video > source")]; 
      const selectedMediaDom = [...imageDomList,...videoSourceDomList].find((img) => img.src.includes(this.medias[i - 1]) );

      document.querySelector(".lightbox__title").textContent = selectedMediaDom.title;
    }

    /**
     * @param {string} url URL du media
     * @returns {HTMLElement}
     */
    buildDOM (url) {
      const dom = document.createElement('div')
      const imageDomList = [...document.querySelectorAll(".photographer__portfolio--media--content")];
      const videoSourceDomList = [...document.querySelectorAll(".photographer__portfolio--media--video > source")]; 

      const selectedMediaDom = [...imageDomList,...videoSourceDomList ].find((img) => img.src.includes(url) );

      console.log(selectedMediaDom)
      dom.classList.add('lightbox')
      dom.innerHTML = `<button class="lightbox__close" tabindex="1"></button>
      <button class="lightbox__next" tabindex="2"></button>
      <button class="lightbox__prev" tabindex="4"></button>
      <div class="lightbox__container"></div>
      <div class="lightbox__title">${selectedMediaDom.title}</div>`

      dom.querySelector('.lightbox__close').addEventListener('click',
      this.close.bind(this))  
      dom.querySelector('.lightbox__next').addEventListener('click',
      this.next.bind(this))
      dom.querySelector('.lightbox__prev').addEventListener('click',
      this.prev.bind(this))
      return dom

    }

}

   lightbox.init();


photographerFooter(selectedPhotographer);

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
  const selectedMediaFilter = data.media.filter ((media) => media.photographerId === photographerMedia_Id);
  return selectedMediaFilter;
}

function totalLikes (medias) {
  const totalLikesDom = document.querySelector(".footer__likes--total");
  let totalLikesArray = [];
  for(const media of medias)
  {
  // totalLikesArray.push(media.likes);
  totalLikesArray.push(media.getLike());

  let sum = totalLikesArray.reduce((partialSum, a) => partialSum + a);
  
  totalLikesDom.innerHTML = `${sum}`;
  }
  
}

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
      dataLike.addEventListener("click",  () => {
        medias[idx].isLiked = !medias[idx].isLiked;
  
        if (medias[idx].isLiked) {
          // medias[idx].likes += 1;
          medias[idx].inc();
          console.log(medias[idx].getLike())
          likeHeart.classList.remove("far");
          likeHeart.classList.add("fas");
          totalLikes (medias)
        }else {
          // medias[idx].likes -= 1;
          medias[idx].dec();
          likeHeart.classList.remove("fas");
          likeHeart.classList.add("far");
          totalLikes (medias)
        }
      
      // likesQuantity.textContent = medias[idx].likes;
        likesQuantity.textContent = medias[idx].getLike();
      })
    })
  
}

async function photographerFooter (photographer) {
  const photographerpherPrice = document.querySelector(".footer__priceday").innerHTML = `${photographer.price}/jours`;
}


const photographer_Id = Number (new URLSearchParams(window.location.search).get("id"));

const selectedPhotographer = await getPhotographerData (photographer_Id);
console.log (selectedPhotographer);

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

const closeCross = document.querySelectorAll (".closecross");

closeCross.forEach((elem) => {
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

class lightbox {
   static init (){
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
    const gallery = links.map(link => link.getAttribute('href'))
     links.forEach(link => link.addEventListener('click' , e => {
       e.preventDefault()
       new lightbox(e.currentTarget.getAttribute('href'), gallery)
     }))
   }

   constructor (url, gallery) {
    this.element = this.buildDOM(url)
    this.images = gallery
    this.loadImage(url)
    this.onKeyUp = this.onKeyUp.bind(this)
    document.body.appendChild(this.element)
    document.addEventListener('keyup', this.onKeyUp)
   }

   loadImage (url) {
     this.url = null
    const image = new Image()
    const container = this.element.querySelector('.lightbox__container')
    container.innerHTML = ''
    image.onload = () => {
      container.appendChild(image)
      this.url = url
    }
    image.src = url
   }
   
onKeyUp (e) {
  if (e.key == 'Escape') {
    this.close(e)
  } else if (e.key == 'ArrowLeft') {
    this.prev(e)
  } else if (e.key == 'ArrowRight') {
    this.next(e)
  }
}

close (e) {
  e.preventDefault()
  this.element.classList.add('fadeOut')
  window.setTimeout(() => {
  this.element.parentElement.removeChild(this.element)
  }, 500)
  document.removeEventListener('keyup', this.onKeyUp)
}

next (e) {
  e.preventDefault ()
  let i = this.images.findIndex(image => image == this.url)
  if (i == this.images.length - 1) {
    i= -1
  }
  this.loadImage(this.images[i + 1])
}

prev (e) {
  e.preventDefault ()
  let i = this.images.findIndex(image => image == this.url)
  if (i == 0) {
    i = this.images.length
  }
  this.loadImage(this.images[i - 1])
}

   buildDOM (url) {
     const dom = document.createElement('div')
     dom.classList.add('lightbox')
     dom.innerHTML = `<button class="lightbox__close"></button>
     <button class="lightbox__next"></button>
     <button class="lightbox__prev"></button>
     <div class="lightbox__container"></div>
     <div class="lightbox__title">${url.title}</div>`
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

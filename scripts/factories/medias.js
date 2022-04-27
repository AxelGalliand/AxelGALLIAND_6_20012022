// export function MediaFactory(mediaData) {
//     let id = mediaData.id;
//     let title = mediaData.title;
//     let image = mediaData.image;
//     let video = mediaData.video;
//     let likes = mediaData.likes;
//     let date = mediaData.date;
//     let price = mediaData.price;

//     function dec() {
//       likes = likes - 1;
//     }

//     function inc() {
//       likes = likes + 1;
//     }

//     function getLike() {
//       return likes;
//     }

//     function render() {

//           const photographerMediaSection = document.querySelector(".photographer__portfolio");
//           const photographerMedia__content = document.createElement("article");
//           photographerMedia__content.className = "photographer__portfolio--media";
      
//           if (video) {
//           photographerMedia__content.innerHTML = `
//            <a href="Sample_Photos/${video}"> 
//             <video class="photographer__portfolio--media--video" poster="Sample_Photos/${video}">
//               <source src="Sample_Photos/${video}#t=0.1" type="video/mp4">
//             </video> 
//            </a>  
//            <div class="photographer__portfolio--media--info">
//             <h3 class="photographer__portfolio--media--info--title">${title}</h3>
//             <div class="photographer__portfolio--media--info--like">
//               <span class="photographer__portfolio--media--info--like--count">${likes}</span>
//               <i id="like__heart" class="far fa-heart photographer__portfolio--media--info--like--heart"></i>
//             </div>
//            </div>
//           `;
//           }else {
//            photographerMedia__content.innerHTML = `
//             <a href="Sample_Photos/${image}">
//               <img class="photographer__portfolio--media--content" src="Sample_Photos/${image}">
//             </a>  
//             <div class="photographer__portfolio--media--info">
//              <h3 class="photographer__portfolio--media--info--title">${title}</h3>
//              <div class="photographer__portfolio--media--info--like">
//               <span class="photographer__portfolio--media--info--like--count">${likes}</span>
//               <i id="like__heart" class="far fa-heart photographer__portfolio--media--info--like--heart"></i>
//              </div>
//             </div>`;
//           } 
          
//          photographerMediaSection.appendChild(photographerMedia__content);
         
//     }
    
//     return {id, title, image, video, likes, date ,price, render, inc, getLike, dec}
// }



class Media {
  constructor(mediaData) {
    this.id = mediaData.id;
    this.title = mediaData.title;
    this.image = mediaData.image;
    this.isLiked = false;
    this.video = mediaData.video;
    this.likes = mediaData.likes;
    this.date = mediaData.date;
    this.price = mediaData.price;
  }

  dec() {
    this.likes = this.likes - 1;
  }

  inc() {
    this.likes = this.likes + 1;
  }

  getLike() {
    return this.likes;
  }

}



class Video extends Media{

  render() {

        const photographerMediaSection = document.querySelector(".photographer__portfolio");
        const photographerMedia__content = document.createElement("article");
        photographerMedia__content.className = "photographer__portfolio--media";
    
        photographerMedia__content.innerHTML = `
         <a href="Sample_Photos/${this.video}" alt="${this.title}"> 
          <video class="photographer__portfolio--media--video" poster="Sample_Photos/${this.video} ">
            <source title="${this.title}" src="Sample_Photos/${this.video}#t=0.1" type="video/mp4">
          </video> 
         </a>  
         <div class="photographer__portfolio--media--info">
          <h3 class="photographer__portfolio--media--info--title">${this.title}</h3>
          <div class="photographer__portfolio--media--info--like">
            <span class="photographer__portfolio--media--info--like--count">${this.likes}</span>
            <button id="like__heart" class="${this.isLiked === true ? 'fas' : 'far'} fa-heart photographer__portfolio--media--info--like--heart" aria-labelledby="bouton j'aime"></button>
          </div>
         </div>
        `;
        
        
       photographerMediaSection.appendChild(photographerMedia__content);
       
  }
}

class Image extends Media {


  render() {

        const photographerMediaSection = document.querySelector(".photographer__portfolio");
        const photographerMedia__content = document.createElement("article");
        photographerMedia__content.className = "photographer__portfolio--media";
    
    
         photographerMedia__content.innerHTML = `
          <a href="Sample_Photos/${this.image}">
            <img title="${this.title}" class="photographer__portfolio--media--content" src="Sample_Photos/${this.image}" alt="${this.title}">
          </a>  
          <div class="photographer__portfolio--media--info">
           <h3 class="photographer__portfolio--media--info--title">${this.title}</h3>
           <div class="photographer__portfolio--media--info--like">
            <span class="photographer__portfolio--media--info--like--count">${this.likes}</span>
            <button id="like__heart" class="${this.isLiked === true ? 'fas' : 'far'} fa-heart photographer__portfolio--media--info--like--heart" aria-labelledby="bouton j'aime"></button>
           </div>
          </div>`;
        
        
       photographerMediaSection.appendChild(photographerMedia__content);
       
  }
}

export function MediaFactory(mediaData) {
  if (mediaData.video) {
    return new Video(mediaData);
  } else {
    return new Image(mediaData)
  }
}



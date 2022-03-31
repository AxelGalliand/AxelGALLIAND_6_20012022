export function MediaFactory(mediaData) {
    let id = mediaData.id;
    let title = mediaData.title;
    let image = mediaData.image;
    let video = mediaData.video;
    let likes = mediaData.likes;
    let date = mediaData.date;
    let price = mediaData.price;



    function render() {

          const photographerMediaSection = document.querySelector(".photographer__portfolio");
          const photographerMedia__content = document.createElement("article");
          photographerMedia__content.className = "photographer__portfolio--media";
      
          if (video) {
          photographerMedia__content.innerHTML = `
           <video class="photographer__portfolio--media--video" poster="Sample_Photos/${video}">
            <source src="Sample_Photos/${video}#t=0.1" type="video/mp4">
           </video>  
           <div class="photographer__portfolio--media--info">
            <h3 class="photographer__portfolio--media--info--title">${title}</h3>
            <div class="photographer__portfolio--media--info--like">
              <span class="photographer__portfolio--media--info--like--count">${likes}</span>
              <i id="like__heart" class="far fa-heart photographer__portfolio--media--info--like--heart"></i>
            </div>
           </div>
          `;
          }else {
           photographerMedia__content.innerHTML = `
            <img class="photographer__portfolio--media--content" src="Sample_Photos/${image}">
            <div class="photographer__portfolio--media--info">
             <h3 class="photographer__portfolio--media--info--title">${title}</h3>
             <div class="photographer__portfolio--media--info--like">
              <span class="photographer__portfolio--media--info--like--count">${likes}</span>
              <i id="like__heart" class="far fa-heart photographer__portfolio--media--info--like--heart"></i>
             </div>
            </div>`;
          } 
          
         photographerMediaSection.appendChild(photographerMedia__content);
         
        //  const dataLikes = document.querySelector(".photographer__portfolio--media--info--like");
        //  dataLikes.onclick = incLike;
        //  function incLike() {
        //  document.getElementById('like__heart').className = "fas fa-heart photographer__portfolio--media--info--like--heart";

        //  }
        //    console.log(incLike);
    }
        
        // const dataLikes = document.querySelector(".photographer__portfolio--media--info--like");
        // dataLikes .addEventListener("click", incLike) ;
        // function incLike() {
        //   document.getElementById('like__heart').className = "fa-heat fas photographer__portfolio--media--info--like--heart";
    
        //     likes += 1 ;
        //     // mettre a jour le dom de ce media
        // }

    return {id, title, image, video, likes, date ,price, render}
}

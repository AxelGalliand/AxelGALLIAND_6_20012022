
// function photographerPageFactory(data) {
//   const { name, city, country, tagline } = data;




//   function createPhotographerPage() {

//     const h1 = document.createElement( 'h1' );
//     h1.textContent = name;
//     const para = document.createElement( 'p' );
//     para.className = "photographer__local";
//     para.textContent = city.concat(", ").concat(country);
//     const tag = document.createElement( 'p' );
//     tag.className = "photographer__tagline";
//     tag.textContent = tagline;
//     return (h1, para, tag);
//   }
//   return { name, city, country, tagline, createPhotographerPage}
// }
//   async function getPhotographers () {
//   const photographers = [
//       {
//           name: "Ma data test",
//           id: 1,
//           city: "Paris",
//           country: "France",
//           tagline: "Ceci est ma data test",
//           price: 400,
//           portrait: "MimiKeel.jpg"
//       }
//     ]
//     return ({
//       photographers: [...photographers]
//     });
//   }
//     async function displayData(photographers) {
//       const photographersSection = document.querySelector(".photograph-header");
    
//       photographers.forEach((photographer) => {
//           const photographerModel = photographerPageFactory(photographer);
//           const userCardDOM = photographerModel.createPhotographerPage();
//           photographersSection.appendChild(userCardDOM);
//       });
//     }

//     async function initpage() {
//       // Récupère les datas des photographes
//       const { photographers } = await getPhotographers();
//       displayData(photographers);
//   }
  
//   initpage();

function photographerFactory(data) {
  const { name, city, country, tagline, price, portrait } = data;

  const picture = `Sample_Photos/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
      const article = document.createElement( 'article' );
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture)
      const h2 = document.createElement( 'h2' );
      h2.textContent = name;
      const para = document.createElement( 'p' );
      para.textContent = city;
      //para.textContent = country;
      const tag = document.createElement( 'p' );
      tag.textContent = tagline;
      const prices = document.createElement( 'p' );
      prices.textContent = price;
     // prices.textContent = "€/jours";
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(para);
      article.appendChild(tag);
      article.appendChild(prices);
      return (article);
  }
  return { name, city, country, tagline, price, picture, getUserCardDOM }
}



async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const photographers = [
      {
          name: "Ma data test",
          id: 1,
          city: "Paris",
          country: "France",
          tagline: "Ceci est ma data test",
          price: 400,
          portrait: "MimiKeel.jpg"
      },
      {
          "name": "Autre data test",
          "id": 2,
          "city": "Londres",
          "country": "UK",
          "tagline": "Ceci est ma data test 2",
          "price": 500,
          "portrait": "RhodeDubois.jpg"
      },
  ]
  // et bien retourner le tableau photographers seulement une fois
  return ({
      photographers: [...photographers]});
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
  });
};

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();

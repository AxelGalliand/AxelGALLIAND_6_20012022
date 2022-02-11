export function photographerFactory(data) {
  const { name, city, country, tagline, price, portrait } = data;

  const picture = `Sample_Photos/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
      const article = document.createElement( 'article' );
      const img = document.createElement( 'img' );
      img.className = "img__portrait";
      img.setAttribute("src", picture);
      const h2 = document.createElement( 'h2' );
      h2.textContent = name;
      const para = document.createElement( 'p' );
      para.className = "card__local";
      para.textContent = city.concat(", ").concat(country);
      const tag = document.createElement( 'p' );
      tag.className = "card__tagline";
      tag.textContent = tagline;
      const prices = document.createElement( 'p' );
      prices.className = "card__price";
      prices.textContent = price;
      prices.insertAdjacentHTML("beforeend","€/jour");
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(para);
      article.appendChild(tag);
      article.appendChild(prices);
      return (article);
  }
  return { name, city, country, tagline, price, picture, getUserCardDOM }
}


// const myImg = new Image(27,"titre","http://fdsfds.com/fdsfdds.jpg")
// myImg.render()


// function photographerFactory(data) {
//   const { name, portrait } = data;

//   const picture = `Sample_Photos/Photographers_ID_Photos/${portrait}`;

//   function getUserCardDOM() {
//       const article = document.createElement( 'article' );
//       const img = document.createElement( 'img' );
//       img.setAttribute("src", picture)
//       const h2 = document.createElement( 'h2' );
//       h2.textContent = name;
//       article.appendChild(img);
//       article.appendChild(h2);
//       return (article);
//   }
//   return { name, picture, getUserCardDOM }
// }
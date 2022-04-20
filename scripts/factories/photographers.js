export function photographerFactory(data) {
  const {id, name, city, country, tagline, price, portrait } = data;

  const picture = `Sample_Photos/Photographers_ID_Photos/${portrait}`;
  const index = `data/photographers.json/${id}`;

  function getUserCardDOM() {
      const article = document.createElement( 'article' );
      const link = document.createElement( 'a' );
      link.className = "card__link";
      link.href += `photographer.html?id=${id}`;
      const img = document.createElement( 'img' );
      img.className = "img__portrait";
      img.setAttribute("src", picture);
      img.setAttribute("alt", "portrait du photographe");
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
      article.appendChild(link);
      link.appendChild(img);
      link.appendChild(h2);
      article.appendChild(para);
      article.appendChild(tag);
      article.appendChild(prices);
      return (article);
  }
  return { index, name, city, country, tagline, price, picture, getUserCardDOM }
}
function photographerFactory(data) {
    const { name, portrait, id, country, tagline, price, city } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add('photographerCard')

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.alt=`Portrait de ${name}`;

        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?id=${id}`)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;

        const catchline = document.createElement ('p');
        catchline.textContent = tagline;

        const pricing = document.createElement ('p');
        pricing.textContent = `${price}€/jour`;


        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(catchline);
        article.appendChild(pricing);


        return (article);
    }
    return { name, picture, getUserCardDOM }
}

export {photographerFactory};
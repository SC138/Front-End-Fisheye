const generatephotographerCard = (onePhotographer)=>{
    // je cible les élélments correspondant au fichier .JSON
    const { name, portrait, id, country, tagline, price, city } = onePhotographer;

    // je créer une constante pour cibler les portraits via un chemin
    const picture = `assets/photographers/${portrait}`;


    // création d'un élément 'article' puis ajout d'une classe associée 
    const article = document.createElement( 'article' );
    article.classList.add('photographerCard')

    // création d'un élément image
    const img = document.createElement( 'img' );

    // ajout d'un attribut qui permet de cibler dynamiquement le chemin de picture
    img.setAttribute("src", picture);
    // ajout de alt pour l'accéssibilité en ciblant dynamiquement le nom du photographe
    img.alt=`Portrait de ${name}`;

    //création d'un élément 'a' pour un lien
    const link = document.createElement('a');
    // ajout d'un attribut qui permet de cibler dynamiquement l'id d'un photographe
    link.setAttribute("href", `photographer.html?id=${id}`)

    // création d'un élément h2
    const h2 = document.createElement( 'h2' );
    // je stipule que le h2 doit afficher name
    h2.textContent = name;

    // création d'un élément p
    const location = document.createElement( 'p' );
    // je stipule que le p cible dynamiquement city et country en fonction du photographe
    location.textContent = `${city}, ${country}`;

    // création d'un élément p 
    const catchline = document.createElement ('p');
    // je stipule que le p doit afficher la tagline
    catchline.textContent = tagline;

    // création d'un élément p
    const pricing = document.createElement ('p');
    // je stipule que le p doit afficher dynamiquement le price en fonction du photographe suivit du text
    pricing.textContent = `${price}€/jour`;


    // ajout des éléments à la carte du photographe
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(catchline);
    article.appendChild(pricing);

    // retourne la carte du photographe
    return (article);
}
export {generatephotographerCard};
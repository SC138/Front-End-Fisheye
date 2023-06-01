// import { photographerFactory } from "../factories/photographerFactory";

// const data = photographerFactory();

async function dataPhotographers(file){
    const response = await fetch (file);
    const data = await response.json();
    return data;
};


function findPhotographer(photographers, id){
    const photographer = photographers.find(photographer => photographer.id === id);
    return photographer;
};

function headerPhotographer(photographer){
    const photographHeader = document.querySelector(".photograph-header");
    // création d'un élément image
    const img = document.createElement( 'img' );

    // ajout d'un attribut qui permet de cibler dynamiquement le chemin de picture
    img.setAttribute("src", `../assets/photographers/${photographer.portrait}`);

    // ajout de alt pour l'accéssibilité en ciblant dynamiquement le nom du photographe
    img.alt=`Portrait de ${photographer.name}`;

    // création d'un élément h2
    const h2 = document.createElement( 'h2' );
    // je stipule que le h2 doit afficher name
    h2.textContent = `${photographer.name}`;
    // j'ajoute une class pour le css
    h2.classList.add("name_photographer");

    // création d'un élément p
    const location = document.createElement( 'p' );
    // je stipule que le p cible dynamiquement city et country en fonction du photographe
    location.textContent = `${photographer.city}, ${photographer.country}`;
    // j'ajoute une class pour le css
    location.classList.add("location");

    // création d'un élément p 
    const catchline = document.createElement ('p');
    // je stipule que le p doit afficher la tagline
    catchline.textContent = `${photographer.tagline}`;
    // j'ajoute une class pour le css
    catchline.classList.add("catchline");

    photographHeader.appendChild(img);
    photographHeader.appendChild(h2);
    photographHeader.appendChild(location);
    photographHeader.appendChild(catchline);
};







async function init(){
    const data = await dataPhotographers("../../data/photographers.json");
    const {photographers} = data;
    const urlParams = new URLSearchParams(window.location.search);
    const photographerID = parseInt (urlParams.get("id"));
    const photographer = findPhotographer(photographers, photographerID);
    const photographerName = document.querySelector(".photographer_name");
    photographerName.textContent = photographer.name;
    headerPhotographer(photographer);
};



init();


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

    photographHeader.appendChild(img);
};



// const photographerName = document.querySelector(".photographer_name");
// photographerName.textContent = photographer.name;

async function init(){
    const data = await dataPhotographers("../../data/photographers.json");
    const {photographers} = data;
    const urlParams = new URLSearchParams(window.location.search);
    const photographerID = parseInt (urlParams.get("id"));
    const photographer = findPhotographer(photographers, photographerID);
    headerPhotographer(photographer);
};



init();
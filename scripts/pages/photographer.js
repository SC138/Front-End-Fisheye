import {mediaFactory} from "../factories/mediaFactory.js";

async function dataPhotographers(file){
    // la const response, elle attend le chargement du fichier
    const response = await fetch (file);
    const datas = await response.json();
    return datas;
};

// je créer la function findPhotographer avec les paramètres : photographers, id
function findPhotographer(photographers, id){
    // je défini chaque photographer comme étant le photographe associé à l'id passé en paramètre
    // photographers.find me permet d'aller rechercher dans le fichier JSON le tableau photographers
    // et individuellement le photographe et son ID
    const photographer = photographers.find(photographer => photographer.id === id);
    // je retourne le photographe pour qu'il s'affiche
    return photographer;
};

function headerPhotographer(photographer){
    const photographHeader = document.querySelector(".photograph-header");
    // création d'un élément image
    const img = document.createElement( 'img' );

    // ajout a la balise img un attribut src pour définir le chemin d'accès à l'image
    // img.setAttribute("src", `../assets/photographers/${photographer.portrait}`);
    img.setAttribute("src", "../assets/photographers/" + photographer.portrait);


    // ajout de l'attribut alt pour l'accéssibilité 
    // img.alt=`Portrait de ${photographer.name}`;
    img.alt= "Portrait de" + photographer.name;

    // création d'un élément h2
    const h2 = document.createElement( 'h2' );
    // je stipule que le h2 doit afficher name
    h2.textContent = `${photographer.name}`;
    // j'ajoute une class pour le css
    h2.classList.add("name_photographer");

    // création d'un élément p
    const location = document.createElement( 'p' );
    // Affiche les variables city et country dans mon paragraphe
    location.textContent = `${photographer.city}, ${photographer.country}`;
    // j'ajoute une class pour le css
    location.classList.add("location");

    // création d'un élément p 
    const catchline = document.createElement ('p');
    // je stipule que le p doit afficher la tagline
    catchline.textContent = `${photographer.tagline}`;
    // j'ajoute une class pour le css
    catchline.classList.add("catchline");

    //ajout des enfants (appendChild) au container parent (photographHeader) : img,h2,location,catchline.
    photographHeader.appendChild(img);
    photographHeader.appendChild(h2);
    photographHeader.appendChild(location);
    photographHeader.appendChild(catchline);
};



// function displayMedia avec le parametre mediaPhotographer sert à boucler sur chaque media
// correspondant à l'id du photographe
function displayMedia(mediaPhotographer){
    const mediaSection = document.querySelector('#media-photographer');

    mediaPhotographer.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const photosUserDOM = mediaModel.photosUserDOM();
        mediaSection.appendChild(photosUserDOM);
    });
    
}

function findMedia(photographerID, medias){
    const mediasPhotographer = medias.filter(media => media.photographerId === photographerID);
    return mediasPhotographer;
};

function createLightbox(){
    const body = document.querySelector('body');
    const lightbox = document.createElement('dialog');
    // const lightboxContenu = document.createElement('div');
    const mediaLightbox = document.createElement('div');
    const prev = document.createElement('button');
    const next = document.createElement('button');
    const closeLb = document.createElement('span');

    lightbox.classList.add('lightbox');
    // lightboxContenu.classList.add('lightboxContenu');
    mediaLightbox.classList.add('mediaLightbox');
    prev.classList.add('prev');
    next.classList.add('next');
    closeLb.classList.add('closeLb');

    body.appendChild(lightbox);
    lightbox.appendChild(mediaLightbox);
    // lightboxContenu.appendChild(mediaLightbox);
    mediaLightbox.appendChild(prev);
    mediaLightbox.appendChild(next);
    mediaLightbox.appendChild(closeLb);
};



function openLightbox(){
    //récupérer les médias en fonction du photographe
    const getMedias = document.querySelectorAll('.mediaArticle');
    console.log(getMedias);
    document.addEventListener('click',(e) =>{

        e.preventDefault();
        const lightbox = document.querySelector('.lightbox');
        lightbox.style.display = 'block';
        console.log(lightbox);
        const mediaLightbox = document.querySelector('.mediaLightbox');
        lightbox.style.display = 'block';
        console.log(mediaLightbox);

        lightbox.showModal();

    });   
    //boucler sur tous ces médias
    //ajout d'un event au click
    //a l'event au click il faut récupérer l'index du média
    //appel de la fonction createlightbox pour générer le dom
};

// création d'une fonction init pour initialiser la page web
// la fonction est créée de manière asyncrone pour attendre les données
// et await va attendre de charger les donnés avant la lecture du code
// en utilisant async et await ça permet de charger le reste du code JS en attendant le chargement des données 
// c'est la porte d'entrée de l'application
// async = asyncrone -- await = attendre
async function init(){
    //la const data attend la fonction dataPhotographers avec le chemin d'accès au fichier associé
    const dataJson = await dataPhotographers("../../data/photographers.json");
    //je définie que {photographers} stock dataJson
    const {photographers, media} = dataJson;    
    // la const urlParams va chercher dans l'url les paramètres
    // je déclare une nouvelle instance (NEW) d'url search params pour récupérer les paramètres de l'url
    // window = la page web - location = url - search = va être définit par un attribut GET
    const urlParams = new URLSearchParams(window.location.search);
    // const photographerID récupère la chaine de caractères de (window.location.search)
    // en extrait le paramètre ID grace à la méthode GET et la convertie en INTEGER (en chiffres) grace à la méthode parseInt
    const photographerID = parseInt (urlParams.get("id"));
    // la const photographer récupère le résultat de la recherche de findPhotographer
    // la const photographer instancie (appelle) findPhotographer depuis les data photographers (tableau)
    // et en affiche le photographe en fonction de l'id placé en URL plus haut dans le code
    const photographer = findPhotographer(photographers, photographerID);

    // je fais une requête de selection sur la classe .photographer_name
    const photographerName = document.querySelector(".photographer_name");
    // j'affecte l'objet photographer.name comme étant le texte à afficher
    photographerName.textContent = photographer.name;
    // j'instancie ma fonction headerPhotographer avec le paramètre photographer qui contient les information du photographe 
    // extrait en fonction de son ID (voir ligne 88)
    headerPhotographer(photographer);
    const medias = findMedia(photographerID, media);
    displayMedia(medias);
    createLightbox();
    openLightbox();
    
};


// j'instancie ma fonction init 
init();


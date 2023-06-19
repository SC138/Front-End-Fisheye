import {mediaFactory} from "../factories/mediaFactory.js";

async function dataPhotographers(file){
    // la const response, elle attend le chargement du fichier
    const response = await fetch (file);
    const data = await response.json();
    return data;
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

function displayMedia(allMedias){
    const mediaSection = document.querySelector("#media-photographer");

    allMedias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const photosUserDOM = mediaModel.photosUserDOM();
        mediaSection.appendChild(photosUserDOM);
    });
}

function findMedia(photographerID, medias){
    const mediasPhotographer = medias.filter(media => media.photographerId === photographerID);
    return mediasPhotographer;
};

// je créer la function createLightbox
function createLightbox(){
    // création d'un élement HTML dialog. L'élément HTML <dialog> représente une boite de dialogue ou un composant interactif.
    const lightbox = document.createElement('dialog');
    // création d'une div pour afficher le contenu de la lightbox
    const lightboxContent =  document.createElement('div');
    // création d'une div pour afficher le média dans la lightbox
    const mediaLightbox = document.createElement('div');
    // bouton pour passer au média précédent
    const previous = document.createElement('button');
    // bouton pour passer au média suivant
    const next = document.createElement('button');
    // bouton de fermeture qui appel la function createCloseButton
    const closeButton = createCloseButton();

    // Ajout des class et attributs aux éléments HTML
    lightbox.classList.add('lightbox');
    lightbox.setAttribute('aria-label', 'Fermeture du média');
    lightboxContent.classList.add('lightbobxContent');
    mediaLightbox.classList.add('mediaLightbox');
    previous.classList.add('previous','fas', 'fa-angle-left');
    previous.setAttribute('arial-label', 'Media précédent');
    next.classList.add('next','fas', 'fa-angle-right');
    next.setAttribute('arial-label', 'Media suivant');

    // ajout des éléments à la lightbox
    lightbox.appendChild(lightboxContent);
    lightboxContent.appendChild(closeButton);
    lightboxContent.appendChild(mediaLightbox);
    lightboxContent.appendChild(previous);
    lightboxContent.appendChild(next);

    // ajout de la lightbox dans le body
    const body = document.querySelector('body');
    body.appendChild(lightbox);
    

    // au clic sur previous, clickArrow est décrémenté de 1 avec --
    previous.addEventListener('click', () => {
        clickArrow--;
        // si clickArrow devient inférieur à 0
        // si oui, je dis que clickArrow doit pointer vers le dernier élément de mediaPhotographer
        if (clickArrow < 0) {
            // pour ce faire j'attribut à clickArrow la valeur de mediaPhotographer.length - 1
            clickArrow = mediaPhotographer.length - 1;
        }
        // j'appel la function updateLightbox avec le paramètre clickArrow pour mettre à jour la lightbox
        updateLightbox(clickArrow);
    });
    
    // au clic sur next, clickArrow est incrémenté de 1 avec ++
    next.addEventListener('click', () => {
        clickArrow++;
        // si clickArrow est supérieur ou égal à mediaPhotographer
        // si oui, je dis que clickArrow doit pointer vers le premier élément
        if (clickArrow >= mediaPhotographer.length) {
            // et j'attribut la valeur à 0
            clickArrow = 0;
        }
        // j'appel la function updateLightbox avec le paramètre clickArrow pour mettre à jour la lightbox
        updateLightbox(clickArrow);
    });
}
// Je déclare une variable "clickArrow" qui est égale à 0 pour l'initialiser
let clickArrow = 0;

function updateLightbox(clickArrow){
    const mediaClick = mediaPhotographer[clickArrow];
    createLightbox(mediaClick);
}

// je déclare une variable mediaPhotographer en tant que tableau
let mediaPhotographer = [];

//function openLightbox prend en paramètre event
function openLightbox(event){
    // cible la classe mediaArticle dans mediaFactory
    const clickMedia = event.target.closest('mediaArticle');
    // trouve l'indice (la position) d'un élément dans mediaPhotographer basé sur la valeur de son attribut id à partir de clickMedia
    clickArrow = mediaPhotographer.findIndex(media => media.id === +clickMedia.getAttribute('data-id'));

    // je sélectionne la Lightbox à l'aide de la classe 'lightbox'
    const lightbox = document.querySelector('.lightbox');

    // Mise à jour la Lightbox en utilisant l'indice du média
    updateLightbox(clickArrow);
    // ouverture de la lightbox avec showModal
    lightbox.showModal();
}

function createCloseButton(){
    // création du bouton de fermeture
    const closeButton = document.createElement('buton');
    // Ajout des classes et des attributs au bouton de fermeture de la Lightbox
    closeButton.classList.add('lbCloseButton', "fas", "fa-times");
    closeButton.setAttribute('aria-label', 'Fermeture du média');

    // écoputeur d'évenement au click sur le bouton de fermeture
    closeButton.addEventListener('click', () => {
        // je sélectionne la Lightbox à l'aide de la classe 'lightbox'
        const lightbox = document.querySelector('.lightbox');
        //fermeture de la lightbox
        lightbox.close();
    });
    // je retourne le bouton de fermeture de lightbox
    return closeButton;
}





// création d'une fonction init pour initialiser la page web
// la fonction est créée de manière asyncrone pour attendre les données
// et await va attendre de charger les donnés avant la lecture du code
// en utilisant async et await ça permet de charger le reste du code JS en attendant le chargement des données 
// c'est la porte d'entrée de l'application
// async = asyncrone -- await = attendre
async function init(){
    //la const data attend la fonction dataPhotographers avec le chemin d'accès au fichier associé
    const data = await dataPhotographers("../../data/photographers.json");
    //je définie que {photographers} stock data
    const {photographers, media} = data;



    // j'instancie la function createLightbox
    createLightbox();
    openLightbox();
    


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
};


// j'instancie ma fonction init 
init();


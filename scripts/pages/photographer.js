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




function createMenuSorting() {
    const filters = document.querySelector('.filters');

    // Crée le conteneur principal
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menuContainer');
    
    
    // Crée le label "Trier par"
    const menuLabel = document.createElement('span');
    menuLabel.classList.add('menuLabel');
    menuLabel.innerText = 'Trier par: ';
    menuContainer.appendChild(menuLabel);

    const divMenuLister = document.createElement('div');
    divMenuLister.classList.add('menuLister');
    // Crée le bouton principal
    const menuButton = document.createElement('div');
    menuButton.classList.add('menuButton');
    //Focus au Tab
    menuButton.setAttribute('role','group');
    menuButton.setAttribute('tabindex', '0');
    
    // Crée le texte du bouton
    const buttonText = document.createElement('span');
    buttonText.innerText = 'Popularité';
    buttonText.setAttribute('aria-label', `Trier les médias par ${buttonText.innerText}`);

    //Focus au Tab
    buttonText.setAttribute('role', 'listitem');

    menuButton.appendChild(buttonText);
    
    // Crée l'icône du bouton
    const buttonIcon = document.createElement('i');
    buttonIcon.classList.add('fas', 'fa-chevron-down');
    menuButton.appendChild(buttonIcon);

    menuContainer.appendChild(menuButton);

    // Crée le menu déroulant
    const openMenu = document.createElement('ul');
    openMenu.classList.add('openMenu');

    // Les options du menu
    let options = ['Popularité', 'Date', 'Titre'];

    // Met à jour les options du menu
    const updateOptions = () => {
        // Efface les options actuelles
        openMenu.innerHTML = ''; 
        // Parcours chaque option
        for(let i = 0; i < options.length; i++) { 
            // Si l'option n'est pas celle actuellement affichée
            if (options[i] !== buttonText.innerText) { 
                // Crée un nouvel élément de liste
                const option = document.createElement('li'); 
                option.innerText = options[i];
                //Focus au Tab
                option.setAttribute('role', 'listitem');
                option.setAttribute('tabindex', '0');

                openMenu.appendChild(option);
                // Quand l'option est cliquée
                option.addEventListener('click', function() { 
                    // Met à jour le texte du bouton
                    buttonText.innerText = options[i]; 
                    buttonIcon.className = '';
                    // Met à jour l'icône
                    buttonIcon.classList.add('fas', 'fa-chevron-down'); 
                     // Ferme le menu
                    openMenu.style.display = 'none';
                    // Met à jour les options
                    updateOptions(); 


                    // Si l'option sélectionnée est 'Popularité', trie les médias
                    if (options[i] === 'Popularité') {
                        buttonText.setAttribute('aria-label', `Trier les médias par ${buttonText.innerText}`);
                        sortMediasByPopularity();
                    }

                    if (options[i] === 'Date') {
                        buttonText.setAttribute('aria-label', `Trier les médias par ${buttonText.innerText}`);
                        sortMediasByDate();
                    }
                    
                    if (options[i] === 'Titre') {
                        buttonText.setAttribute('aria-label', `Trier les médias par ${buttonText.innerText}`);
                        sortMediasByTitle();
                    }
                    

                });
            }
        }
    }
    // Appelle la fonction pour initialiser les options
    updateOptions(); 

    // Ajoute le menu déroulant au conteneur
    menuContainer.appendChild(divMenuLister);
    divMenuLister.appendChild(menuButton);
    divMenuLister.appendChild(openMenu);

    // Ajoute le conteneur au document
    filters.appendChild(menuContainer);

    // Cache le menu par défaut
    openMenu.style.display = 'none';

    // Quand le bouton principal est cliqué
    menuButton.addEventListener('click', function() {
        // Si le menu est fermé
        if (openMenu.style.display === 'none') { 
            // Ouvre le menu
            openMenu.style.display = 'block'; 
            // Supprime toutes les classes de l'élément "buttonIcon"
            buttonIcon.className = '';
            // Met à jour l'icône
            buttonIcon.classList.add('fas', 'fa-chevron-up');
            divMenuLister.style.height = '55px';  
        // Si le menu est ouvert
        } else { 
            // Ferme le menu
            openMenu.style.display = 'none'; 
            // Supprime toutes les classes de l'élément "buttonIcon"
            buttonIcon.className = '';
            // Met à jour l'icône
            buttonIcon.classList.add('fas', 'fa-chevron-down');
            divMenuLister.style.height = '55px'; 
        }
    });
}

// Appelle la fonction pour créer le menu
createMenuSorting();





// function displayMedia avec le parametre mediaPhotographer sert à boucler sur chaque media
// correspondant à l'id du photographe
function displayMedia(mediaPhotographer){
    const mediaSection = document.querySelector('#media-photographer');

    mediaPhotographer.forEach((media, index) => {
        const mediaModel = mediaFactory(media, index, updateTotalLikes);
        const photosUserDOM = mediaModel.photosUserDOM();
        mediaSection.appendChild(photosUserDOM);
    });

    
    const allMediasElements = document.querySelectorAll('.picsPhotographer');
    allMediasElements.forEach((mediaElement)=>{
        mediaElement.addEventListener('keydown', event =>{
            if (event.key === 'Enter') {
                mediaElement.querySelector('.mediaLB').click();
                event.preventDefault();
            }
        });
    });
    createLightbox();
};


function findMedia(photographerID, medias){
    // Filtrer les médias par photographerID
    const mediasPhotographer = medias.filter(media => media.photographerId === photographerID);
    return mediasPhotographer;
};


function boxLikesPrice(medias, photographerID, photographers) {
    // Filtre les médias par photographerID
    const mediasPhotographer = medias.filter(media => media.photographerId === photographerID);

    // Calcule le nombre total de likes
    let totalLikes = 0;
    mediasPhotographer.forEach(media => {
        totalLikes += media.likes;
    });

    // Création de l'encart
    const floatingBox = document.createElement('div');
    floatingBox.classList.add('floating-box');
    floatingBox.setAttribute('role', 'presentation');
    floatingBox.setAttribute('tabindex', '0');

    // Ajout du nombre total de likes
    const likesElement = document.createElement('p');
    likesElement.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
    likesElement.setAttribute('aria-label', `${totalLikes} likes`);
    floatingBox.appendChild(likesElement);
    // j'affecte l'élément à totalLikesElement
    totalLikesElement = likesElement;  

    const priceElement = document.createElement('p');
    priceElement.textContent = `${photographers.price} €/jour`;
    priceElement.setAttribute('aria-label', `${photographers.price} euros par jour`);
    floatingBox.appendChild(priceElement);

    // Ajout de l'encart au body de la page
    const main = document.querySelector('main');
    main.appendChild(floatingBox);
};

let totalLikesElement;

// Fonction pour mettre à jour le nombre total de likes
function updateTotalLikes(increment) {
    // Obtenir le texte actuel de totalLikesElement, le diviser en morceaux,
    // prendre le premier morceau (le nombre de likes) et le convertir en nombre
    // la fonction Number permet de convertir la string en nombre pour pouvoir l'incrémenter
    const currentLikes = Number(totalLikesElement.textContent.split(' ')[0]); 
    // ajoute l'incrément au nombre actuel de likes pour obtenir le nouveau nombre de likes
    const newLikes = currentLikes + increment;
    // met à jour totalLikesElement pour afficher le nouveau nombre de likes suivi de l'icône de cœur
    totalLikesElement.innerHTML = `${newLikes} <i class="fa-solid fa-heart"></i>`; 
};



function createLightbox(){
    const body = document.querySelector('body');

    const lightbox = document.createElement('dialog');

    lightbox.setAttribute('tabindex', '0');  // Rend la lightbox focusable

    const mediaLightbox = document.createElement('div');
    const videoLightbox = document.createElement('video'); 
    const prev = document.createElement('button');
    const next = document.createElement('button');
    const closeLb = document.createElement('button');
    const icons = document.createElement('i');

    lightbox.classList.add('lightbox');
    mediaLightbox.classList.add('mediaLightbox');
    mediaLightbox.setAttribute('role', 'dialog');
    videoLightbox.setAttribute('controls', true);
    videoLightbox.setAttribute('tabindex', '-1');
    prev.classList.add('prev', "fas", "fa-angle-left");
    prev.setAttribute('aria-label','Média précédent');   
    
    
    next.classList.add('next', "fas", "fa-angle-right");
    next.setAttribute('aria-label','Média suivant');
    closeLb.classList.add('closeLb');
    closeLb.setAttribute('aria-label','Fermeture du média');
    closeLb.setAttribute('tabindex', '1');
    icons.classList.add("fas", "fa-times")

    closeLb.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.click();
        }
    });
    

    body.appendChild(lightbox);
    lightbox.appendChild(prev);
    lightbox.appendChild(mediaLightbox);
    mediaLightbox.appendChild(videoLightbox); 
    lightbox.appendChild(next);
    lightbox.appendChild(closeLb);
    closeLb.appendChild(icons);
};

//Focus dans la lightbox
function handleTabulationInLightbox(e) {
    // Sélection de tous les éléments qui peuvent recevoir le focus.
    const focusableElements = 'button, select, textarea, [tabindex]:not([tabindex="-1"]), div';
    const lightbox = document.querySelector('.lightbox');
    
    //si la LB est affichée
    if(lightbox.style.display !== "none") {
        // séléction des éléments pouvant recevoir le focus dans la LB
        const focusableModalElements = Array.from(lightbox.querySelectorAll(focusableElements));

        //verifie si la touche Tab est préssée
        const tabKey = e.key === 'Tab';
        // si la touche est différente de Tab, ça échappe la touche
        if(!tabKey) {
            return;
        } 

        // définit le premier et dernier élément pouvant recevoir le focus
        const firstElement = focusableModalElements[0]; // prev
        const lastElement = focusableModalElements[focusableModalElements.length -1]; //close
        // différent de lightbox doc.activeElmement(=focusableElements)
        let isFocusOutsideLightbox = !lightbox.contains(document.activeElement);

        //si shift+Tab 
        if(e.shiftKey) {
            //si focus sur 1er élément, alors aller au dernier élément 
            if(document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        // sinon on passe à l'élément suivant     
        } else {
            // si le focus est sur le dernier élément OU un elm en dehors de la LB
            //alors on focus le 1er elm 
            if(document.activeElement === lastElement || isFocusOutsideLightbox) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
}




function displayLightBoxWithOneMedia(media) {
    const lightbox = document.querySelector('.lightbox');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const mediaLightbox = document.querySelector('.mediaLightbox'); 
    const cloneMedia = media.cloneNode(false);  
    const mediaId = media.getAttribute('id');
    const pMediaContainerid = 'pmediacontainer_' + mediaId.split('_')[1];
    const pmediaContainerClone = document.getElementById(pMediaContainerid).cloneNode(true);
    
    
    lightbox.style.display = 'block';
    // ajoute la classe 'lightboxOpen' à l'élément 'main'
    main.classList.add('lightboxOpen');
    // ajoute la classe 'lightboxOpen' à l'élément 'header'
    header.classList.add('lightboxOpen');
    
    // vide le contenu de l'élément 'mediaLightbox'
    mediaLightbox.innerHTML = "";
    mediaLightbox.appendChild(cloneMedia); 
    mediaLightbox.appendChild(pmediaContainerClone);

    // écouteur d'event sur keydown pour déclencher l'appel de handleTabulationInLightbox
    document.addEventListener('keydown', handleTabulationInLightbox);
    // si la source du média se termine ps .mp4
    //alors ajout des controls à la vidéo 
    if(media.src.endsWith('.mp4')) {
        cloneMedia.setAttribute('controls', true);
    } 
}



function openLightbox(){
    //récupérer les médias en fonction du photographe
    const allMedias = document.querySelectorAll('.mediaLB') ;
    let currentIndex = 0;
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const mediaLightbox = document.querySelector('.mediaLightbox');

    //Gestion des images / video
    //boucler sur tous ces médias
    //getMedia = un media contenu dans linksMedia
    allMedias.forEach((getMedia, index)=>{ 
        //ajout d'un event au click
        
        getMedia.addEventListener('click',(e) =>{
            e.preventDefault();
            currentIndex = index;
            mediaLightbox.setAttribute('tabindex', '0');
            prev.setAttribute('tabindex', '0');
            next.setAttribute('tabindex', '0');
            displayLightBoxWithOneMedia(getMedia);
        });
    });
    next.addEventListener('click',()=>{
        currentIndex++;
        // si currentindex dépasse la longueur de allMedias
        if(currentIndex >= allMedias.length){
            //réinitialiser currentIndex à 0
            currentIndex = 0;
        }
        displayMediaIndex(currentIndex);  
    });  

    // navigation avec les fleches du clavier dans la LB
    document.addEventListener('keydown', event =>{

        if (event.key === 'ArrowRight') {
            next.click();
        }

        if (event.key === 'ArrowLeft') {
            prev.click();
        }
    });

    prev.addEventListener('click',()=>{
        currentIndex--;
        // si currentindex dépasse la longueur de allMedias
        if(currentIndex < 0){
            //réinitialiser currentIndex à 0
            currentIndex = allMedias.length - 1;
        }
        displayMediaIndex(currentIndex);
    });
};

function displayMediaIndex(index){
    // sélectionne tous les médias et le conteneur de la lightbox
    const allMedias = document.querySelectorAll('.mediaLB');
    const mediaLightbox = document.querySelector('.mediaLightbox');
    // vide le contenu de la lightbox
    mediaLightbox.innerHTML = "";
    
    // cloner le media à l'index spécifié et l'ajoute à la lightbox
    const newMedia = allMedias[index].cloneNode(true);

    mediaLightbox.appendChild(newMedia);
    
    // récupère l'id du media cloné
    let newMediaId = newMedia.getAttribute('id');
    let idNumber = newMediaId.split('_')[1];
    
    // construction de l'id du conteneur pmedia et le cloner
    let pmediaContainerId = 'pmediacontainer_' + idNumber;
    let pmediaContainerClone = document.getElementById(pmediaContainerId).cloneNode(true);
    
    // ajoute le clone de pmediaContainer à la lightbox
    mediaLightbox.appendChild(pmediaContainerClone);
    
};

function closeLightbox(){
    const btnCloseLb = document.querySelector('.closeLb');
    const lightbox = document.querySelector('.lightbox');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    

    btnCloseLb.addEventListener('click', ()=>{
        lightbox.style.display = 'none';
        main.classList.remove('lightboxOpen');
        header.classList.remove('lightboxOpen');
    });

    // ferme la LB en appyant sur la touche espace
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            lightbox.style.display = 'none';
            main.classList.remove('lightboxOpen');
            header.classList.remove('lightboxOpen');
        }
    });
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

    // ajout dynamique du nom du photographe pour la lecture d'écran sur le bouton de contact
    const contact_button = document.querySelector(".contact_button");
    contact_button.setAttribute('aria-label', `Contactez-moi ${photographer.name}`);
    // j'instancie ma fonction headerPhotographer avec le paramètre photographer qui contient les information du photographe 
    headerPhotographer(photographer);
    boxLikesPrice(media, photographerID, photographer);

    //Appel de la fonction pour avoir le tri dès l'ouverture de la page
    sortMediasByPopularity();
};


// j'instancie ma fonction init 
init();

// Fonction commune pour éviter la répétition du code
async function sortAndDisplayMedia(sorting) {
    const dataJson = await dataPhotographers("../../data/photographers.json");
    const { media } = dataJson;
    const urlParams = new URLSearchParams(window.location.search);
    const photographerID = parseInt(urlParams.get("id"));
    const medias = findMedia(photographerID, media);
    //Tri le tableau medias avec le paramètre 'sorting' pour comparer les éléments
    //Stock du tableau dans 'sortedMedias'
    const sortedMedias = medias.sort(sorting);
    const mediaSection = document.querySelector('#media-photographer');
    // Je vide le conteneur de médias pour éviter les doublons
    mediaSection.innerHTML = '';
    displayMedia(sortedMedias);
    createLightbox();
    openLightbox();
    closeLightbox();
}

async function sortMediasByPopularity() {
    //Tri par rapport aux likes
    //'await' de l'async pour exécuter ce code
    //comparaison des media1 et media2 en boucle pour tous les médias par défaut dans l'ordre croissant
    //ici je retourne le résultat par ordre décroissant en mettant media2 avant media1 et avec le - 
    await sortAndDisplayMedia((media1, media2) => media2.likes - media1.likes);
}



async function sortMediasByDate() {
    //Tri par rapport aux dates
    //conversion de la string date du JSON en objet avec new Date
    //Et place dans l'ordre décroissant les dates 
    await sortAndDisplayMedia((media1, media2) => new Date(media2.date) - new Date(media1.date));
}

async function sortMediasByTitle() {
    //Tri par rapport aux titres
    //Méthode .localeCompare() qui compare deux strings par ordre alphabétique
    //Ici je compare les title de media1 et media2 et n'inverse pas le sens de tri
    await sortAndDisplayMedia((media1, media2) => media1.title.localeCompare(media2.title));
}






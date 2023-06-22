    // import { photographerFactory } from "../factories/photographerFactory.js";
    import {generatephotographerCard} from "../domgenerator/photographerCard.js";
    // va récupérer les infos du json
    // déclaration d'une fonction asyncrone getPhotographers
    async function getPhotographers() {
        // la const response, elle attend le chargement du fichier photographers.json
        const response = await fetch ("../../data/photographers.json");
        // la const data attend la réponse au format JSON
        const data = await response.json();
        // la const photographers extrait les données du tableau photographers du fichier JSON
        const photographers = data.photographers;
        // je retournes les photographes pour qu'ils s'affichent
        return photographers;
    };


    // déclaration d'une fonction asyncrone displayData avec le paramètre (photographers)
    async function displayData(photographers) {
        // je fais une requête de selection sur la classe .photographer_section
        const photographersSection = document.querySelector(".photographer_section");

        // je fais une boucle forEach pour passer sur chaque éléments du tableau photographers
        photographers.forEach((photographer) => {
            // la const photographerModel instancie (appelle) photographerFactory avec le paramètre photographer
            // const photographerModel = photographerFactory(photographer);
            // userCardDOM va appeler la fonction getUserCardDOM depuis la fonction photographerFactory 
            // (voir photographerFactory.js ligne 10)
            // pour afficher les data du photographe
            // getUserCardDOM définit la carte du photographe (structuration des données dans le DOM)
            // const userCardDOM = generatephotographerCard(photographer); <--------------------
            // ajout de l'enfant userCardDOM (appendChild) au container parent photographersSection
            photographersSection.appendChild(generatephotographerCard(photographer));
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        // j'appel ma fonction displayData pour afficher les photographes
        displayData(photographers);
    };
    
    // j'instancie ma fonction init 
    init();
    

const formElement = document.querySelector("form");
const contact_button = document.querySelector(".contact_button");
const close_button = document.querySelector(".close_btn");
const contact_modal = document.getElementById("contact_modal");
const focusableElements = 'button, .close_btn, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
//Sélectionne le premier élément qui peut recevoir le focus dans la modale.
const modalContact = document.querySelector('.modal');
const firstFocusableElement = modalContact.querySelectorAll(focusableElements)[0]; 
const focusableContent = modalContact.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];

// ajout des éléments à l'intérieur de la modal à focus 
// let focusableElements = document.querySelectorAll('button, .close_btn, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');


// ouverture modal form
function displayModal() {
    // récupération de tous les éléments pouvant recevoir le focus
    const focusableElements = document.querySelectorAll('button, .close_btn, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    // affiche la modale
    contact_modal.style.display = "block";

    // pour chaque élément qui peut recevoir le focus...
    focusableElements.forEach(function(item) {
        // s'il n'est pas dans la modale...
        if (!modalContact.contains(item)) {
            // alors on lui interdit de recevoir le focus
            item.setAttribute('tabindex', '-1');
        } 
    });

    // donne le focus au bouton de fermeture de la modale
    close_button.focus();

    // ajout d'un écouteur d'événement pour gérer le piège à tabulation
    document.addEventListener('keydown', trapTabKey);
}



function trapTabKey(e) {

    // définit la touche Tab
    let isTabPressed = e.key === 'Tab';

    // Si tab est préssé, la fonction s'arrête
    if (!isTabPressed) {
        return;
    }

    if (e.shiftKey) { 
        // si la touche shift est enfoncée pour la combinaison shift + tab
        if (document.activeElement === firstFocusableElement) {
            // ajoute le focus pour le dernier élément pouvant recevoir le focus
            lastFocusableElement.focus();
            e.preventDefault();
        }
    } else {
        // si la touche tab est enfoncée
        if (document.activeElement === lastFocusableElement) {
            // si le focus a atteint le dernier élément pouvant recevoir le focus 
            // alors focus le premier élément pouvant recevoir le focus après avoir appuyé sur tab
            firstFocusableElement.focus();
            e.preventDefault();
        }
    }
}


// fermeture modal
function closeModal() {
    const focusableElements = document.querySelectorAll('button, .close_btn, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), div.menuButton, div.floating-box, li[role="listitem"]');

    contact_modal.style.display = "none";

    focusableElements.forEach(function(item) {
        if (!modalContact.contains(item)) {
            item.setAttribute('tabindex', '0');
        }
    });
    // ici on enlève l'écouteur d'événement
    document.removeEventListener('keydown', trapTabKey);
    contact_button.focus();
}


// variable isSubmited sur false
let isSubmited = false;

// je met un écouteur d'évévement sur le bouton envoyer(submit) sur l'élément formElement
// quand l'événement se produit, la fonction fléchée s'éxécute 
formElement.addEventListener("submit", (event) => {
    // première instruction, event.preventDefault() permet d'empêcher le rechargement de la page par défaut au moment du submit du formulaire
    event.preventDefault();
    // récupération des inputs dans le HTML via getElementById en ajoutant le .value
    // .value sert à accéder à la valeur des éléments inputs
    let firstValue = document.getElementById("first").value;
    let lastValue = document.getElementById("last").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    // j'affiche les résultats dans la console
    console.log(firstValue, lastValue, email, message);
    // j'indique que isSubmited est true
    isSubmited = true;
    closeModal();
});


// fonction ternaire : si isSubmit est true, reset du formulaire et fermeture de la modal. 
// si c'est false alors: null est renvoyé.
function submitForm(){
    isSubmited ? formElement.reset() : null;
}


// Ajout d'un écouteur d'événement pour la soumission du formulaire
// lorsque l'événement se produit, la fonction submitForm est appelée
formElement.addEventListener("submit", submitForm);
// Ajout d'un écouteur d'événement au clic sur le bouton "contact"
// lorsque l'événement se produit, la fonction displayModal est appelée
contact_button.addEventListener("click", displayModal);
// Ajout d'un écouteur d'événement au clic sur le bouton "fermer"
// lorsque l'événement se produit, la fonction closeModal est appelée
close_button.addEventListener("click", closeModal);


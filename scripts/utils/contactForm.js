const formElement = document.querySelector("form");
const contact_button = document.querySelector(".contact_button");
const close_button = document.querySelector(".close_button");
const contact_modal = document.getElementById("contact_modal");

// ouverture modal form
function displayModal() {
	contact_modal.style.display = "block";
}


// fermeture modal
function closeModal() {
    contact_modal.style.display = "none";
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
    console.log(firstValue);
    console.log(lastValue);
    console.log(email);
    console.log(message);
    // j'indique que isSubmited est true
    isSubmited = true;
});


// fonction ternaire : si isSubmit est true, reset du formulaire et fermeture de la modal. 
// si c'est false alors: null est renvoyé.
function submitForm(){
    isSubmited ? (formElement.reset(), closeModal()) : null;
}
// function submitForm(){
//     if(isSubmited){
//         formElement.reset()
//         closeModal();
//     }
// };


// Ajout d'un écouteur d'événement pour la soumission du formulaire
// lorsque l'événement se produit, la fonction submitForm est appelée
formElement.addEventListener("submit", submitForm);
// Ajout d'un écouteur d'événement au clic sur le bouton "contact"
// lorsque l'événement se produit, la fonction displayModal est appelée
contact_button.addEventListener("click", displayModal);
// Ajout d'un écouteur d'événement au clic sur le bouton "fermer"
// lorsque l'événement se produit, la fonction closeModal est appelée
close_button.addEventListener("click", closeModal);


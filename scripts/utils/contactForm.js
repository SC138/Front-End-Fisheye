const modal = document.getElementById("contact_modal");
const contact_button = document.querySelector(".contact_button");
const close_button = document.querySelector(".close_button");


// ouverture modal form
function displayModal() {
	modal.style.display = "block";
}

// fermeture modal
function closeModal() {
    modal.style.display = "none";
}


contact_button.addEventListener("click", displayModal);
close_button.addEventListener("click", closeModal);
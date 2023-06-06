function mediaFactory(media) {
    const {id, photographerId, title, image, video, likes, date, price} = media;

    const mediaImage = `assets/images/photos/${photographerId}/${image}`;
    const mediaVideo = `assets/images/photos/${photographerId}/${video}`;

    function photosUserDOM(){

        const article = document.createElement('article');
        article.classList.add('picsPhotographer');
        const link = document.createElement('a');
        article.appendChild(link);


        //ces conditions permettent de vérifier si le média est une image ou une vidéo
        if(image){
            link.setAttribute('href',mediaImage);
            //data-id ou data-xxx, est un attribut natif qui permet d'ajouter de l'information à la balise de lien
            //ici j'ajoute l'id au lien 
            link.setAttribute('data-id', id);

            const img = document.createElement('img');      
            img.setAttribute("src", mediaImage);
            img.setAttribute("alt", `Photo prise par ${id}`);

            const pMedia = document.createElement('p');
            pMedia.classList.add('pMedia');
            pMedia.textContent = title;

            const pLikes = document.createElement('p');
            pLikes.classList.add('pLikes');
            pLikes.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;

            link.appendChild(img);
            article.appendChild(pMedia);
            article.appendChild(pLikes);

        }else if(video){
            link.setAttribute('href',mediaVideo);
            link.setAttribute('data-id', id);
            
            const movie = document.createElement('video');      
            movie.setAttribute("src", mediaVideo);
            movie.setAttribute("aria-label", `Vidéo prise par ${id}`);

            const pMedia = document.createElement('p');
            pMedia.classList.add('pMedia');
            pMedia.textContent = title;

            const pLikes = document.createElement('p');
            pLikes.classList.add('pLikes');
            pLikes.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;

            // controls permet d'afficher les controles sur la vidéo: play, pause... true pour afficher et false pour masquer
            movie.setAttribute("controls", true);
            // autoplay lance automatiquement la video si c'est sur true
            // par défaut le autoplay est sur false
            movie.autoplay=false;
            // poster permet d'afficher une miniature de la première image de la vidéo
            movie.setAttribute("poster", "");

            link.appendChild(movie);
            article.appendChild(pMedia);
            article.appendChild(pLikes);
        }
        return article;
    }
    return {photosUserDOM};
}
export {mediaFactory};
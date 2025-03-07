
// Factory pour générer des éléments de média
function mediaFactory(media, index, updateTotalLikes) {
    const {id, photographerId, title, image, video, likes} = media;
    const mediaImage = `assets/images/photos/${photographerId}/${image}`;
    const mediaVideo = `assets/images/photos/${photographerId}/${video}`;
    
    // Génère l'élément DOM pour un média spécifique
    function photosUserDOM() {
        // Création des différents éléments du DOM 
        const article = document.createElement('article');
        const link = document.createElement('a');
        article.classList.add('picsPhotographer');
        link.setAttribute('aria-label', `${title} aimé ${likes} fois`);
        article.appendChild(link);

        const mediaContainer = document.createElement('div');
        mediaContainer.setAttribute("id", `mediacontainer_${index}`);
        mediaContainer.classList.add('media-likes-container');

        const pMedia = document.createElement('p');
        pMedia.setAttribute('id', `pmediacontainer_${index}`);
        pMedia.classList.add('pMedia');
        pMedia.textContent = title;

        const pLikes = document.createElement('p');
        pLikes.classList.add('pLikes');


        const likesCount = document.createElement('span');
        likesCount.textContent = likes;

        // ajout de l'icone coeur
        const heartIcon = document.createElement('i');
        heartIcon.className = "fa-solid fa-heart";

        //ajout des éléments qui contiennent le nombre de likes et le coeur à pLikes
        pLikes.appendChild(likesCount);
        pLikes.appendChild(heartIcon);


        // Gestion des événements de like
        //variable pour vérifier si le coeur est cliqué ou pas
        let likeState = false;
        // ajout écouteur d'event sur le coeur qui se déclenche au click 
        heartIcon.addEventListener('click', function() {
            // inverse l'état de la variable au click (true devient false et inversement)
            likeState = !likeState;
            //si likeState est true
            if(likeState) {
                //augmente le nombre de likesCount de +1
                likesCount.textContent = Number(likesCount.textContent) + 1;
                //appelle la fonction updateTotalLikespour augementer le totale de likes de +1
                updateTotalLikes(1);
                //sinon si unlike alors
            } else {  
                // décrémente likesCount de -1
                likesCount.textContent = Number(likesCount.textContent) - 1;
                //appelle la fonction updateTotalLikespour augementer le totale de likes de -1
                updateTotalLikes(-1);
            }
        });

        // Assemblage de la structure du DOM
        article.appendChild(mediaContainer);
        mediaContainer.appendChild(pMedia);
        mediaContainer.appendChild(pLikes);

        // Ajout de l'image ou de la vidéo
        if(image){
            link.setAttribute('href',mediaImage);
            link.setAttribute('data-id', id);

            const img = document.createElement('img');
            img.setAttribute("id", `img_${index}`);
            img.setAttribute("src", mediaImage);
            img.setAttribute("class", "mediaArticle mediaLB");
            img.setAttribute("alt", `${title}`);
            link.appendChild(img);
        }else if(video){
            link.setAttribute('href',mediaVideo);
            link.setAttribute('data-id', id);

            const movie = document.createElement('video');
            movie.setAttribute("id", `movie_${index}`);
            movie.setAttribute("src", mediaVideo);
            movie.setAttribute("class", "mediaArticleVideo mediaLB");
            movie.setAttribute("aria-label", `${title}`);
            
            link.appendChild(movie);
        }
        return article;
    }
    return {photosUserDOM};
}
export {mediaFactory};



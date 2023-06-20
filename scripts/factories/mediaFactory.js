function mediaFactory(media) {
    const {id, photographerId, title, image, video, likes, date, price} = media;
    const mediaImage = `assets/images/photos/${photographerId}/${image}`;
    const mediaVideo = `assets/images/photos/${photographerId}/${video}`;


    function photosUserDOM(openLightbox = false){

        const article = document.createElement('article');
        

        const link = document.createElement('a');
        link.classList.add('mediaArticle');
        article.appendChild(link);
        
        if(openLightbox){
            article.classList.add('lightboxArticle');

        }else{
            article.classList.add('picsPhotographer');
        }

        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-likes-container');

        const pMedia = document.createElement('p');
        if(openLightbox){
            pMedia.classList.add('pMediaLightbox');
        }else{
            pMedia.classList.add('pMedia');
        }
        
        pMedia.textContent = title;

        
        const pLikes = document.createElement('p');
        pLikes.classList.add('pLikes');
        pLikes.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;

        article.appendChild(mediaContainer);           
        mediaContainer.appendChild(pMedia);
        mediaContainer.appendChild(pLikes);

        //ces conditions permettent de vérifier si le média est une image ou une vidéo
        if(image){
            link.setAttribute('href',mediaImage);
            //data-id ou data-xxx, est un attribut natif qui permet d'ajouter de l'information à la balise de lien
            //ici j'ajoute l'id au lien 
            link.setAttribute('data-id', id);

            const img = document.createElement('img');      
            img.setAttribute("src", mediaImage);
            img.setAttribute("alt", `${title}`);

            if(openLightbox){ 
                img.classList.add('openImg');
            }else{
                img.classList.add('img');
            }

            link.appendChild(img);


        }else if(video){
            link.setAttribute('href',mediaVideo);
            link.setAttribute('data-id', id);
            
            const movie = document.createElement('video');      
            movie.setAttribute("src", mediaVideo);
            movie.setAttribute("aria-label", `${title}`);
            
            if(openLightbox){ 
                movie.classList.add('openVideo');
                // controls permet d'afficher les controles sur la vidéo: play, pause... true pour afficher et false pour masquer
                movie.setAttribute("controls", true);
            }else{
                movie.classList.add('video');
                // autoplay lance automatiquement la video si c'est sur true
                // par défaut le autoplay est sur false
                movie.autoplay=false;
                // poster permet d'afficher une miniature de la première image de la vidéo
                movie.setAttribute("poster", "");
            }

            link.appendChild(movie);

        }
        return article;
    }
    return {photosUserDOM};
}
export {mediaFactory};
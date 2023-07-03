function mediaFactory(media) {
    const {id, photographerId, title, image, video, likes, date, price} = media;
    const mediaImage = `assets/images/photos/${photographerId}/${image}`;
    const mediaVideo = `assets/images/photos/${photographerId}/${video}`;


    function photosUserDOM(){

        const article = document.createElement('article');
        

        const link = document.createElement('a');
        article.classList.add('picsPhotographer');
        article.appendChild(link);
        

        const mediaContainer = document.createElement('div');
        mediaContainer.setAttribute("id", `mediacontainer_${id}`);
        mediaContainer.classList.add('media-likes-container');

        const pMedia = document.createElement('p');
        pMedia.classList.add('pMedia');

        
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
            img.setAttribute("id", `img_${id}`);      
            img.setAttribute("src", mediaImage);
            img.setAttribute("class", "mediaArticle");
            img.setAttribute("alt", `${title}`);


            link.appendChild(img);


        }else if(video){
            link.setAttribute('href',mediaVideo);
            link.setAttribute('data-id', id);
            
            const movie = document.createElement('video');
            movie.setAttribute("id", `movie_${id}`);      
            movie.setAttribute("src", mediaVideo);
            movie.setAttribute("class", "mediaArticleVideo");
            movie.setAttribute("aria-label", `${title}`);
            // document.querySelector(".video").autoplay = true;
            // movie.play();

            link.appendChild(movie);

        }
        return article;
    }
    return {photosUserDOM};
}
export {mediaFactory};

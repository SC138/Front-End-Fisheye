function mediaFactory(media) {
    const {id, photographerId, title, image, video, likes, date, price} = media;

    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;

    function photosUserDOM(){

        const article = document.createElement('article');
        article.classList.add('picsPhotographer')

        const img = document.createElement('img');      

        img.setAttribute("src", mediaImage);
        img.alt=`Photo prise par ${id}`

        const link = document.createElement('a');
        link.setAttribute('href', )
    }
}
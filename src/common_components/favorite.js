function setToFavorite(event, movieID) {
    const favorites = JSON.parse(localStorage.getItem('movies_favorites'));
    const heartElement = event.target;
    if (heartElement.innerHTML === "♥") {
        heartElement.innerHTML = "♡";
        favorites.splice(favorites.indexOf(movieID), 1);
    }
    else {
        heartElement.innerHTML = "♥";
        favorites.push(movieID);
    }
    localStorage.setItem("movies_favorites", JSON.stringify(favorites));
}

function Favorite(item) {
    item = item.item;
    return (
        <button className='favoriteButton' onClick={(event) => setToFavorite(event, item.imdbID)}>
            {
                JSON.parse(localStorage.getItem('movies_favorites')).includes(item.imdbID) ? "♥" : "♡"
            }
        </button>
    );
}

export default Favorite;
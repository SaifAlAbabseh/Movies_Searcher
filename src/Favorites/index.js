import './index.css';
import MoviesResults from '../common_components/moviesResults';
import { useEffect, useState, useRef } from 'react';
import LoadingPopup from '../common_components/loadingPopup';
import data from '../common_components/API_DATA.js';
import ErrorMessage from '../common_components/errorMessage';

function Favorites() {

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageElement = useRef(null);

  async function getMovieByID(query) {
    let response = await fetch(`${data.API_URL}?${query}`, {
      method: 'GET'
    });
    let movieData = await response.json();
    return movieData;
  }

  async function fetchFavorites() {
    try {
      setIsLoading(true);
      const arrayOfIds = JSON.parse(localStorage.getItem("movies_favorites"));
      const newArray = (arrayOfIds.map(async element => {
        const query = `apikey=${data.API_KEY}&i=${element}`;
        let movieObject = await getMovieByID(query);
        return movieObject;
      }));
      setFavorites(await Promise.all(newArray));
      setErrorMessage("");
    }
    catch(error) {
      setErrorMessage(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className='favoritesPage'>
      <ErrorMessage errorMessage={errorMessage} ref={errorMessageElement} />
      <LoadingPopup isLoading={isLoading} />
      <div className='searchResultsBox'>
        {
          favorites.map((item, index) => {
            return (
              <MoviesResults key={`card_${index}`} item={item} index={index} />
            );
          })
        }
      </div>
    </div>
  );
}

export default Favorites;

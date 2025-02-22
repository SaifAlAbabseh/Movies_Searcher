import './index.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import data from '../common_components/API_DATA';
import Favorite from '../common_components/favorite';
import LoadingPopup from '../common_components/loadingPopup';
import ErrorMessage from '../common_components/errorMessage';

function Details() {

    const query = new URLSearchParams(useLocation().search);
    const movieId = query.get("movie_id");
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function setMovieById() {
        try {
            setIsLoading(true);
            const query = `apikey=${data.API_KEY}&i=${movieId}`;
            let response = await fetch(`${data.API_URL}?${query}`, {
                method: 'GET'
            });
            let movieDetails = await response.json();
            setMovie(movieDetails);
            setErrorMessage("");
        }
        catch (error) {
            setErrorMessage(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setMovieById();
    }, []);

    return (
        <div className='detailsParentBox'>
            <ErrorMessage errorMessage={errorMessage} />
            <div className='movieDetailsParent'>
                <LoadingPopup isLoading={isLoading} />
                {
                    movie === null ? ''
                        :
                        <div className='movieDetailsParent'>
                            <div className='movieDetailsLeftSection'>
                                <Favorite item={movie} />
                                <img src={`${movie.Poster}`} className='movieDetailsPoster' />
                            </div>
                            <div className='movieDetailsRightSection'>
                                <h1 className='movieDetailsTitle'>
                                    <label>{movie.Title}</label>
                                </h1>
                                <div className='otherMovieDetailsParent'>
                                    <h2 className='otherMovieDetails'>
                                        Language: <label className='movieDetailsInfo'>{movie.Language}</label>
                                    </h2>
                                    <h2 className='otherMovieDetails'>
                                        Release Year: <label className='movieDetailsInfo'>{movie.Year}</label>
                                    </h2>
                                    <h2 className='otherMovieDetails'>
                                        Genre: <label className='movieDetailsInfo'>{movie.Genre}</label>
                                    </h2>
                                    <h2 className='otherMovieDetails'>
                                        Runtime: <label className='movieDetailsInfo'>{movie.Runtime}</label>
                                    </h2>
                                    <h2 className='otherMovieDetails'>
                                        Director: <label className='movieDetailsInfo'>{movie.Director}</label>
                                    </h2>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}
export default Details;

import './common_styles.css';
import { Link } from 'react-router-dom';
import Favorite from './favorite';

function MoviesResults(item, index) {
    item = item.item;
    return (
        <div className='movieCard'>
            <Favorite item = { item }/>
            <h2 className='movieTitle'>{item.Title}</h2>
            <img alt='Not Available' src={item.Poster === "N/A" ? "/No_Image_Available.jpg" : item.Poster} className='moviePoster' />
            <h3 className='movieYear'>{item.Year}</h3>
            <Link to={`/Details?movie_id=${item.imdbID}`} className='moreDetailsLink'>👉More Details</Link>
        </div>
    );
}

export default MoviesResults;
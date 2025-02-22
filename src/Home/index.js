import { useEffect, useRef, useState } from 'react';
import React from 'react';
import './index.css';
import LoadingPopup from '../common_components/loadingPopup';
import MoviesResults from '../common_components/moviesResults';
import data from '../common_components/API_DATA';
import ErrorMessage from '../common_components/errorMessage';

function Home() {

  const resultsNumberPerPage = 10;
  const searchField = useRef(null);
  const paginationNumbersButtons = useRef(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paginationNumbers, setPaginationNumbers] = useState([]);

  let searchCriteria = "";
  let selectedPageNumber = null;
  let totalPages = 1;

  async function search(isPageSwitch, pageNumber) {
    if (!isPageSwitch) {
      setPaginationNumbers([]);
      selectedPageNumber = null;
      searchCriteria = searchField.current.value;
      if (searchCriteria.trim() === "") {
        reset({ message: "Make Sure Of The Input!" });
        return;
      }
    }
    setIsLoading(true);
    const query = `apikey=${data.API_KEY}&s=${searchCriteria}&page=${pageNumber}`;
    try {
      let response = await fetch(`${data.API_URL}?${query}`, {
        method: 'GET'
      });
      let movies = await response.json();
      if (movies.Response !== undefined && movies.Response === 'False')
        throw new Error(movies.Error);
      setMovies(movies.Search);
      setErrorMessage("");
      if (!isPageSwitch) initPaginationNumber(Number(movies.totalResults));
    }
    catch (error) {
      reset(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  function reset(error) {
    setMovies([]);
    setErrorMessage(error.message);
  }

  function initPaginationNumber(totalResultsNumber) {
    totalPages = Math.ceil(totalResultsNumber / resultsNumberPerPage);
    const array = [];
    for (let i = 1; i <= totalPages; i++) {
      const paginationNumber = React.createElement(
        'button',
        {
          key: `pagNumber_${i}`,
          className: `paginationNumberButton ${i === 1 ? 'paginationNumberButtonDisabled' : ''}`,
          onClick: () => switchToPageNumber(i)
        },
        `${i}`
      );
      array.push(paginationNumber);
    }
    setPaginationNumbers(array);
  }

  function switchToPageNumber(pageNumber) {
    const clickedNumber = paginationNumbersButtons.current.children[pageNumber - 1];
    clickedNumber.className = "paginationNumberButton paginationNumberButtonDisabled";
    if (selectedPageNumber === null) {
      paginationNumbersButtons.current.firstChild.className = "paginationNumberButton";
    }
    else
      selectedPageNumber.className = "paginationNumberButton";
    selectedPageNumber = clickedNumber;
    search(true, pageNumber);
  }

  useEffect(() => {
    if (localStorage.getItem('movies_favorites') === null) localStorage.setItem('movies_favorites', JSON.stringify([]));
  }, []);

  return (
    <div className='homeSearchPage'>
      <div className='searchFieldBox'>
        <input type='search' className='searchBar' placeholder='Search For Movies..' ref={searchField} />
        <button className='searchButton' onClick={() => search(false, 1)}> &#x1F50E; </button>
      </div>
      <LoadingPopup isLoading={isLoading} />
      <ErrorMessage errorMessage={errorMessage}/>
      <div className='resultParentBox'>
        <div className='searchResultsBox'>
          {
            movies.map((item, index) => {
              return (
                <MoviesResults key={`card_${index}`} item={item} index={index} />
              );
            })
          }
        </div>
        <div className='paginationNumbersBox' ref={paginationNumbersButtons}>
          { paginationNumbers }
        </div>
      </div>
    </div>
  );
}

export default Home;

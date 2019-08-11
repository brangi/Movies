import React, { useState } from 'react'
import _  from 'lodash'
import cleanDeep from 'clean-deep';

import MovieAdd from './MovieAdd'
import MovieEdit from './MovieEdit'
import MoviesList from './MoviesList'
import MovieSearch from './MovieSearch'

import {
  fetchMovies,
  postMovie,
  removeMovie,
  changeMovieDetails,
  search
} from './ApiService';

const App = () => {
  const initialFormState = { id: null, title: '', genre: '', year: '', actors : '', rating: '' };
  const [ movies, setMovies ] = useState([]);
	const [ currentMovie, setCurrentMovie ] = useState(initialFormState);
	const [ editing, setEditing ] = useState(false);
  const [ searching, setSearching ] = useState(false);
  const [ found, setFound ] = useState('INIT');

  const addMovie = async movie => {
    movie = await postMovie(movie);
    setMovies([ ...movies, movie ])
	};

  const getAllMovies = () =>{
    fetchMovies().then(data => {
     setMovies([ ...data.movies ])
    });
  };

	const deleteMovie = async id => {
		setEditing(false);
		const deleteMovie = await removeMovie(id);
		if(deleteMovie && deleteMovie.deleted) setMovies(movies.filter(movie => movie.id !== id))
	};

	const updateMovie = async (id, updatedMovie) => {
		setEditing(false);
		const currentMovie = movies.find(movie => movie.id === id );
    let updatedInfo  = _.omitBy(updatedMovie, function(v, k) {
      return currentMovie[k] === v;
    });
    for(const key in updatedInfo) {
      updatedInfo[key] = updatedInfo[key].trim();
    }
    updatedInfo = cleanDeep(updatedInfo);
    if(!Object.keys(updatedInfo).length) return;

    const movieUpdated = await changeMovieDetails(id, updatedInfo);
    if(movieUpdated && movieUpdated.updated) setMovies(movies.map(movie => (movie.id === id ? updatedMovie : movie)))
	};

  const addOrSearchBtn = ()=> {
    (searching)? setSearching(false) : setSearching(true);
    setMovies([]);
    setFound('')
  };

	const editMovie = movie => {
		setEditing(true);
    setCurrentMovie(
      { id: movie.id,
        title: movie.title,
        genre: movie.genre,
        year: movie.year,
        actors: movie.actors,
        rating: movie.rating,
        poster : movie.poster});
	};

  const searchMovie = async (movie) => {
    for(const key in movie) {
      movie[key] = movie[key].trim();
    }
    movie = cleanDeep(movie);
    if(!Object.keys(movie).length) return;
    const foundMovies = await search(movie);

    if(foundMovies.movies.length){
       setFound('FOUND')
    }else {
       setFound('NOT_FOUND')
    }
    setMovies([ ...foundMovies.movies ])
  };

	return (
		<div className="container">
			<h1>Movies collection CRUD and Search</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<div>
							<h2>Edit movie</h2>
							<MovieEdit
								editing={editing}
								setEditing={setEditing}
                currentMovie={currentMovie}
                setMovies ={setMovies}
                updateMovie={updateMovie}
							/>
						</div>
					) : (
						<div>
              <button className="button muted-button" onClick={addOrSearchBtn} >
                {searching? 'Add...': 'Search...'}
              </button>
							<h2>{searching? 'Search movie': 'Add movie'}</h2>
                <div style={{fontStyle: "italic"}}>
                {searching? 'Search by one or more fields': 'All fields are required*'}
              </div>
              { searching?
                    <MovieSearch
                      searchMovie={searchMovie}
                      found={found}
                      movies={movies}
                      setFound={setFound}
                    />
                  : <MovieAdd addMovie={addMovie} />}
						</div>
					)}
				</div>
				<div className="flex-large">
					<div>
            <h2>Movies</h2>
            <button onClick={() => {getAllMovies()}}>
              All Movies
            </button>
          </div>
					<MoviesList
            movies={movies}
            editMovie={editMovie}
            deleteMovie={deleteMovie}
          />
				</div>
			</div>
		</div>
	)
};

export default App

import React, { useState } from 'react'

const MovieAdd = props => {
	const initialFormState = { id: null, title: '', genre: '', year: '', actors : '', rating: '' };
	const [ movie, setMovie ] = useState(initialFormState);

	const handleInputChange = event => {
		const { name, value } = event.target;
    setMovie({ ...movie, [name]: value })
	};

	return (
		<form onSubmit={event => {
		    event.preventDefault();
				if (!movie.title || !movie.genre  || !movie.year || !movie.actors  || !movie.rating) return;
				 props.addMovie(movie);
         setMovie(initialFormState)
			}}>
			<label>Title</label>
			<input type="text" name="title" value={movie.title} onChange={handleInputChange}  required/>
			<label>Genre</label>
			<input type="text" name="genre" value={movie.genre} onChange={handleInputChange} required />
      <label>Year</label>
      <input type="text" name="year" value={movie.year} onChange={handleInputChange} required pattern="[0-9]*" />
      <label>Actors</label>
      <input type="text" name="actors" value={movie.actors} onChange={handleInputChange}  required/>
      <label>Rating</label>
      <input type="text" name="rating" value={movie.rating} onChange={handleInputChange}  required pattern="[0-9]*"/>
			<button>Add movie</button>
		</form>
	)
};

export default MovieAdd

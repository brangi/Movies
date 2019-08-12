import React, { useState } from 'react'

const MovieSearch = props => {
  const initialFormState = { title: '', genre: '', year: '', actors : '', rating: ''};
  const [ movie, setMovie ] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value })
  };

  const searchResult =(s) =>{
    switch(s) {
      case 'FOUND':
        return '';
      case 'NOT_FOUND':
        return 'NOT FOUND';
      case "ENTRY_REQ":
        return 'ENTRY REQUIRED';
      default:
        return '';
    }
  };

  return (
  <div>
    <form onSubmit={event => {
        event.preventDefault();
        if (!movie.title && !movie.genre && !movie.year&& !movie.actors  &&!movie.rating){
          props.setFound('ENTRY_REQ');
          return;
        }
        props.searchMovie(movie);
      }}
      onFocus={() => {
        props.setFound('')
    }}>
      <label>Title</label>
      <input type="text" name="title" value={movie.title} onChange={handleInputChange}  />
      <label>Genre</label>
      <input type="text" name="genre" value={movie.genre} onChange={handleInputChange} />
      <label>Year</label>
      <input type="text" name="year" value={movie.year} onChange={handleInputChange} pattern="[0-9]*"  />
      <label>Actors</label>
      <input type="text" name="actors" value={movie.actors} onChange={handleInputChange} />
      <label>Rating</label>
      <input type="text" name="rating" value={movie.rating} onChange={handleInputChange} pattern="^(?:[1-9]|0[1-9]|10)$" placeholder="1..10"/>
      <div style={{color: "red", "fontWeight": "bold" }}>{ searchResult(props.found) }</div>
      <button>Search movie</button>
      </form>
    </div>

  )
};

export default MovieSearch

import React, { useState, useEffect } from 'react'

const MovieEdit = props => {
  const [ movie, setMovie ] = useState(props.currentMovie);

  useEffect(() => {
      setMovie(props.currentMovie)
    },
    [ props ]
  );

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value })
  };

  return (
    <form name="edit-movie" onSubmit={event => {
      event.preventDefault();
      if (!movie.title || !movie.genre  || !movie.year || !movie.actors  || !movie.rating) return;
      props.updateMovie(movie.id, movie)}
    }>
      <label>Title</label>
      <input type="text" name="title" value={movie.title} onChange={handleInputChange} required />
      <label>Genre</label>
      <input type="text" name="genre" value={movie.genre} onChange={handleInputChange} required />
      <label>Year</label>
      <input type="text" name="year" value={movie.year} onChange={handleInputChange} required  pattern="[0-9]*"  />
      <label>Actors</label>
      <input type="text" name="actors" value={movie.actors} onChange={handleInputChange} required />
      <label>Rating</label>
      <input type="text" name="rating" value={movie.rating} onChange={handleInputChange} required pattern="[0-9]*"  />
      <button>Update</button>
      <button onClick={() => {
        props.setEditing(false);
        props.setMovies([]);
      }} className="button muted-button">
        Cancel
      </button>
    </form>
  )
};

export default MovieEdit

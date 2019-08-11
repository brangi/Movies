import React from 'react'

const MoviesList = props => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Genre</th>
      </tr>
    </thead>
    <tbody>
      {props.movies.length > 0 ? (
        props.movies.map(movie => (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.genre}</td>
            <td>
              <button onClick={() => {props.editMovie(movie)}} className="button muted-button">
                Edit
              </button>
              <button onClick={() => props.deleteMovie(movie.id)} >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>Movies searched or added will appear here...</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default MoviesList

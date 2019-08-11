import axios from 'axios';

export async function fetchMovies() {
 const res = await axios.get("http://localhost:1400/movies");
 return res.data
}

export async function changeMovieDetails(id, movie) {
 return axios.put(`http://localhost:1400/movie/${id.toString()}`, movie).then(function (response) {
   return response.data;
 }).catch(function (error) {console.log(error)});
}

export async function removeMovie(id) {
 const res = await axios.delete(`http://localhost:1400/movie/${id}`);
 return res.data
}

export async function search(fields) {
 let query = ``;
 let i = 0;
 const numValues = Object.values(fields).length;
 for (const [key, val] of Object.entries(fields)) {
   i++;
   if(Number.isInteger(val)){
     if(i >= numValues){
       query += `${key}=${val}`;
     } else {
       query += `${key}=${val}&`;
     }
   } else {
     if(i >= numValues){
       query += `${key}=${val}`
     } else {
       query +=`${key}=${val}&`;
     }
   }
 }
 const res = await axios.get(`http://localhost:1400/search?${query}`);
 return res.data
}

export function postMovie(movie) {
 return axios.post('http://localhost:1400/movie', {
   title: movie.title,
   genre: movie.genre,
   year: movie.year,
   actors: movie.actors,
   rating: movie.rating
 }).then(function (response) {
  return response.data;
}).catch(function (error) {console.log(error)});
}


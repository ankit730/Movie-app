import React, { Component } from 'react'
import {movies} from './DummyMovies';
let firstMovie = movies.results[0];
// console.log(firstMovie)
export default class Banner extends Component {
  render() {
    return (
        <div class="card banner-card">
        <img src={`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`} className="card-img-top banner-img" alt="..."/>
        <div class="card-body img-card-cont">
          <h5 class="card-title">{firstMovie.original_title}</h5>
          <p class="card-text">{firstMovie.overview}</p>
        </div>
        <h2 className="text-center trending-h2"> Trending </h2>
      </div>
      
    )
  }
}

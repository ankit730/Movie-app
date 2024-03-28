import React, { Component } from "react";
// import { movies } from "./DummyMovies";
import axios from "axios";
export default class MoviesHome extends Component {
  constructor() {
    super();
    this.state = {
     hoveredMovieId:'',
      movies: [],
      favorite_movies: [],
      currPage: 1,
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=cdef55d1201827e4f15732c00e71841c&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    // console.log(data.results)
    this.setState({
      movies: [...data.results],
    });
  }


handleMouseEnter = (movieObj)=>{
    this.setState({
        hoveredMovieId:movieObj.id
    })
}

handleMouseLeave = ()=>{
    this.setState({
        hoveredMovieId:''
    })
}

handleFavourite = (movieObj)=>{
    let alreadyFavoriteMovies = JSON.parse(localStorage.getItem('movie-app-1') || '[]');
    console.log(alreadyFavoriteMovies);
    
    if(this.state.favorite_movies.includes(movieObj.id)){
        alreadyFavoriteMovies = alreadyFavoriteMovies.filter((movie)=>{
             return movie.id !== movieObj.id
        })
    }
    else{
        alreadyFavoriteMovies.push(movieObj);
        // alreadyFavoriteMovies.setItem('movie-app-1', JSON.stringify(alreadyFavoriteMovies));
    }

    this.updateFavoriteMoviesState(alreadyFavoriteMovies);
    
}

updateFavoriteMoviesState = (updatedFavMovies)=>{
    let favMoviesIds = updatedFavMovies.map((movie)=>{
        return movie.id;
    })
    this.setState({
        favorite_movies:[...favMoviesIds]
    })
    localStorage.setItem('movie-app-1', JSON.stringify(updatedFavMovies));
}


  render() {
    return (
      <div class="container home-page-movies-cont">
       
          {this.state.movies.map((movieObj) => (
             <div class="card home-movies-card " onMouseEnter={()=>this.handleMouseEnter(movieObj)} onMouseLeave={()=>this.handleMouseLeave(movieObj)}>
            <img
              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
              className="card-img-top home-movies-img"
              alt="..."
            />
            <div class="card-body home-page-img-card-cont" onClick={()=>this.handleFavourite(movieObj)}>
                {
                    movieObj.id === this.state.hoveredMovieId && (
                    this.state.favorite_movies.includes(movieObj.id)
                    ?
                    <i class="fa-solid fa-heart"></i>
                    :
                    <i class="fa-regular fa-heart"></i>
                    )
             
                }
            
          </div>
        </div>
          ))}

      </div>
    );
  }
}

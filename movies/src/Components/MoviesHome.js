import React, { Component } from "react";
// import { movies } from "./DummyMovies";
import axios from "axios";

export default class MoviesHome extends Component {
  constructor() {
    super();
    this.state = {
      hoveredMovieId: "",
      movies: [],
      favorite_movies: [],
      currPage: 1,
      allPages:[]
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
      allPages:[1]
    });

    // first time by default only the first page should be part of the page array
   
  }

  handleMouseEnter = (movieObj) => {
    this.setState({
      hoveredMovieId: movieObj.id,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hoveredMovieId: "",
    });
  };

  handleFavourite = (movieObj) => {
    let alreadyFavoriteMovies = JSON.parse(
      localStorage.getItem("movie-app-1") || "[]"
    );
    console.log(alreadyFavoriteMovies);

    if (this.state.favorite_movies.includes(movieObj.id)) {
      alreadyFavoriteMovies = alreadyFavoriteMovies.filter((movie) => {
        return movie.id !== movieObj.id;
      });
    } else {
      alreadyFavoriteMovies.push(movieObj);
      // alreadyFavoriteMovies.setItem('movie-app-1', JSON.stringify(alreadyFavoriteMovies));
    }

    this.updateFavoriteMoviesState(alreadyFavoriteMovies);
  };

  updateFavoriteMoviesState = (updatedFavMovies) => {
    let favMoviesIds = updatedFavMovies.map((movie) => {
      return movie.id;
    });
    this.setState({
      favorite_movies: [...favMoviesIds],
    });
    localStorage.setItem("movie-app-1", JSON.stringify(updatedFavMovies));
  };

  updateMoviesAfterPageChange = async () =>{
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=cdef55d1201827e4f15732c00e71841c&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    // console.log(data.results)
    this.setState({
      movies: [...data.results],
    });
  }

  handleNextPage =()=>{

    let paginationSize = this.state.allPages.length;
    let newPaginationArr =[];
    for(let i =1; i<= paginationSize+1; ++i){
      newPaginationArr.push(i);
    }
    //increment currPage by 1
    this.setState({
      currPage : this.state.currPage +1,
      allPages :[...newPaginationArr]
    },
    this.updateMoviesAfterPageChange
    )
  }

  render() {
    return (
      <>
        <div class="container home-page-movies-cont">
          {this.state.movies.map((movieObj) => (
            <div
              class="card home-movies-card "
              onMouseEnter={() => this.handleMouseEnter(movieObj)}
              onMouseLeave={() => this.handleMouseLeave(movieObj)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                className="card-img-top home-movies-img"
                alt="..."
              />
              <div
                class="card-body home-page-img-card-cont"
                onClick={() => this.handleFavourite(movieObj)}
              >
                {movieObj.id === this.state.hoveredMovieId &&
                  (this.state.favorite_movies.includes(movieObj.id) ? (
                    <i class="fa-solid fa-heart"></i>
                  ) : (
                    <i class="fa-regular fa-heart"></i>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-bottom">
          <nav aria-label="Page navigation example">
            <ul class="pagination">

              <li class="page-item">
                <a class="page-link" aria-label="Previous" onClick={this.handlePreviousPage}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {/* Iterate over all the pages and display them */}
              {
                this.state.allPages.map((page)=>(
                <li class="page-item">
                  <a class="page-link">{page}</a>
                </li>
              
                ))
              }
              
              <li class="page-item"> 
                <a class="page-link" aria-label="Next" onClick={this.handleNextPage}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>

            </ul>
          </nav>
        </div>
      </>
    );
  }
}

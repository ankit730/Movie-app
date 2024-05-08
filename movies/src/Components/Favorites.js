import React, { Component } from "react";
import { genreids } from "./genres";
export default class Favorites extends Component {
  constructor() {
    super();
    this.state ={
        favoriteMovies: [],
        allGenres:[],
        currSelectedGenre: 'All Genres',

    }
  }


  componentDidMount(){
    let favMoviesInLocalStorage = JSON.parse(localStorage.getItem('movie-app-1') || '[]');
    let genreList=[];
    genreList.push("All Genres");
   favMoviesInLocalStorage.forEach((movieObj)=>{
        if(!genreList.includes(movieObj.genre_ids[0])){
            genreList.push(movieObj.genre_ids[0]);
        }
   })

    this.setState({
        favoriteMovies:[...favMoviesInLocalStorage],
        allGenres: [...genreList]
    })
  }


  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-3">
            <ul class="list-group list-group-item-dark">
              {/* <li class="list-group-item active"aria-current="true" >
                An active item
              </li>
              <li class="list-group-item " >A second item</li> */}
              {/* <li class="list-group-item">{list[0]}</li>
              <li class="list-group-item">A fourth item</li>
              <li class="list-group-item">And a fifth one</li> */}
              {
                this.state.allGenres.map((favMoviesGenre)=>(
                    favMoviesGenre === this.state.currSelectedGenre 
                    ?
                    <li class="list-group-item active" aria-current="true"> {genreids[favMoviesGenre]}</li>
                    :
                    <li class="list-group-item "> {genreids[favMoviesGenre]}</li>
                ))
              }
            </ul>
          </div>
          <div class="col-9 second-part">
            <div class="row">
            <input type="text" className="input-group-text col bg-dark text-secondary " placeholder="Search"></input>
            <input type="text" className="input-group-text col bg-dark text-secondary" placeholder="Max rows at a time"></input>
            </div>
            <table class="table table-dark">
              <thead>
                <tr class="table-active">
                  <th scope="col ">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Popularity</th>
                  <th scope="col">Rating</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <th scope="row">1</th>
                  <td><img src={`https://image.tmdb.org/t/p/original/6EdKBYkB1ssgGjc249ud1L55o8d.jpg`} style={{height:'5rem', width:'8rem'}}/></td>
                  <td style={{paddingTop:'2rem'}}>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr> */}
               {
                this.state.favoriteMovies.map((movieObj)=>(
                    <tr>
                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{height:'5rem', width:'8rem'}}/></td>
                        <td style={{paddingTop:'2rem'}}>{genreids[movieObj.genre_ids[0]]}</td>
                        <td style={{paddingTop:'2rem'}}>{movieObj.popularity}</td>
                        <td style={{paddingTop:'2rem'}}>{movieObj.vote_count}</td>
                    </tr>
                ))
               }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

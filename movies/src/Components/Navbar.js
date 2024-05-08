import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesHome from "./MoviesHome";
import Favorites from "./Favorites";
export default class Navbar extends Component {
  render() {
    return (
       <div className="navbar-container">
        <Link to ="/" style={{textDecoration:'none', fontSize:'2rem'}}>My movies</Link>
        <Link to ="/favorites" style={{textDecoration:'none', fontSize:'2rem'}}> Favorites</Link>
       </div>
    );
  }
}

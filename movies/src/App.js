import logo from './logo.svg';
import './App.css';
import './Components-style.css';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import MoviesHome from './Components/MoviesHome';
import Favorites from './Components/Favorites';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// Special Thanks to Pepcoding !!!
function App() {
  return (
    
     <BrowserRouter>
      <Navbar></Navbar>
     <Routes>
      <Route exact path ="/" element={[ <Banner/>, <MoviesHome/>]}/>
      <Route path="/favorites" element={<Favorites/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

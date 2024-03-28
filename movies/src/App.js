import logo from './logo.svg';
import './App.css';
import './Components-style.css';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import MoviesHome from './Components/MoviesHome';
// Special Thanks to Pepcoding !!!
function App() {
  return (
    <>
     {/* <h1> Testing </h1> */}
    <Navbar></Navbar>
    <Banner></Banner>
    <MoviesHome></MoviesHome>
    </>
   
  );
}

export default App;

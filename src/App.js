import './App.css';
import Movie from './components/Movie';
import MoviesPage from './components/MoviesPage';
import { BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<MoviesPage></MoviesPage>}></Route>
      <Route path='/movie/:categoryId' element={<Movie></Movie>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
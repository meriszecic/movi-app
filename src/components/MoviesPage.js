import { useState, useEffect } from "react";
import '../style/MoviePage.css'
import { Link } from "react-router-dom";

const fetchCategories = async () => {
  const response = await fetch('https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/categories');
  const data = await response.json();
  return data;
};

const fetchMovies = async () => {
  const response = await fetch('https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies');
  const data = await response.json();
  return data;
};

function MoviesPage() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [active, setActive] = useState(null)
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
    fetchMovies().then((data) => {
      setMovies(data);
      setFilteredMovies(data);
    });
  }, []);

  const handleCategory = (categoryId) => {
    if (categoryId === 'all') {
      setFilteredMovies(movies);
    } else {
      const filteredMovies = movies.filter((movie) => movie.categoryId === Number(categoryId));
      setFilteredMovies(filteredMovies);
    }
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDescription = (movieId, description) => {
    if (expandedMovieId === movieId) {
      setExpandedMovieId(null);
    } else {
      setExpandedMovieId(movieId);
    }
  };

  return (
    <>
    <h1 className="naslov-kategorija" title="Categories">Categories</h1>
      <ul className="kategorije">
        <li className={`list-item ${active == active && "active"}`} onClick={() => {handleCategory('all');setActive(active)}} key="all">All</li>
        {categories.map((category) => (
          <li title={category.name} className={`list-item ${active == category && "active"}`} onClick={() => {handleCategory(category.id);setActive(category)}} key={category.id}>{category.name}</li>
        ))}
      </ul>
      <div className="sviFilmovi">
        <div className="filmovi">
          {currentMovies?.map((movie) => (
            <div className="film" key={movie.id}>
              <img width="250px" height="250px" src={movie.imageUrl} alt="nema" />
              <Link to={`/movie/${movie.id}`}>
              <h3 title={movie.name}>{movie.name}</h3>
              </Link>
              <p onClick={() => handleDescription(movie.id, movie.description)}>
                {expandedMovieId === movie.id ? movie.description : `${movie.description.slice(0, 100)} ...`}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="dugmici">
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <button
            className={`dugme ${active == pageNumber && 'active'} `}
            key={pageNumber}
            onClick={() => {onPageChange(pageNumber + 1);setActive(pageNumber)}}
            disabled={currentPage === pageNumber + 1}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default MoviesPage;
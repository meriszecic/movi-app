import { useEffect, useState } from 'react';
import '../style/movie.css'
import {  Link, useParams } from 'react-router-dom'


function Movie () {
    const [movie, setMovie] = useState([]);
    const {categoryId} = useParams();
    const [link, setLink] = useState(null);
    const [comments, setComments] = useState([])

    const fetchMovies = async () => {
        const response = await fetch(`https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${categoryId}`);
        const data = await response.json();
        return data;
      };      

      function formatDate(date) {
        if (!date) return '';
    
        const dateObj = new Date(date);
        return `${dateObj.getDate()}.${dateObj.getMonth()}.${dateObj.getFullYear()}.`
      }

      const fetchImdb = async (imdbId) => {
        const response = await fetch(`https://imdb-api.com/en/API/Trailer/k_9lqp59ej/${imdbId}`);
        const data = await response.json();
        return data;
      }

      const fetchComments = async () => {
        const response = await fetch(`https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${categoryId}/comments`)
        const data = await response.json();
        return data
      }

    useEffect(() => {
        fetchMovies().then((data) => setMovie(data)).then(fetchImdb(movie.imdbId).then((data) => setLink(data)).catch((error) => {
            console.error('Error:', error);
          }))
        fetchComments().then((data) => setComments(data));
    },[])
    
    // useEffect(() => {
    //     setInterval(() => fetchImdb(movie.imdbId).then((data) => setLink(data)),3000)
    // },[])

    return (
        <div className="container">
            <div className='content'>
                    <div className='naslov'>
                    <p>{movie.name}</p>
                    </div>
                <div className='leva-strana'>
                <div className='slika'>
                    <img src={movie.imageUrl} width='80%' alt='Slika filma'></img>
                </div>
                <div className='tekst'>
                    <p>{movie.description}</p>
                    {/* <Link to={link.link}>🎥 Whatch the trailer</Link>          */}
                    <p>🎥 Whatch the trailer</p>
                </div>
                </div>
                <div>
                    <div className='comments'>
                <div className='naslov-komentari'>
                    <p>Comments:</p>
                    </div>
                    {comments.map((comment) => (<div className='comment'>
                    <p className='p1'>{comment.username ? comment.username : '*user not found*'}</p>
                    <p className='p2'>{comment.comment}</p>
                    <p className='p3'>{formatDate(comment.createdAt)}</p>
                    </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Movie
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';


const App = () => {
  const [newName, setNewName] = useState()
  const [newRelease, setNewRelease] = useState()
  const [newImage, setNewImage] = useState()
  const [newGenre, setNewGenre] = useState()
  const [movies, setMovies] = useState([])
  const [editForm, setEditForm] = useState(false)
  const [editItem, setEditItem] = useState()


  const handleNewNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNewReleaseChange = (event) => {
    //console.log(event.target.value);
    setNewRelease(event.target.value)
  }

  const handleNewImageChange = (event) => {
    //console.log(event.target.value);
    setNewImage(event.target.value)
  }

  const handleNewGenreChange = (event) => {
    //console.log(event.target.value);
    setNewGenre(event.target.value)
  }

  useEffect(()=>{
    axios
      .get('http://localhost:3000/movies')
      .then((response)=>{
        //console.log(response);
        setMovies(response.data)
        setEditItem(response.data._id)
      })
  },[])

  const handleDelete = (movieData)=>{
  axios
    .delete(`http://localhost:3000/movies/${movieData._id}`)
      .then(()=>{
        axios
          .get('http://localhost:3000/movies')
          .then((response)=>{
            setMovies(response.data)
          })
      })
  }

  const handleNewMovieFormSubmit = (event) => {
    setEditForm(false)
    event.preventDefault()
    axios.post(
     'http://localhost:3000/movies',
     { //must match model
       name: newName,
       release: newRelease,
       image: newImage,
       genre: newGenre,
     }
   ).then(()=>{
      axios
        .get('http://localhost:3000/movies')
        .then((response)=>{
          setMovies(response.data)
        })
    })
  }

  const showEditForm = () => {
    // if (movieId === editItem ) {
    //   setEditForm(true)
    // }
    setEditForm(true)
  }

  const handleEditForm = (event, movieData) => {
    setEditForm(false)
    event.preventDefault();
    axios
      .put(
        `http://localhost:3000/movies/${movieData._id}`,
        {
          name: newName,
          release: newRelease,
          image: newImage,
          genre: newGenre
        }
      )
    .then(()=>{
      axios
        .get('http://localhost:3000/movies')
        .then((response)=>{
          setMovies(response.data)
        })
    })
  }

  return (
    <>
      <div className="new-movie-form-div">
        <h3 className="new-moive-text">Create New Movie</h3>
        <form onSubmit={handleNewMovieFormSubmit}>
            Name: <input type="text" onChange={handleNewNameChange} required/><br/>
            Released: <input type="text" onChange={handleNewReleaseChange} required/><br/>
            Genre: <input type="text" onChange={handleNewGenreChange} required/><br/>
            Image: <input type="text" onChange={handleNewImageChange} required/><br/>
            <input type="submit" value="Create Movie"/>
        </form>
      </div>
      <h1 className="movies-text">Movies</h1>
      <div className="movies-flexbox">
      {
        movies.map((movie) => {
          return (
            <>
              <div key={movie._id} className="movie-card">
                <div className="movie-image-div">
                  <img src={movie.image} alt=""/>
                </div>
                <h4 className="movie-name">{movie.name}</h4>
                <p className="movie-release">Released: {movie.release}</p>
                <p className="movie-genre">Genre: {movie.genre}</p>
                <div className="animalBtnsDiv">
                  <button
                    onClick={(event) => {
                      handleDelete(movie)
                    }} className="delete-btn">
                    Delete
                  </button>
                  <button onClick={showEditForm} className="edit-Btn">
                    Edit
                  </button>
                </div>
              </div>
              {(editForm) ?
                <div className="edit-movie-form-div">
                  <h3 className="edit-moive-text">Edit {movie.name}</h3>
                  <form onSubmit={(event) => handleEditForm(event, movie)} key={movie._id}>
                      Name: <input type="text" defaultValue={movie.name} onChange={handleNewNameChange} required/><br/>
                      Released: <input type="text" defaultValue={movie.release} onChange={handleNewReleaseChange} required/><br/>
                      Genre: <input type="text" defaultValue={movie.genre} onChange={handleNewGenreChange} required/><br/>
                      Image: <input type="text" defaultValue={movie.image} onChange={handleNewImageChange} required/><br/>
                      <input type="submit" value="Submit"/>
                  </form>
                </div>
              : null}
            </>
          )
        })
      }
      </div>
    </>
  )
}

export default App;

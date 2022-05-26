import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';


const App = () => {
  const [newName, setNewName] = useState("")
  const [newRelease, setNewRelease] = useState("")
  const [newImage, setNewImage] = useState("")
  const [newGenre, setNewGenre] = useState("")
  const [movies, setMovies] = useState([])
  const [editForm, setEditForm] = useState(false)


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
      <div classNmae="new-movie-form-div">
        <h3 classNmae="new-moive-text">Create New Movie</h3>
        <form onSubmit={handleNewMovieFormSubmit}>
            Name: <input type="text" onChange={handleNewNameChange}/><br/>
            Released: <input type="text" onChange={handleNewReleaseChange}/><br/>
            Genre: <input type="text" onChange={handleNewGenreChange}/><br/>
            Image: <input type="text" onChange={handleNewImageChange}/><br/>
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
                <div classNane="movie-image-div">
                  <img src={movie.image} alt=""/>
                </div>
                <h4 className="movie-name">{movie.name}</h4>
                <p className="movie-release">{movie.release}</p>
                <p className="movie-genre">{movie.genre}</p>
              </div>
              {(editForm) ?
                <div classNmae="edit-movie-form-div">
                  <h3 classNmae="edit-moive-text">Edit {movie.name}</h3>
                  <form onSubmit={handleNewMovieFormSubmit}>
                      Name: <input type="text" defaultValue={movie.name} onChange={handleNewNameChange}/><br/>
                      Released: <input type="text" defaultValue={movie.release} onChange={handleNewReleaseChange}/><br/>
                      Genre: <input type="text" defaultValue={movie.genre} onChange={handleNewGenreChange}/><br/>
                      Image: <input type="text" defaultValue={movie.image} onChange={handleNewImageChange}/><br/>
                      <input type="submit" value="Create Movie"/>
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

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

  const handleShowEditForm = (event) => {
    setEditForm(true)
  }

  useEffect(()=>{
    axios
      .get('http://localhost:3000/movies')
      .then((response)=>{
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
       editForm: editForm
     }
   ).then(()=>{
      axios
        .get('http://localhost:3000/movies')
        .then((response)=>{
          setMovies(response.data)
        })
    })
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
          genre: newGenre,
          editForm: editForm,
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
        <div className="new-movie-form-input-div">
          <form onSubmit={handleNewMovieFormSubmit}>
              Name: <input type="text" onChange={handleNewNameChange} required/><br/>
              Released: <input type="text" onChange={handleNewReleaseChange} required/><br/>
              Genre: <input type="text" onChange={handleNewGenreChange} required/><br/>
              Image: <input type="text" onChange={handleNewImageChange} required/><br/>
              <div className="create-movie-btn-div">
                <input type="submit" value="Create Movie"/>
              </div>
          </form>
        </div>
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
                  <button onClick={(event) => {
                    handleShowEditForm(movie)
                  }} className="edit-Btn">
                    Edit
                  </button>
                </div>
              {(editForm) ?
                  <div className="edit-movie-form-div" key={movie._id}>
                    <h3 className="edit-moive-text">Edit {movie.name}</h3>
                    <form onSubmit={(event) => handleEditForm(event, movie)}>
                        Name: <input type="text" placeholder={movie.name} onChange={handleNewNameChange} className="edit-text" required/><br/>
                        Released: <input type="text" placeholder={movie.release} onChange={handleNewReleaseChange} className="edit-text" required/><br/>
                        Genre: <input type="text" placeholder={movie.genre} onChange={handleNewGenreChange}className="edit-text" required/><br/>
                        Image: <input type="text" placeholder={movie.image} onChange={handleNewImageChange} className="edit-text" required/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                  </div>
              : null}
              </div>
            </>
          )
        })
      }
      </div>
    </>
  )
}

export default App;


//========== Graveyard ==========//
// //form onSubmit={(event) => handleEditForm(event, movie)}
//
// //----- Attempt at getting only one edit button to appear, with editForm in schema
// import './App.css';
// import {useState, useEffect} from 'react';
// import axios from 'axios';
//
//
// const App = () => {
//   const [newName, setNewName] = useState()
//   const [newRelease, setNewRelease] = useState()
//   const [newImage, setNewImage] = useState()
//   const [newGenre, setNewGenre] = useState()
//   const [movies, setMovies] = useState([])
//   const [editForm, setEditForm] = useState(false)
//   //const {setValue} = useForm()
//   //const [editItem, setEditItem] = useState()
//
//
//   const handleNewNameChange = (event) => {
//     //console.log(event.target.value);
//     setNewName(event.target.value)
//   }
//
//   const handleNewReleaseChange = (event) => {
//     //console.log(event.target.value);
//     setNewRelease(event.target.value)
//   }
//
//   const handleNewImageChange = (event) => {
//     //console.log(event.target.value);
//     setNewImage(event.target.value)
//   }
//
//   const handleNewGenreChange = (event) => {
//     //console.log(event.target.value);
//     setNewGenre(event.target.value)
//   }
//
//   const handleShowEditForm = (event) => {
//     //console.log(event.target.value);
//     //setEditForm(event.target.setAttribute(editForm, true))
//     //setEditForm(event.setAttribute("editForm", true))
//     //setEditForm(event.target.true)
//     //setEditForm(true)
//     //editForm.setAttribute("editForm", "true")
//     //editForm.setAttribute("editForm", true)
//     //event.editForm.setAttribute("editForm", "true")
//     //event.target.setAttribute(movie.editForm, true)
//     //console.log(event);
//     //console.log(movie);
//     //event.setAttribute(true)
//     //setEditForm(event.target.value)
//     //setValue(event.target.value, true)
//     //setEditForm(event.target, true)
//     //setEditForm(event.target, true)
//     setEditForm(true)
//   }
//
//   useEffect(()=>{
//     axios
//       .get('http://localhost:3000/movies')
//       .then((response)=>{
//         //console.log(response);
//         setMovies(response.data)
//         //setEditItem(response.data._id)
//       })
//   },[])
//
//   const handleDelete = (movieData)=>{
//   axios
//     .delete(`http://localhost:3000/movies/${movieData._id}`)
//       .then(()=>{
//         axios
//           .get('http://localhost:3000/movies')
//           .then((response)=>{
//             setMovies(response.data)
//           })
//       })
//   }
//
//   const handleNewMovieFormSubmit = (event) => {
//     setEditForm(false)
//     event.preventDefault()
//     axios.post(
//      'http://localhost:3000/movies',
//      { //must match model
//        name: newName,
//        release: newRelease,
//        image: newImage,
//        genre: newGenre,
//        editForm: editForm
//      }
//    ).then(()=>{
//       axios
//         .get('http://localhost:3000/movies')
//         .then((response)=>{
//           setMovies(response.data)
//         })
//     })
//   }
//
//
//   // const showEditForm = (movieData) => {
//   //   //setEditItem(movie._id)
//   //   setEditForm(true)
//   // }
//
//   const handleEditForm = (event, movieData) => {
//     setEditForm(false)
//     event.preventDefault();
//     axios
//       .put(
//         `http://localhost:3000/movies/${movieData._id}`,
//         {
//           name: newName,
//           release: newRelease,
//           image: newImage,
//           genre: newGenre,
//           editForm: editForm,
//         }
//       )
//     .then(()=>{
//       axios
//         .get('http://localhost:3000/movies')
//         .then((response)=>{
//           setMovies(response.data)
//         })
//     })
//   }
//
//   return (
//     <>
//       <div className="new-movie-form-div">
//         <h3 className="new-moive-text">Create New Movie</h3>
//         <form onSubmit={handleNewMovieFormSubmit}>
//             Name: <input type="text" onChange={handleNewNameChange} required/><br/>
//             Released: <input type="text" onChange={handleNewReleaseChange} required/><br/>
//             Genre: <input type="text" onChange={handleNewGenreChange} required/><br/>
//             Image: <input type="text" onChange={handleNewImageChange} required/><br/>
//             <input type="submit" value="Create Movie"/>
//         </form>
//       </div>
//       <h1 className="movies-text">Movies</h1>
//       <div className="movies-flexbox">
//       {
//         movies.map((movie) => {
//           return (
//             <>
//               <div key={movie._id} className="movie-card">
//                 <div className="movie-image-div">
//                   <img src={movie.image} alt=""/>
//                 </div>
//                 <h4 className="movie-name">{movie.name}</h4>
//                 <p className="movie-release">Released: {movie.release}</p>
//                 <p className="movie-genre">Genre: {movie.genre}</p>
//                 <div className="animalBtnsDiv">
//                   <button
//                     onClick={(event) => {
//                       handleDelete(movie)
//                     }} className="delete-btn">
//                     Delete
//                   </button>
//                   <button onClick={(event) => {
//                     handleShowEditForm(movie)
//                     //handleShowEditForm(movie)
//                     //event.target.setAttribute("editForm", true)
//                     //event.target.setAttribute(movie.editForm, true)
//                     //setEditForm(true)
//                     //console.log(movie.editForm);
//                     //console.log(movie);
//                     //replace(movie.editForm, true)
//                     //setEditForm(movie.editForm, true)
//                     //console.log(movie);
//                   }} className="edit-Btn">
//                     Edit
//                   </button>
//                 </div>
//               </div>
//               {(movie.editForm) ?
//                   <div className="edit-movie-form-div" key={movie._id}>
//                     <h3 className="edit-moive-text">Edit {movie.name}</h3>
//                     <form onSubmit={(event) => handleEditForm(event, movie)}>
//                         Name: <input type="text" placeholder={movie.name} onChange={handleNewNameChange} required/><br/>
//                         Released: <input type="text" placeholder={movie.release} onChange={handleNewReleaseChange} required/><br/>
//                         Genre: <input type="text" placeholder={movie.genre} onChange={handleNewGenreChange} required/><br/>
//                         Image: <input type="text" placeholder={movie.image} onChange={handleNewImageChange} required/><br/>
//                         <input type="submit" value="Submit"/>
//                     </form>
//                   </div>
//               : null}
//             </>
//           )
//         })
//       }
//       </div>
//     </>
//   )
// }
//
// export default App;

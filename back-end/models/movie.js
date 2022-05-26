const mongoose = require('mongoose')

const movieSchema =  new mongoose.Schema({
  name: String,
  release: String,
  image: String,
  genre: String, 
})


const Movies = mongoose.model('Movie', movieSchema)
//Connection name Movie will show up as movies

module.exports = Movies

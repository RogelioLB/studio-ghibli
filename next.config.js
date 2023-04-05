const { withPlaiceholder } = require("@plaiceholder/next");
module.exports = withPlaiceholder({
  reactStrictMode: true,
  images:{
    domains:["image.tmdb.org","www.themoviedb.org"]
  }
})

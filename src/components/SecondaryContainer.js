import React from 'react'
import MovieLists from './MovieLists'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((state)=> state?.movies)
  return (
    <div className=''>
      <MovieLists title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
      <MovieLists title={"Popular"} movies={movies?.popularMovies}/>
      <MovieLists title={"Top Rated"} movies={movies?.topRatedMovies}/>
      <MovieLists title={"Upcoming"} movies={movies?.upcomingMovies}/>
      {/* <MovieLists title={"Horror"} movies={movies}/> */}
    </div>

  )
}

export default SecondaryContainer
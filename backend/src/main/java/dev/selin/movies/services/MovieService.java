package dev.selin.movies.services;

import dev.selin.movies.dto.Movie;
import dev.selin.movies.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allMovies(){
        return movieRepository.findAll();
    }

    public Movie getMovieByImdbId(String id){
        return movieRepository.findByImdbId(id);
    }
}

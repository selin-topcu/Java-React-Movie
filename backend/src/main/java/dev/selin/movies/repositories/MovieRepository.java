package dev.selin.movies.repositories;

import dev.selin.movies.dto.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {

    Movie findByImdbId(String id);

}

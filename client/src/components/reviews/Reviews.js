import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { Fragment } from 'react';

const Reviews = ({ getMovieData, movie }) => {
    const [reviews, setReviews] = useState([]);
    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
        fetchReviews(); // sayfa yüklendiğinde incelemeleri getiren bir fonksiyon çağrıyoruz
    }, []);

    const fetchReviews = async () => {
        try {
            const storedReviews = JSON.parse(localStorage.getItem(`reviews_${movieId}`));
            if (storedReviews) {
                setReviews(storedReviews);
            } else {
                const response = await api.get(`/api/v1/reviews/${movieId}`);
                setReviews(response.data);
                localStorage.setItem(`reviews_${movieId}`, JSON.stringify(response.data)); // verileri depolama
            }
        } catch (err) {
            console.error(err);
        }
    }

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
            const newReview = { body: rev.value };
            rev.value = "";
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);
            localStorage.setItem(`reviews_${movieId}`, JSON.stringify(updatedReviews)); // Yeni incelemeleri depolama
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        reviews.map((r, index) => (
                            <Fragment key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </Fragment>
                        ))
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;

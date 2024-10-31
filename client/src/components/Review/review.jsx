import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import { API_BASE_URL } from "../config";

const Review = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch books details and reviews
    useEffect(() =>
    {
        const fetchBook = async () =>
        {
            try
            {
                const response = await axios.get(`${API_BASE_URL}/api/books/${bookId}`);
                setBook(response.data);
            }
            catch (error)
            {console.error("Error feting books:", error);
            }
        };
        fetchBook().then(r => {});
    }, [bookId]);

    const handleReviewSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            const userId = user ? user._id : null;

            if (!token || !userId) {
                setMessage("Please log in...");
                return;
            }
            const response = await axios.post(
                `${API_BASE_URL}/api/reviews/${bookId}`,
                {
                    userId,
                    rating,
                    comment: review,
                },
                {
                        headers: {
                        Authorization: `Bearer ${token}`, //validate usr authorization
                    },
                }
            );

            setMessage("Review submitted successfully!.");
            setReview("");
            setRating(0);
        }
        catch (error)
        {
            if (error.response && error.response.data)
            {
                setMessage(error.response.data.message);
            }
            else
            {
                setMessage("Error...");
            }
        }
    };

    return (
        <>
            <Header />
            <div className={styles.review_container}>
                {book ? (
                    <>
                        <h1>{book.title}</h1>
                        <h3>By: {book.author}</h3>
                        <p>{book.description}</p>
                        <p>Published Date: {book.publishedDate}</p>
                        <p>Genre: {book.genre}</p>

                        <h2>Leave a Review</h2>
                        <form onSubmit={handleReviewSubmit}>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Write your review here...."
                                className={styles.review_input}
                                required
                            />
                            <div>
                                <label htmlFor="rating">Rating: </label>
                                <select
                                    id="rating"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className={styles.rating_select}
                                    required
                                >
                                    <option value="">Select Rating</option>
                                    <option value={1}>1 Star</option>
                                    <option value={2}>2 Stars</option>
                                    <option value={3}>3 Stars</option>
                                    <option value={4}>4 Stars</option>
                                    <option value={5}>5 Stars</option>
                                </select>
                            </div>
                            <button type="submit" className={styles.submit_btn}>
                                Submit Review
                            </button>
                        </form>
                        {message && <p className={styles.message}>{message}</p>}
                        {error && <p className={styles.error}>{error}</p>}

                        <h2>Reviews:</h2>
                        {book.reviews && book.reviews.length > 0 ? (
                            book.reviews.map((review) => (
                                <div key={review._id} className={styles.review}>
                                    {/*<p><strong>User:</strong> {review.userId}</p>*/}
                                    <p><strong>Rating:</strong> {review.rating}</p>
                                    <p>{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </>
                ) : (
                    <p>Loading book details....</p>
                )}
            </div>
        </>
    );
};

export default Review;

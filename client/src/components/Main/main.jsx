import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import { API_BASE_URL } from "../config";
import { useNavigate } from 'react-router-dom';

const Main = () => {
	const [books, setBooks] = useState([]);
	const navigate = useNavigate();
	// Fetch books
	useEffect(() => {
		const fetchBooks = async () =>
		{
			try
			{
				const res = await axios.get(`${API_BASE_URL}/api/books`);
				setBooks(res.data);
			}
			catch (error)
			{
				console.error("Error fetching books:", error);
			}
		};
		fetchBooks().then(r => {});
	}, []);

	// Return to the review page
	const handleReviewClick = (bookId) => {
		navigate(`/review/${bookId}`);
	};

	return (
		<>
			<Header />
			<div className={styles.main_container}>
				<h2>Books</h2>
				<div className={styles.book_grid}>
					{books.map((book) => (
						<div key={book._id} className={styles.book_card}>
							<h3>{book.title}</h3>
							<p>{book.author}</p>
							<p>{book.description}</p>
							<p>Published: {book.publishedDate}</p>
							<p>Genre: {book.genre}</p>
							<div className={styles.rating}>
								<span>Rating: {book.rating}</span>
								<button
									className={styles.review_btn}
									onClick={() => handleReviewClick(book._id)}
								>
									Review
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Main;

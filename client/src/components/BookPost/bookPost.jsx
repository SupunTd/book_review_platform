import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import { API_BASE_URL } from "../config";

const Favorites = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        publishedDate: '',
        genre: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_BASE_URL}/api/books`, book, {
                headers: {Authorization: `Bearer ${token}`}
            });

            setSuccessMessage('Book was added successfully!');
            setBook({ title: '', author: '', description: '', publishedDate: '', genre: '' });
            setError('');
        }
        catch (error)
        {
            if (error.response && error.response.data)
            {setError(error.response.data.message);
            }
            else
            {setError('Error...');
            }
        }
    };

    return (
        <>
            <Header />
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Published Date:</label>
                    <input
                        type="date"
                        name="publishedDate"
                        value={book.publishedDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={book.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Post Book</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
            {successMessage && <div className={styles.success}>{successMessage}</div>}
        </>
    );
};


export default Favorites;

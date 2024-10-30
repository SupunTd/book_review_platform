const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Add a new book for admin only
router.post("/", async (req, res) => {
    const { title, author, description, publishedDate, genre } = req.body;

    try {
        const book = new Book({ title, author, description, publishedDate, genre });
        await book.save();

        res.status(201).json({ message: "A new Book added successfully.", book });
    }
    catch (error)
    {res.status(500).json({ message: "Error adding book..", error });
    }
});

// Get all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch (error)
    {
        res.status(500).json({ message: "Error fetching books", error });
    }
});

// Get details of a single book
router.get("/:bookId", async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findById(bookId).populate("reviews");
        
        if (book)
        {res.status(200).json(book);
        }
        else
        {res.status(404).json({ message: "Book not found." });
        }
    }
    catch (error)
    {res.status(500).json({ message: "Error fetching books", error });
    }
});

module.exports = router;

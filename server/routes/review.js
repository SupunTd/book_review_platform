const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Book = require("../models/Book");

// Add a review to a book
router.post("/:bookId", async (req, res) => {
    const { bookId } = req.params;
    const { userId, rating, comment } = req.body;

    // Checking component
    if (!userId || !rating || !comment) {
        return res.status(400).json({ message: "Missing component" });
    }

    try
    {   const review = new Review({ bookId, userId, rating, comment });
        await review.save();
        await Book.findByIdAndUpdate(
            bookId,
            { $push: { reviews: review._id } },
            { new: true }
        );

        res.status(201).json({ message: "Review added successfully...", review });
    }
    catch (error)
    {
        console.error("Error by adding review:", error);
        res.status(500).json({ message: "Error by adding review..", error: error.message });
    }
});

// Get all reviews for a book
router.get("/:bookId", async (req, res) => {
    const { bookId } = req.params;

    try
    {
        const reviews = await Review.find({ bookId }).populate("userId", "username");
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        }
        else
        {
            res.status(404).json({ message: "No reviews found for this book." });
        }
    }
    catch (error)
    {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
});

module.exports = router;

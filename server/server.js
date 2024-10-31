require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middlewares
app.use(express.json());
app.use(cors()); // allowing this server to access different domains
app.disable('x-powered-by'); //hide express framework

app.use(express.static("uploads"));

const connectionParams = {};


try {mongoose.connect("mongodb+srv://admin:admin@cluster0.e3nk3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        , connectionParams);
        console.log("Connected to the database successfully");
}
catch (error)
{   console.log(error);
    console.log("Could not connect to the database!");
}

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const reviewRoutes = require("./routes/review");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);



const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

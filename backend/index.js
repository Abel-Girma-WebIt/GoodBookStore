const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { myBookModel } = require('./bookModel');
const { logModel } = require('./loginmodel');

const app = express();

// Middleware
app.use(cors({
    origin: 'https://good-book-store-fe.vercel.app', // Allow requests from frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

// Routes

// Test route
app.get('/', (req, res) => {
    res.status(200).send({ message: "Backend running!" });
});

// User registration route
app.post('/user/register', async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;
        
        // Validate request body
        if (!firstname || !lastname || !email || !username || !password) {
            return res.status(400).json({ message: "Please fill all required fields!" });
        }

        // Check if username already exists
        const existingUser = await logModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please use a different username or login!" });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create new user
        await logModel.create({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword
        });

        return res.status(200).json({ message: "New user account created successfully!" });
    } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: "Server side error. Error Type: " + err.message });
    }
});

// User login route
app.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate request body
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        // Check if user exists
        const user = await logModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        // Verify password
        const passwordMatch = await bcryptjs.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password. Please try again!" });
        }

        // Create and set tokens
        const accessToken = jwt.sign({ username: user.username }, process.env.accessSecKey, { expiresIn: "20m" });
        const refreshToken = jwt.sign({ username: user.username }, process.env.refreshSecKey, { expiresIn: "40m" });

        res.cookie('access_token', accessToken, { maxAge: 1200000, httpOnly: true });
        res.cookie('refresh_token', refreshToken, { maxAge: 2400000, httpOnly: true });

        return res.status(200).json({ message: "Successfully logged In!" });
    } catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ message: "Server side error. Error Type: " + err.message });
    }
});

// Verify user middleware
const verifyUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;

        if (!accessToken) {
            return res.status(401).json({ valid: false, message: "Access token is missing!" });
        }

        jwt.verify(accessToken, process.env.accessSecKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ valid: false, message: "Invalid access token!" });
            } else {
                req.username = decoded.username;
                next();
            }
        });
    } catch (err) {
        console.error("Error verifying user:", err);
        return res.status(500).json({ message: "Server side error. Error Type: " + err.message });
    }
};

// Get all books route
app.get('/books/all-books', verifyUser, async (req, res) => {
    try {
        const allBooks = await myBookModel.find({});
        res.status(200).json({ valid: true, data: allBooks });
    } catch (err) {
        console.error("Error fetching all books:", err);
        res.status(500).json({ message: `We could not get the books ${err}` });
    }
});

// Add book route
app.post('/books/addbooks', verifyUser, async (req, res) => {
    try {
        const { title, author, year, image, desc } = req.body;

        // Validate request body
        if (!title || !author || !year || !image || !desc) {
            return res.status(400).json({ message: "Please fill all required fields and submit the book" });
        }

        // Create new book
        const newBook = await myBookModel.create({
            title,
            author,
            year,
            image,
            desc
        });

        res.status(200).json({ valid: true, message: "Book has been added to the database" });
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).json({ message: "We could not add the book!" });
    }
});

// Other routes: book find by ID, edit book, delete book

// Export app
// module.exports = app;

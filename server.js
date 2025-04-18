const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key-here'; // In production, use environment variable

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/donate')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    bloodGroup: String,
    age: Number,
    location: String,
    status: { type: String, default: 'active' },
    timestamp: { type: Date, default: Date.now },
    refreshTokens: [String] // Store refresh tokens in MongoDB
});

// Session Schema
const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: String,
    expiresAt: Date,
    createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

const User = mongoose.model('User', userSchema);

// Helper functions
const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Auth Middleware
const authenticateToken = async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Routes
app.post('/api/users/register', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email already registered' 
            }); 
        }

        // Create new user
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        // Generate tokens
        const accessToken = generateAccessToken(savedUser);
        const refreshToken = generateRefreshToken(savedUser);

        // Store refresh token in DB
        await User.findByIdAndUpdate(savedUser._id, {
            $push: { refreshTokens: refreshToken }
        });

        // Set cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            user: {
                name: savedUser.name,
                email: savedUser.email,
                bloodGroup: savedUser.bloodGroup
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Registration failed' 
        });
    }
});

// Start server
// Add test route to get all users
// Proper users endpoint
// Test endpoint to verify DB connection
app.get('/api/test-db', async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({
            dbConnected: true,
            userCount: count,
            sampleQuery: await User.findOne({}, '-password -refreshTokens')
        });
    } catch (err) {
        res.status(500).json({ dbConnected: false, error: err.message });
    }
});

app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find({}, '-password -refreshTokens');
        console.log('Users fetched:', users.length); // Debug log
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: err.message });
    }
});

// Login Route
app.post('/api/users/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare passwords (in a real app, use bcrypt for hashed passwords)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in DB
        await User.findByIdAndUpdate(user._id, {
            $push: { refreshTokens: refreshToken }
        });

        // Set cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                bloodGroup: user.bloodGroup
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Users endpoint: http://localhost:${PORT}/api/users`);
    console.log(`Login endpoint: http://localhost:${PORT}/api/users/login`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use - server may already be running`);
    } else {
        console.error('Server error:', err);
    }
});

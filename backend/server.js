const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

const path = require('path');

// Middleware
const corsOptions = {
    origin: [
        'https://ngo-management-system-wheat.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/ngo', require('./routes/ngoRoutes'));
app.use('/api/causes', require('./routes/causeRoutes'));

// Basic route
app.get('/', (req, res) => {
    res.send('NGO Management System API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

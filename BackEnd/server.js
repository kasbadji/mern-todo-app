// BackEnd/server.js (partie pertinente)
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// task routes (si vous avez)
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// user/auth routes — IMPORTANT: monte sur '/api'
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

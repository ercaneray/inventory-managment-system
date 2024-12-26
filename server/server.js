const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workerRoutes = require('./routes/workers');
const vehicleRoutes = require('./routes/vehicles');
const warehouseRoutes = require('./routes/warehouses');
const userRoutes = require('./routes/user');
const logChangeRoutes = require('./routes/logChange');
const transactionRoutes = require('./routes/transaction');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Routes
app.use('/api/workers', workerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/logChange', logChangeRoutes);
app.use('/api/transaction', transactionRoutes);

// Export Express App (Serverless Functions için gerekli)
module.exports = app;

// Veritabanına Bağlanma (Vercel'de işlevsel olması için ayrı bir dosya olarak tutulabilir)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const expressPinoLogger = require('express-pino-logger');
const loggerService = require('./services/logger.service')
const mainRoute = require('./routes/main.routes')
const PORT = 8080;

const app = express();

// Allow CORS from all domains
app.use(cors({
    origin: '*'
}));


// Pino logger
const loggerMiddleware = expressPinoLogger({
    logger: loggerService,
    autoLogging: true,
});

app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());

// Define Routes Below
app.use('/api/main', mainRoute)

connectDB();
app.listen(PORT, () => console.log(`Server is running 🔥 on http://localhost:${PORT}`));
const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/product.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // URL вашего клиентского приложения
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// Routes
app.use('/api', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

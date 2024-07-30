import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/authRoute.js';
import productRoutes from './routes\/pruductRoute.js'
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoute.js';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.error(err);
  });

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', router);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to server'
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 4000');
});

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './route/userRoutes.js';
import imageRouter from './route/imageRoutes.js';

const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'image-gen-pi-one.vercel.app'
  ],
  credentials: true
}));

// 👇 ADD THIS
app.use((req, res, next) => {
  console.log(` ${req.method} ${req.url}`);
  next();
});

// DB connection
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API Working"));

// 👇 MODIFY THIS
app.listen(PORT, () => {
  console.log(`🚀 Server running on${PORT}`);
});
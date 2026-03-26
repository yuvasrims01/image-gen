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

// ✅ FIXED CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://image-gen-pi-one.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / mobile apps

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Debug logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// DB connection
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API Working"));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import productRoutes from './routes/ProductRoutes.js';
import categoryRoutes from './routes/CategoryRoutes.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000
connectDB();

app.use(cors({origin:true, credentials:true}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}))


app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
} )
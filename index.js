
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/users.js';
import messageRouter from './routes/messsages.js'
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/messages', messageRouter);

const { HOST, CONNECTION_URL, PORT } = process.env;

mongoose
    .connect(CONNECTION_URL)
    .then(() => {
        console.log('DB connected');
        console.log(PORT);
    })
    .catch((err) => {
        console.error('connection failed =>', err);
    });

app.listen(PORT, () => {
    console.log('server is running');
});
















const express = require('express');
const app = express();
const mongooose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());
mongooose.connect(process.env.MONGO_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => {
        console.log('Connected to MongoDB');
    });
server = app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});


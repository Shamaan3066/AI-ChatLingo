const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const chatRoute = require('./routes/chatRoute');

dotenv.config();

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;
const allowed_origin = process.env.ALLOWED_ORIGIN;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: [allowed_origin],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

mongoose.connect(mongo_url);
const connection = mongoose.connection;
connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is listening at port ${port}`);
    })
    console.log(`MONGO DB Connected`);
});

app.get('/', (req, res) => {
    res.send(`Welcome to AI-ChatLingo`);
})

//routes
app.use('/auth', authRoute);
app.use('/ai-chat', chatRoute);
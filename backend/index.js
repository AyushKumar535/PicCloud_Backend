const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

app.use(cors({
    credentials: true,
    origin: 'https://pic-cloud-frontend.vercel.app/'
}));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
require('./db')


const authroutes = require('./routes/authroutes');
const uploadroutes = require('./routes/uploadroutes');
app.use('/auth', authroutes)
app.use('/upload', uploadroutes)
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})

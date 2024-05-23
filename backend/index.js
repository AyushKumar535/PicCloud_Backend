import express from 'express'
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Api is running')
})


app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})

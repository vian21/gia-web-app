const express = require('express')
const app = express()

const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')                       //used to get data from client

const PORT = process.env.PORT || 5000;

const notFound = "<center><h1>404</h1><h4>Page not found!</h4></center>"


app.use(cors())                                               //allow API to be accesed
app.use(compression())                                        // compress all responses

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())                                    //parse json from client

// API routes
app.use(require('./api'));

// 404 page
app.use((req, res) => {
    res.status(404).send(notFound)
})

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT)
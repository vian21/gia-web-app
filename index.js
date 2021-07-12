const express = require('express')
const app = express()

require('dotenv').config();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],

    }
});


const { chats } = require('./api/chats');

const path = require('path');
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')                       //used to get data from client
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

const api = require('./api');
const authenticated = require('./helpers/authenticated');

const PORT = process.env.PORT || 5000;

const notFound = "<center><h1>404</h1><h4>Page not found!</h4></center>"


app.use(cors())                                               //allow API to be accesed
app.use(compression())                                        // compress all responses
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())                                    //parse json from client

/*
 * API routes
 */
app.use('/api', api);

//public folder
app.use(express.static(path.resolve(__dirname, 'public')));

// 404 page
app.use((req, res) => {
    res.status(404).send(notFound)
})

//socket.io 

//Authentication
io.use((socket, next) => {
    if (socket.handshake.auth.token) {
        const token = socket.handshake.auth.token;

        //verify token
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {

                next(new Error('Please login!'))

            } else {
                next();
            }
        })
    } else {
        next(new Error('Please login!'))
    }
})

//connection
io.on('connection', (socket) => {

    console.log('a user connected');

    //listen to when client requests for all recent conversations
    socket.on('conversations', (args) => {
        chats(socket);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected!")
    })
});



// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

server.listen(PORT)
const express = require('express');
const app = express();

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
const status = require('./api/status');
const feed = require('./api/feed');

const { listener, MySQLEvents } = require('./helpers/db');


const path = require('path');
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')                       //used to get data from client
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

const api = require('./api');

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

//Mysql events listening for new posts
listener.start();

listener.addTrigger({
    name: 'Feed',
    expression: 'app.posts.id',         //monitor id only - only inserts and deletes will be detected
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: (event) => {
        console.log(event)
        io.emit('newFeed')
    },
});

listener.addTrigger({
    name: 'Status',
    expression: 'app.status.id',         //monitor id only - only inserts and deletes will be detected
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: (event) => {
        console.log(event)
        io.emit('newStatus')
    },
});

//socket.io 

//Authentication
io.use(async (socket, next) => {
    if (socket.handshake.auth.token) {
        const token = socket.handshake.auth.token;

        //verify token
        await jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {



                next(new Error('Please login!'))

            } else {
                //store user's id in socket instance
                socket.userId = decoded.id;

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

    //chats handler/listener
    chats(socket, io);
    feed(socket, io);
    status(socket, io)

    socket.on("disconnect", async () => {
        console.log("User disconnected!");
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
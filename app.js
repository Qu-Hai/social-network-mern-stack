const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
const statusRouter = require('./routers/statusRouter');
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const SocketManager = require('./SocketManager');

io.of('/chat').on('connection', SocketManager);
app.use('/img', express.static('uploads'));
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(cookieParser());
app.options('*', cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/', statusRouter);
dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`App running on ${port}`);
});

const io = require('./app.js').io;
let users = [];
module.exports = (socket) => {
  socket.on('new', (username) => {
    users[username] = socket.id;
    console.log(users);
  });
  socket.on('send_message', function (data) {
    console.log(data);
    let socketId = users[data.to];
    socket.broadcast.to(socketId).emit(data.from, data);
  });
};

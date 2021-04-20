const io = require('socket.io')(8086);
const users = {};

io.on('connection', socket => {
  // If any new user joins, let other users connected to the server know!
  socket.on('new-user-joined', name => {
      console.log("hi");
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  // If someone sends a message, broadcast it to other people
  socket.on('send', message => {
      console.log("send");

    socket.broadcast.emit("receive", {message: message,name: users[socket.id]});

    // socket.broadcast.emit("someone send a message", name);
  });

  // If someone leaves the chat, let others know
  socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});

// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(req.url);
//     res.end();
// }).listen(8086);

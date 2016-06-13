
// module.exports = function(server) {
//   var io = require('socket.io');

//   io.set('origins', 'localhost:*');
//   io.set('logger', log);

//   io.sockets.on('connection', function(socket) {

//     socket.on('message', function(text, cb) {
//       socket.broadcast.emit('message', text);
//       cb && cb();
//     });

//   });
// }
exports = module.exports = function (io) {
    var $ipsConnected = [];
    var socketObj = new Map();
    var count = 0;
    io.on('connection', function (socket) {
        var $userId = 0;
        var $ipAddress = socket.handshake.address;
        socket.on('user come', function (user) {
            console.log('usseer', user);
            // TODO: Does the server need to know the user?
            socket.emit('receive socket', socket.id);
            var newSocket = { socketId: socket.id, dataId: user.id };
            socketObj.set(user.id, newSocket);
            $userId = user.id;
            console.log($userId);
        });
        socket.on('get users', function (ids) {
            var statusId = [];
            ids.forEach(function (item, i, arr) {
                console.log('item', item);
                if (socketObj.has(item)) {
                    statusId.push(item);
                }
            });
            io.emit('server users', JSON.stringify(statusId));
        });
        socket.join('Lobby');
        socket.on('chat mounted', function (user) {
            // TODO: Does the server need to know the user?
            socket.emit('receive socket', socket.id);
        });
        socket.on('leave channel', function (channel) {
            socket.leave(channel);
        });
        socket.on('join channel', function (channel) {
            socket.join(channel.name);
        });
        socket.on('new message', function (msg) {
            socket.broadcast.to(msg.channelID).emit('new bc message', msg);
        });
        socket.on('new channel', function (channel) {
            socket.broadcast.emit('new channel', channel);
        });
        socket.on('typing', function (data) {
            socket.broadcast.to(data.channel).emit('typing bc', data.user);
        });
        socket.on('stop typing', function (data) {
            socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
        });
        socket.on('new private channel', function (socketID, channel) {
            socket.broadcast.to(socketID).emit('receive private channel', channel);
        });
        socket.on('leave user', function (dataID) {
            socketObj.delete(dataID);
        });
        socket.on('disconnect', function () {
            console.log('disct', $userId);
            if ($userId && socketObj.get($userId)) {
                var dataObj = socketObj.get($userId);
                socketObj.delete(dataObj.socketId);
                socket.broadcast.emit('delete socket', $userId);
            }
            if ($ipsConnected.hasOwnProperty($ipAddress)) {
                delete $ipsConnected[$ipAddress];
                count--;
                socket.emit('counter', { count: count });
            }
        });
    });
};

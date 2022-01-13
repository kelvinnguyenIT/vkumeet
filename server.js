const express = require("express");
const app = express();
const server = require("https").Server(app);
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

server.listen(PORT, function () {
    console.log("Listening port");
});

let roomList = [
    {
        abc: [
            {
                user1: [
                    {
                        peerId: "23",
                        username: "Nam",
                    },
                ],
            },
        ],
    },
];

io.on("connection", (socket) => {
    socket.on("CHECK_ROOM", (roomId, peerId, userInfo) => {
        socket.peerId = peerId;
        socket.roomId = roomId;
        if (roomList[0][[roomId]] == null) {
            roomList[0][[roomId]] = [];
            var user = {
                [peerId]: [
                    {
                        peerId: peerId,
                        avatar: userInfo.avatar,
                        email: userInfo.email,
                        name: userInfo.name,
                    },
                ],
            };
            roomList[0][[roomId]].push(user);

            socket.emit("USER_LIST", roomList[0][[roomId]]);
            socket.broadcast.emit("NEW_USER_JOIN", user[peerId]);
        } else {
            var user = {
                [peerId]: [
                    {
                        peerId: peerId,
                        avatar: userInfo.avatar,
                        email: userInfo.email,
                        name: userInfo.name,
                    },
                ],
            };
            roomList[0][[roomId]].push(user);

            socket.emit("USER_LIST", roomList[0][[roomId]]);

            console.log(socket.broadcast.emit("NEW_USER_JOIN", user[peerId]));
        }

        socket.on("OPEN_MIC", (peerId) => {
            socket.broadcast.emit("ON_OPEN_MIC", peerId);
        });

        socket.on("MUTE_MIC", (peerId) => {
            socket.broadcast.emit("ON_MUTE_MIC", peerId);
        });

        socket.on("HIDE_VIDEO", (peerId) => {
            socket.broadcast.emit("ON_HIDE_VIDEO", peerId);
        });

        socket.on("SHOW_VIDEO", (peerId) => {
            socket.broadcast.emit("ON_SHOW_VIDEO", peerId);
        });

        socket.on("SHARE_SCREEN", (screenTrack, peerId) => {
            console.log(screenTrack);
        });

        socket.on("SEND_MESSAGE", (message, peerName) => {
            socket.broadcast.emit("ON_SEND_MESSAGE", message, peerName);
        });

        socket.on("USER_RASE_HAND", (user) => {
            socket.broadcast.emit("ON_USER_RASE_HAND", user);
        });

        socket.on("USER_UN_RASE_HAND", (user) => {
            socket.broadcast.emit("ON_USER_UN_RASE_HAND", user);
        });

        socket.on("disconnect", () => {
            for (var i = 0; i < roomList[0][[roomId]].length; i++) {
                var keys = Object.keys(roomList[0][[roomId]][i]);
                if (
                    roomList[0][[roomId]][i][keys][0].peerId === socket.peerId
                ) {
                    roomList[0][[roomId]].splice(i, 1);
                }
            }

            io.emit("ON_DISCONNECT", socket.peerId);
        });
    });
});
// socket.on("disconnect", () => {
//     const index = roomList[0][[socket.roomId]].findIndex(
//         (user) => Object.keys(user) == socket.peerId
//     );
//     console.log(index);
// });
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

server.listen(8005, function () {
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
// var user3 = {
//     user3: [
//         {
//             peerId: "23",
//             username: "Nam",
//         },
//     ],
// };
// roomList["abc"].push(user3);
// console.log();
// var t = { xyz: [] };
// roomList.push(t);
// console.log(roomList[0]["abc"]);

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

        socket.on('OPEN_MIC',peerId=>{
            socket.broadcast.emit("ON_OPEN_MIC", peerId)
        })
        
        socket.on('MUTE_MIC',peerId=>{
            socket.broadcast.emit("ON_MUTE_MIC", peerId)
        })

        socket.on('HIDE_VIDEO',peerId=>{
            socket.broadcast.emit("ON_HIDE_VIDEO", peerId)
        })

        socket.on('SHOW_VIDEO',peerId=>{
            socket.broadcast.emit("ON_SHOW_VIDEO", peerId)
        })

        // socket.on('SHARE_SCREEN',(screenTrack,peerId)=>{
        //     console.log(screenTrack);
        // })

    });
});
// socket.on("disconnect", () => {
//     const index = roomList[0][[socket.roomId]].findIndex(
//         (user) => Object.keys(user) == socket.peerId
//     );
//     console.log(index);
// });
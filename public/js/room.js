var ip_address = "http://vkumeett.herokuapp.com";
var socket_port = "8005";
var socket = io(ip_address + ":" + socket_port);

function openStream() {
    const config = { audio: true, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(stream, locationId, peerId) {
    var video = document.createElement("VIDEO");
    var localStream = document.getElementById(locationId);
    video.srcObject = stream;
    video.width = 320;
    video.height = 240;
    video.id = peerId;
    video.play();
    localStream.appendChild(video);
}

function RTCConnection(roomId, user) {
    var previousUser = {};
    var trackList = [{}];
    var userListClient = [];
    var userRaseHand = [];
    var clickListUser = 0;
    var clickInfo = 0;
    var clickChatbox = 0;
    var clickMic = 0;
    var clickVideo = 0;
    var clickRaseHand = 0;
    var remoteOld = "";
    $("#raseHandRoom").css("display", "none");
    var peer = new Peer();
    peer.on("open", (id) => {
        socket.emit("CHECK_ROOM", roomId, id, user[0]);

        socket.on("USER_LIST", (userList) => {
            if (userList.length == 1) {
                userList.forEach((user) => {
                    var keys = Object.keys(user);

                    openStream().then((stream) => {
                        // console.log("User List 1: " + call.peer);
                        trackList[0][[id]] = [];
                        trackList[0][[id]].push(stream.getTracks());

                        socket.stream = stream;
                        playStream(stream, "localStream", id);
                    });

                    userListClient.push(user[keys][0]);
                    $("#userInRoom").append(
                        '<div class="userInRoomList" id="' +
                            user[keys][0].peerId +
                            '-list">' +
                            '<div class="userInfo" >' +
                            '<img src="' +
                            user[keys][0].avatar +
                            '" />' +
                            "<p>" +
                            user[keys][0].name +
                            "</p>" +
                            "</div>" +
                            '<div class="performUser">' +
                            '<button id="#">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                            '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                            '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                            '<g fill="#333333">' +
                            '<path d="M86,14.33333c-11.87517,0 -21.5,9.62483 -21.5,21.5v43c0,11.87517 9.62483,21.5 21.5,21.5c11.87517,0 21.5,-9.62483 21.5,-21.5v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM43.62988,78.83333c-4.343,0 -7.841,3.85365 -7.13867,8.14649c3.5108,21.49797 20.70692,38.35796 42.34212,41.46028v14.89323c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.89323c21.63521,-3.10233 38.83133,-19.96231 42.34212,-41.46028c0.70233,-4.29283 -2.79567,-8.14649 -7.13867,-8.14649c-3.54033,0 -6.45985,2.60553 -7.05469,6.10286c-2.9025,16.87751 -17.60659,29.73047 -35.31543,29.73047c-17.70883,0 -32.41293,-12.85297 -35.31543,-29.73047c-0.59483,-3.49733 -3.50719,-6.10286 -7.05469,-6.10286z">' +
                            "</path>" +
                            "</g></g></svg></button>" +
                            '<button id="#">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                            '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                            '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                            '<g fill="#333333">' +
                            '<path d="M112.51252,59.48916l3.20619,-27.48238c0.55207,-4.73123 -0.94376,-9.4729 -4.11078,-13.03089c-3.16702,-3.55799 -7.7034,-5.59322 -12.46673,-5.59315h-26.28173c-4.76333,-0.00008 -9.29972,2.03515 -12.46673,5.59315c-3.16702,3.55799 -4.66284,8.29967 -4.11078,13.03089l3.19141,27.36211c-2.80106,1.83436 -5.40567,3.95243 -7.77259,6.32066c-9.1275,9.06925 -14.21761,21.43247 -14.12147,34.29922v2.4557c0,1.85533 1.50404,3.35938 3.35938,3.35938h41.70194v49.45403c0,1.85533 1.50404,3.35938 3.35938,3.35938c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-49.45437h41.70194c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-2.4557c-0.00643,-16.33032 -8.24355,-31.55738 -21.90816,-40.49928zM65.4114,23.44306c1.89273,-2.1248 4.60251,-3.34054 7.44807,-3.34157h26.28173c2.84576,0.00001 5.55592,1.21593 7.44801,3.34157c1.89209,2.12564 2.78581,4.95843 2.4561,7.78502l-0.25095,2.15h-45.58672l-0.25095,-2.15c-0.32908,-2.82629 0.56399,-5.65865 2.4547,-7.78502zM63.99005,40.0975h44.02058l-1.85135,15.86969c-6.31701,-2.90564 -13.18892,-4.40706 -20.14214,-4.40078h-0.24423c-6.87896,-0.01221 -13.68019,1.45424 -19.94293,4.3zM44.30411,99.08477c0.38239,-22.72267 18.97028,-40.911 41.69589,-40.79961c22.66917,0.02567 41.17598,18.13597 41.69253,40.79927h-83.38909z"></path>' +
                            "</g></g></svg></button></div></div>"
                    );
                });
            } else {
                if (userList.length > 1) {
                    openStream().then((stream) => {
                        socket.stream = stream;
                        trackList[0][[id]] = [];
                        trackList[0][[id]].push(stream.getTracks());
                        playStream(stream, "localStream", id);
                    });
                    userList.forEach((user) => {
                        var keys = Object.keys(user);

                        openStream().then((stream) => {
                            const call = peer.call(
                                user[keys][0].peerId,
                                stream
                            );
                            call.on("stream", (remoteStream) => {
                                if (call.peer != remoteOld) {
                                    remoteOld = call.peer;
                                    trackList[0][[call.peer]] = [];
                                    trackList[0][[call.peer]].push(
                                        remoteStream.getTracks()
                                    );

                                    playStream(
                                        remoteStream,
                                        "remoteStream",
                                        user[keys][0].peerId
                                    );
                                }
                            });
                        });

                        userListClient.push(user[keys][0]);
                        $("#userInRoom").append(
                            '<div class="userInRoomList" id="' +
                                user[keys][0].peerId +
                                '-list">' +
                                '<div class="userInfo">' +
                                '<img src="' +
                                user[keys][0].avatar +
                                '" />' +
                                "<p>" +
                                user[keys][0].name +
                                "</p>" +
                                "</div>" +
                                '<div class="performUser">' +
                                '<button id="#">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                                '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                                '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                                '<g fill="#333333">' +
                                '<path d="M86,14.33333c-11.87517,0 -21.5,9.62483 -21.5,21.5v43c0,11.87517 9.62483,21.5 21.5,21.5c11.87517,0 21.5,-9.62483 21.5,-21.5v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM43.62988,78.83333c-4.343,0 -7.841,3.85365 -7.13867,8.14649c3.5108,21.49797 20.70692,38.35796 42.34212,41.46028v14.89323c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.89323c21.63521,-3.10233 38.83133,-19.96231 42.34212,-41.46028c0.70233,-4.29283 -2.79567,-8.14649 -7.13867,-8.14649c-3.54033,0 -6.45985,2.60553 -7.05469,6.10286c-2.9025,16.87751 -17.60659,29.73047 -35.31543,29.73047c-17.70883,0 -32.41293,-12.85297 -35.31543,-29.73047c-0.59483,-3.49733 -3.50719,-6.10286 -7.05469,-6.10286z">' +
                                "</path>" +
                                "</g></g></svg></button>" +
                                '<button id="#">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                                '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                                '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                                '<g fill="#333333">' +
                                '<path d="M112.51252,59.48916l3.20619,-27.48238c0.55207,-4.73123 -0.94376,-9.4729 -4.11078,-13.03089c-3.16702,-3.55799 -7.7034,-5.59322 -12.46673,-5.59315h-26.28173c-4.76333,-0.00008 -9.29972,2.03515 -12.46673,5.59315c-3.16702,3.55799 -4.66284,8.29967 -4.11078,13.03089l3.19141,27.36211c-2.80106,1.83436 -5.40567,3.95243 -7.77259,6.32066c-9.1275,9.06925 -14.21761,21.43247 -14.12147,34.29922v2.4557c0,1.85533 1.50404,3.35938 3.35938,3.35938h41.70194v49.45403c0,1.85533 1.50404,3.35938 3.35938,3.35938c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-49.45437h41.70194c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-2.4557c-0.00643,-16.33032 -8.24355,-31.55738 -21.90816,-40.49928zM65.4114,23.44306c1.89273,-2.1248 4.60251,-3.34054 7.44807,-3.34157h26.28173c2.84576,0.00001 5.55592,1.21593 7.44801,3.34157c1.89209,2.12564 2.78581,4.95843 2.4561,7.78502l-0.25095,2.15h-45.58672l-0.25095,-2.15c-0.32908,-2.82629 0.56399,-5.65865 2.4547,-7.78502zM63.99005,40.0975h44.02058l-1.85135,15.86969c-6.31701,-2.90564 -13.18892,-4.40706 -20.14214,-4.40078h-0.24423c-6.87896,-0.01221 -13.68019,1.45424 -19.94293,4.3zM44.30411,99.08477c0.38239,-22.72267 18.97028,-40.911 41.69589,-40.79961c22.66917,0.02567 41.17598,18.13597 41.69253,40.79927h-83.38909z"></path>' +
                                "</g></g></svg></button></div></div>"
                        );
                    });
                }
            }

            socket.on("NEW_USER_JOIN", (newUser) => {
                if (typeof previousUser[0] == "undefined") {
                    previousUser = newUser;
                    userListClient.push(previousUser[0]);
                    $("#userInRoom").append(
                        '<div class="userInRoomList" id="' +
                            previousUser[0].peerId +
                            '-list">' +
                            '<div class="userInfo">' +
                            '<img src="' +
                            previousUser[0].avatar +
                            '" />' +
                            "<p>" +
                            previousUser[0].name +
                            "</p>" +
                            "</div>" +
                            '<div class="performUser">' +
                            '<button id="#">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                            '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                            '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                            '<g fill="#333333">' +
                            '<path d="M86,14.33333c-11.87517,0 -21.5,9.62483 -21.5,21.5v43c0,11.87517 9.62483,21.5 21.5,21.5c11.87517,0 21.5,-9.62483 21.5,-21.5v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM43.62988,78.83333c-4.343,0 -7.841,3.85365 -7.13867,8.14649c3.5108,21.49797 20.70692,38.35796 42.34212,41.46028v14.89323c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.89323c21.63521,-3.10233 38.83133,-19.96231 42.34212,-41.46028c0.70233,-4.29283 -2.79567,-8.14649 -7.13867,-8.14649c-3.54033,0 -6.45985,2.60553 -7.05469,6.10286c-2.9025,16.87751 -17.60659,29.73047 -35.31543,29.73047c-17.70883,0 -32.41293,-12.85297 -35.31543,-29.73047c-0.59483,-3.49733 -3.50719,-6.10286 -7.05469,-6.10286z">' +
                            "</path>" +
                            "</g></g></svg></button>" +
                            '<button id="#">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                            '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                            '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                            '<g fill="#333333">' +
                            '<path d="M112.51252,59.48916l3.20619,-27.48238c0.55207,-4.73123 -0.94376,-9.4729 -4.11078,-13.03089c-3.16702,-3.55799 -7.7034,-5.59322 -12.46673,-5.59315h-26.28173c-4.76333,-0.00008 -9.29972,2.03515 -12.46673,5.59315c-3.16702,3.55799 -4.66284,8.29967 -4.11078,13.03089l3.19141,27.36211c-2.80106,1.83436 -5.40567,3.95243 -7.77259,6.32066c-9.1275,9.06925 -14.21761,21.43247 -14.12147,34.29922v2.4557c0,1.85533 1.50404,3.35938 3.35938,3.35938h41.70194v49.45403c0,1.85533 1.50404,3.35938 3.35938,3.35938c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-49.45437h41.70194c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-2.4557c-0.00643,-16.33032 -8.24355,-31.55738 -21.90816,-40.49928zM65.4114,23.44306c1.89273,-2.1248 4.60251,-3.34054 7.44807,-3.34157h26.28173c2.84576,0.00001 5.55592,1.21593 7.44801,3.34157c1.89209,2.12564 2.78581,4.95843 2.4561,7.78502l-0.25095,2.15h-45.58672l-0.25095,-2.15c-0.32908,-2.82629 0.56399,-5.65865 2.4547,-7.78502zM63.99005,40.0975h44.02058l-1.85135,15.86969c-6.31701,-2.90564 -13.18892,-4.40706 -20.14214,-4.40078h-0.24423c-6.87896,-0.01221 -13.68019,1.45424 -19.94293,4.3zM44.30411,99.08477c0.38239,-22.72267 18.97028,-40.911 41.69589,-40.79961c22.66917,0.02567 41.17598,18.13597 41.69253,40.79927h-83.38909z"></path>' +
                            "</g></g></svg></button></div></div>"
                    );
                } else {
                    if (newUser[0].peerId != previousUser[0].peerId) {
                        previousUser = newUser;
                        userListClient.push(previousUser[0]);
                        $("#userInRoom").append(
                            '<div class="userInRoomList" id="' +
                                previousUser[0].peerId +
                                '-list">' +
                                '<div class="userInfo">' +
                                '<img src="' +
                                previousUser[0].avatar +
                                '" />' +
                                "<p>" +
                                previousUser[0].name +
                                "</p>" +
                                "</div>" +
                                '<div class="performUser">' +
                                '<button id="#">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                                '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                                '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                                '<g fill="#333333">' +
                                '<path d="M86,14.33333c-11.87517,0 -21.5,9.62483 -21.5,21.5v43c0,11.87517 9.62483,21.5 21.5,21.5c11.87517,0 21.5,-9.62483 21.5,-21.5v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM43.62988,78.83333c-4.343,0 -7.841,3.85365 -7.13867,8.14649c3.5108,21.49797 20.70692,38.35796 42.34212,41.46028v14.89323c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.89323c21.63521,-3.10233 38.83133,-19.96231 42.34212,-41.46028c0.70233,-4.29283 -2.79567,-8.14649 -7.13867,-8.14649c-3.54033,0 -6.45985,2.60553 -7.05469,6.10286c-2.9025,16.87751 -17.60659,29.73047 -35.31543,29.73047c-17.70883,0 -32.41293,-12.85297 -35.31543,-29.73047c-0.59483,-3.49733 -3.50719,-6.10286 -7.05469,-6.10286z">' +
                                "</path>" +
                                "</g></g></svg></button>" +
                                '<button id="#">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                                '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                                '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                                '<g fill="#333333">' +
                                '<path d="M112.51252,59.48916l3.20619,-27.48238c0.55207,-4.73123 -0.94376,-9.4729 -4.11078,-13.03089c-3.16702,-3.55799 -7.7034,-5.59322 -12.46673,-5.59315h-26.28173c-4.76333,-0.00008 -9.29972,2.03515 -12.46673,5.59315c-3.16702,3.55799 -4.66284,8.29967 -4.11078,13.03089l3.19141,27.36211c-2.80106,1.83436 -5.40567,3.95243 -7.77259,6.32066c-9.1275,9.06925 -14.21761,21.43247 -14.12147,34.29922v2.4557c0,1.85533 1.50404,3.35938 3.35938,3.35938h41.70194v49.45403c0,1.85533 1.50404,3.35938 3.35938,3.35938c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-49.45437h41.70194c1.85533,0 3.35938,-1.50404 3.35938,-3.35937v-2.4557c-0.00643,-16.33032 -8.24355,-31.55738 -21.90816,-40.49928zM65.4114,23.44306c1.89273,-2.1248 4.60251,-3.34054 7.44807,-3.34157h26.28173c2.84576,0.00001 5.55592,1.21593 7.44801,3.34157c1.89209,2.12564 2.78581,4.95843 2.4561,7.78502l-0.25095,2.15h-45.58672l-0.25095,-2.15c-0.32908,-2.82629 0.56399,-5.65865 2.4547,-7.78502zM63.99005,40.0975h44.02058l-1.85135,15.86969c-6.31701,-2.90564 -13.18892,-4.40706 -20.14214,-4.40078h-0.24423c-6.87896,-0.01221 -13.68019,1.45424 -19.94293,4.3zM44.30411,99.08477c0.38239,-22.72267 18.97028,-40.911 41.69589,-40.79961c22.66917,0.02567 41.17598,18.13597 41.69253,40.79927h-83.38909z"></path>' +
                                "</g></g></svg></button></div></div>"
                        );
                    }
                }
            });
        });

        $("#btnListUser").on("click", function (e) {
            if (clickListUser == 0) {
                $(".infoRoom-disapear").css("display", "none");
                $(".chatboxRoom-disapear").css("display", "none");

                $("#btnChatboxRoom").css("background-color", "#3c4043");
                $("#btnInfoRoom").css("background-color", "#3c4043");
                $("#btnListUser").css("background-color", "#6200ee");
                $(".listUser-disapear").show();
                $(".listUser-disapear").removeClass("out").addClass("active");
            }
            if (clickListUser == 1) {
                if (
                    $(".infoRoom-disapear").css("display") != "none" ||
                    $(".chatboxRoom-disapear").css("display") != "none"
                ) {
                    $(".infoRoom-disapear").css("display", "none");
                    $(".chatboxRoom-disapear").css("display", "none");

                    $("#btnChatboxRoom").css("background-color", "#3c4043");
                    $("#btnInfoRoom").css("background-color", "#3c4043");
                    $("#btnListUser").css("background-color", "#6200ee");
                    $(".listUser-disapear").show();
                    $(".listUser-disapear")
                        .removeClass("out")
                        .addClass("active");
                } else {
                    $("#btnListUser").css("background-color", "#3c4043");
                    $(".listUser-disapear")
                        .removeClass("active")
                        .addClass("out");
                    $(".listUser-disapear").hide();
                }
            }
            clickListUser += 1;
            if (clickListUser > 1) {
                clickListUser = 0;
            }
        });

        $("#btnInfoRoom").on("click", function (e) {
            if (clickInfo == 0) {
                $(".listUser-disapear").css("display", "none");
                $(".chatboxRoom-disapear").css("display", "none");
                $("#btnListUser").css("background-color", "#3c4043");
                $("#btnChatboxRoom").css("background-color", "#3c4043");

                $("#btnInfoRoom").css("background-color", "#6200ee");

                $(".infoRoom-disapear").show();
                $(".infoRoom-disapear").removeClass("out").addClass("active");
            }
            if (clickInfo == 1) {
                if (
                    $(".listUser-disapear").css("display") != "none" ||
                    $(".chatboxRoom-disapear").css("display") != "none"
                ) {
                    $(".listUser-disapear").css("display", "none");
                    $(".chatboxRoom-disapear").css("display", "none");

                    $("#btnListUser").css("background-color", "#3c4043");
                    $("#btnChatboxRoom").css("background-color", "#3c4043");

                    $("#btnInfoRoom").css("background-color", "#6200ee");
                    $(".infoRoom-disapear").show();
                    $(".infoRoom-disapear")
                        .removeClass("out")
                        .addClass("active");
                } else {
                    $("#btnInfoRoom").css("background-color", "#3c4043");
                    $(".infoRoom-disapear")
                        .removeClass("active")
                        .addClass("out");
                    $(".infoRoom-disapear").hide();
                }
            }
            clickInfo += 1;
            if (clickInfo > 1) {
                clickInfo = 0;
            }
        });

        $("#btnChatboxRoom").on("click", function (e) {
            if (clickChatbox == 0) {
                $(".listUser-disapear").css("display", "none");
                $(".infoRoom-disapear").css("display", "none");

                $("#btnInfoRoom").css("background-color", "#3c4043");
                $("#btnListUser").css("background-color", "#3c4043");
                $("#btnChatboxRoom").css("background-color", "#6200ee");

                $(".chatboxRoom-disapear").show();
                $(".chatboxRoom-disapear")
                    .removeClass("out")
                    .addClass("active");
            }
            if (clickChatbox == 1) {
                if (
                    $(".listUser-disapear").css("display") != "none" ||
                    $(".infoRoom-disapear").css("display") != "none"
                ) {
                    $(".listUser-disapear").css("display", "none");
                    $(".infoRoom-disapear").css("display", "none");

                    $("#btnInfoRoom").css("background-color", "#3c4043");
                    $("#btnListUser").css("background-color", "#3c4043");
                    $("#btnChatboxRoom").css("background-color", "#6200ee");
                    $(".chatboxRoom-disapear").show();
                    $(".chatboxRoom-disapear")
                        .removeClass("out")
                        .addClass("active");
                } else {
                    $("#btnChatboxRoom").css("background-color", "#3c4043");
                    $(".chatboxRoom-disapear")
                        .removeClass("active")
                        .addClass("out");
                    $(".chatboxRoom-disapear").hide();
                }
            }
            clickChatbox += 1;
            if (clickChatbox > 1) {
                clickChatbox = 0;
            }
        });

        $("#btnAudio").on("click", function (e) {
            if (clickMic == 0) {
                var iconMicOpen =
                    '<svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g  fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,14.33333c-11.47786,0 -20.77213,9.40625 -21.5,20.15625l43,43v-41.65625c0,-12.17774 -9.32226,-21.5 -21.5,-21.5zM24.63542,14.55729l-10.07812,10.07813l49.94271,49.94271v11.42188c0,12.17774 9.32226,21.5 21.5,21.5c3.33138,0 6.41081,-0.89583 9.18229,-2.23958l10.30208,10.30208c-5.62695,3.80729 -12.23372,6.27083 -19.48437,6.27083c-20.07226,0 -35.83333,-15.76107 -35.83333,-35.83333h-14.33333c0,25.08333 18.64453,45.91146 43,49.49479v22.17188h14.33333v-22.17187c8.51042,-1.34375 16.125,-4.67513 22.61979,-9.40625l31.57813,31.35417l10.07813,-10.07812l-52.18229,-51.95833l-40.76042,-40.98437zM121.83333,86c0,2.1556 0.05599,3.49935 -0.67187,4.92708l12.09375,12.31771c2.1556,-5.01107 2.91146,-10.80599 2.91146,-17.24479z"></path></g></g></svg>';
                $("#btnAudio").empty();
                $("#btnAudio").append(iconMicOpen);
                $("#btnAudio").css("background-color", "#ea4335");

                socket.emit("MUTE_MIC", id);
                socket.stream.getAudioTracks()[0].enabled = false;

                socket.on("ON_MUTE_MIC", (peerResponse) => {
                    trackList[0][[peerResponse]][0][0].enabled = false;
                });
            }

            if (clickMic == 1) {
                var iconMicOpen =
                    '<svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g  fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,14.33333c-11.87517,0 -21.5,9.62483 -21.5,21.5v43c0,11.87517 9.62483,21.5 21.5,21.5c11.87517,0 21.5,-9.62483 21.5,-21.5v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM43.62988,78.83333c-4.343,0 -7.841,3.85365 -7.13867,8.14649c3.5108,21.49797 20.70692,38.35796 42.34212,41.46028v14.89323c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.89323c21.63521,-3.10233 38.83133,-19.96231 42.34212,-41.46028c0.70233,-4.29283 -2.79567,-8.14649 -7.13867,-8.14649c-3.54033,0 -6.45985,2.60553 -7.05469,6.10286c-2.9025,16.87751 -17.60659,29.73047 -35.31543,29.73047c-17.70883,0 -32.41293,-12.85297 -35.31543,-29.73047c-0.59483,-3.49733 -3.50719,-6.10286 -7.05469,-6.10286z"></path></g></g></svg>';
                $("#btnAudio").empty();
                $("#btnAudio").append(iconMicOpen);
                $("#btnAudio").css("background-color", "#3c4043");

                socket.emit("OPEN_MIC", id);
                socket.stream.getAudioTracks()[0].enabled = true;

                socket.on("ON_OPEN_MIC", (peerResponse) => {
                    trackList[0][[peerResponse]][0][0].enabled = true;
                });
            }

            clickMic += 1;
            if (clickMic > 1) {
                clickMic = 0;
            }
        });

        $("#btnVideo").on("click", function (e) {
            if (clickVideo == 0) {
                var iconVideoOpen =
                    '<svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g  fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M26.56706,16.43294l-10.13411,10.13411l9.26628,9.26628h-4.19922c-7.90483,0 -14.33333,6.4285 -14.33333,14.33333v71.66667c0,7.90483 6.4285,14.33333 14.33333,14.33333h93.16667c3.19641,0 6.12421,-1.08067 8.51042,-2.85547l22.25586,22.25586l10.13411,-10.13411zM66.38965,35.83333l14.33333,14.33333h33.94368v33.92969l26.69303,26.70703l23.47364,18.7705v-87.14779l-35.83333,28.66667v-20.92611c0,-7.90483 -6.4285,-14.33333 -14.33333,-14.33333zM21.5,50.16667h18.53255l71.66667,71.66667h-90.19922zM150.5,72.24056v27.51888l-17.18881,-13.75944z"></path></g></g></svg>';
                $("#btnVideo").empty();
                $("#btnVideo").append(iconVideoOpen);
                $("#btnVideo").css("background-color", "#ea4335");

                socket.emit("HIDE_VIDEO", id);
                socket.stream.getVideoTracks()[0].enabled = false;

                socket.on("ON_HIDE_VIDEO", (peerResponse) => {
                    trackList[0][[peerResponse]][0][1].enabled = false;
                });
            }

            if (clickVideo == 1) {
                var iconVideoOpen =
                    '<svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g  fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M21.5,35.83333c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v71.66667c0,7.83362 6.49972,14.33333 14.33333,14.33333h93.16667c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-20.92611l35.83333,28.66667v-87.14779l-35.83333,28.66667v-20.92611c0,-7.83362 -6.49972,-14.33333 -14.33333,-14.33333zM21.5,50.16667h93.16667v71.66667h-93.16667zM150.5,72.25456v27.49089l-17.18881,-13.74544z"></path></g></g></svg>';
                $("#btnVideo").empty();
                $("#btnVideo").append(iconVideoOpen);
                $("#btnVideo").css("background-color", "#3c4043");

                socket.emit("SHOW_VIDEO", id);
                socket.stream.getVideoTracks()[0].enabled = true;

                socket.on("ON_SHOW_VIDEO", (peerResponse) => {
                    trackList[0][[peerResponse]][0][1].enabled = true;
                });
            }

            clickVideo += 1;
            if (clickVideo > 1) {
                clickVideo = 0;
            }
        });

        $("#btnShareScreen").on("click", function (e) {
            $("#btnShareScreen").css("background-color", "#6200ee");
            navigator.mediaDevices
                .getDisplayMedia({ cursor: true })
                .then((stream) => {
                    var screenTrack = stream.getTracks()[0];
                    // trackList[0][[id]][0][1].replaceTrack(screenTrack);
                    var set = [];
                    set.push(screenTrack);
                    socket.emit("SHARE_SCREEN", set);
                    console.log(set);
                });
        });

        $("#btnRaseHand").on("click", function (e) {
            if (clickRaseHand == 0) {
                // $(".infoRoom-disapear").css("display", "none");

                $("#btnRaseHand").css("background-color", "#6200ee");

                $("#raseHandRoom").css("display", "block");

                var userRaseHandChild = [
                    {
                        peerId: id,
                        avatar: user[0].avatar,
                        email: user[0].email,
                        name: user[0].name,
                    },
                ];

                socket.emit("USER_RASE_HAND", userRaseHandChild);
                userRaseHand.push(userRaseHandChild);

                $("#raseHandRoom").append(
                    '<div class="userInRoomList" id="' +
                        id +
                        '-rasehand">' +
                        '<div class="userInfo">' +
                        '<img src="' +
                        user[0].avatar +
                        '" />' +
                        "<p>" +
                        user[0].name +
                        "</p>" +
                        "</div>" +
                        '<div class="performUser">' +
                        '<button id="#">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                        '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                        '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                        '<g fill="#333333">' +
                        '<path d="M135.9875,24.08c-5.9125,0 -8.61344,4.085 -8.61344,8.7075v46.3325c0,1.89469 -1.53188,3.44 -3.44,3.44c-1.89469,0 -3.53406,-1.54531 -3.53406,-3.44v-63.70719c0.06719,-4.16563 -2.49937,-8.53281 -8.53281,-8.53281c-6.02,0 -8.61344,4.68969 -8.61344,8.62688v60.21344c0,1.90812 -1.54531,3.44 -3.44,3.44c-1.89469,0 -3.49375,-1.53188 -3.49375,-3.42656v-0.01344v-67.09344c0,-3.48031 -2.6875,-8.62688 -8.55969,-8.62688c-5.88563,0 -8.62688,5.14656 -8.62688,8.62688v70.49312c0,1.89469 -1.54531,3.44 -3.44,3.44c-1.89469,0 -3.45344,-1.54531 -3.45344,-3.44v-56.59875c0,-6.31562 -5.14656,-8.61344 -8.61344,-8.61344c-3.31906,0 -8.58656,2.23062 -8.58656,8.22375v88.96969c-0.13437,0.08063 -0.29562,0.1075 -0.45687,0.16125l-0.01344,-0.16125l-17.2,-20.64c-4.47469,-4.81062 -12.04,-4.81062 -16.85062,0c-4.82406,4.47469 -4.82406,12.04 0,16.86406l0.37625,0.49719c0.12094,0.3225 0.24187,0.645 0.47031,0.92719l29.30719,37.65188l9.39281,12.17437l-0.01344,-0.12094l1.20938,1.55875c0.01344,0 0.01344,0 0.02687,0.01344c5.375,7.12188 13.51813,11.35469 22.53469,11.86531c0.43,0.04031 0.90031,0.06719 1.38406,0.08063c0.14781,0 0.29563,0.02687 0.44344,0.02687c0.01344,0 0.02687,-0.01344 0.05375,-0.01344c0.09406,0 0.18812,0.01344 0.29562,0.01344h27.52c15.22469,0 30.96,-11.58312 30.96,-30.96c0,0 0,-103.34781 0,-108.07781c0,-4.73 -2.56656,-8.88219 -8.4925,-8.88219z"></path>' +
                        "</g></g></svg></button></div></div>"
                );
            }
            if (clickRaseHand == 1) {
                $("#btnRaseHand").css("background-color", "#3c4043");

                var userUnRaseHandChild = [
                    {
                        peerId: id,
                        avatar: user[0].avatar,
                        email: user[0].email,
                        name: user[0].name,
                    },
                ];

                socket.emit("USER_UN_RASE_HAND", userUnRaseHandChild);
                for (var i = 0; i < userRaseHand.length; i++) {
                    if (userRaseHand[i][0].peerId === id) {
                        userRaseHand.splice(i, 1);
                    }
                }

                var idRaseHand = "#" + id + "-rasehand";
                $(idRaseHand).remove();
                if (userRaseHand.length > 0) {
                    $("#raseHandRoom").css("display", "block");
                } else {
                    $("#raseHandRoom").css("display", "none");
                }
            }
            clickRaseHand += 1;
            if (clickRaseHand > 1) {
                clickRaseHand = 0;
            }
        });

        $("#btnSendMessage").on("click", function (e) {
            if ($("#inputMessage").val() != "") {
                $(".chatboxConversationView").append(
                    '<div class="messageChild">' +
                        '<p style="margin-bottom: 0%"><b>You</b><span> ' +
                        $("#clockRoom").text() +
                        "</span></p>" +
                        "<p>" +
                        $("#inputMessage").val() +
                        "</p>" +
                        "</div>"
                );

                socket.emit(
                    "SEND_MESSAGE",
                    $("#inputMessage").val(),
                    user[0].name
                );
            }
        });

        $("#inputMessage").keypress(function (event) {
            var keycode = event.keyCode ? event.keyCode : event.which;
            if (keycode == "13") {
                document.getElementById("btnSendMessage").click();
                $("#inputMessage").val("");
            }
        });

        // $("#btnOffRoom").on("click", function (e) {
        //     socket.emit("DISCONNECT", id);
        // });

        socket.on("ON_OPEN_MIC", (peerResponse) => {
            trackList[0][[peerResponse]][0][0].enabled = true;
        });

        socket.on("ON_MUTE_MIC", (peerResponse) => {
            trackList[0][[peerResponse]][0][0].enabled = false;
        });

        socket.on("ON_HIDE_VIDEO", (peerResponse) => {
            console.log(peerResponse);
            trackList[0][[peerResponse]][0][1].enabled = false;
        });

        socket.on("ON_SHOW_VIDEO", (peerResponse) => {
            trackList[0][[peerResponse]][0][1].enabled = true;
        });

        socket.on("ON_USER_RASE_HAND", (userRaseHandResponse) => {
            $("#raseHandRoom").css("display", "block");

            userRaseHand.push(userRaseHandResponse[0]);

            $("#raseHandRoom").append(
                '<div class="userInRoomList" id="' +
                    userRaseHandResponse[0].peerId +
                    '-rasehand">' +
                    '<div class="userInfo">' +
                    '<img src="' +
                    userRaseHandResponse[0].avatar +
                    '" />' +
                    "<p>" +
                    userRaseHandResponse[0].name +
                    "</p>" +
                    "</div>" +
                    '<div class="performUser">' +
                    '<button id="#">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">' +
                    '<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">' +
                    '<path d="M0,172v-172h172v172z" fill="none"></path>' +
                    '<g fill="#333333">' +
                    '<path d="M135.9875,24.08c-5.9125,0 -8.61344,4.085 -8.61344,8.7075v46.3325c0,1.89469 -1.53188,3.44 -3.44,3.44c-1.89469,0 -3.53406,-1.54531 -3.53406,-3.44v-63.70719c0.06719,-4.16563 -2.49937,-8.53281 -8.53281,-8.53281c-6.02,0 -8.61344,4.68969 -8.61344,8.62688v60.21344c0,1.90812 -1.54531,3.44 -3.44,3.44c-1.89469,0 -3.49375,-1.53188 -3.49375,-3.42656v-0.01344v-67.09344c0,-3.48031 -2.6875,-8.62688 -8.55969,-8.62688c-5.88563,0 -8.62688,5.14656 -8.62688,8.62688v70.49312c0,1.89469 -1.54531,3.44 -3.44,3.44c-1.89469,0 -3.45344,-1.54531 -3.45344,-3.44v-56.59875c0,-6.31562 -5.14656,-8.61344 -8.61344,-8.61344c-3.31906,0 -8.58656,2.23062 -8.58656,8.22375v88.96969c-0.13437,0.08063 -0.29562,0.1075 -0.45687,0.16125l-0.01344,-0.16125l-17.2,-20.64c-4.47469,-4.81062 -12.04,-4.81062 -16.85062,0c-4.82406,4.47469 -4.82406,12.04 0,16.86406l0.37625,0.49719c0.12094,0.3225 0.24187,0.645 0.47031,0.92719l29.30719,37.65188l9.39281,12.17437l-0.01344,-0.12094l1.20938,1.55875c0.01344,0 0.01344,0 0.02687,0.01344c5.375,7.12188 13.51813,11.35469 22.53469,11.86531c0.43,0.04031 0.90031,0.06719 1.38406,0.08063c0.14781,0 0.29563,0.02687 0.44344,0.02687c0.01344,0 0.02687,-0.01344 0.05375,-0.01344c0.09406,0 0.18812,0.01344 0.29562,0.01344h27.52c15.22469,0 30.96,-11.58312 30.96,-30.96c0,0 0,-103.34781 0,-108.07781c0,-4.73 -2.56656,-8.88219 -8.4925,-8.88219z"></path>' +
                    "</g></g></svg></button></div></div>"
            );
        });

        socket.on("ON_USER_UN_RASE_HAND", (userUnRaseHandResponse) => {
            for (var i = 0; i < userRaseHand.length; i++) {
                if (
                    userRaseHand[i].peerId === userUnRaseHandResponse[0].peerId
                ) {
                    userRaseHand.splice(i, 1);
                }
            }

            var idUnRaseHand =
                "#" + userUnRaseHandResponse[0].peerId + "-rasehand";
            $(idUnRaseHand).remove();
            if (userRaseHand.length > 0) {
                $("#raseHandRoom").css("display", "block");
            } else {
                $("#raseHandRoom").css("display", "none");
            }
        });

        socket.on("ON_SEND_MESSAGE", (message, peerName) => {
            $(".chatboxConversationView").append(
                '<div class="messageChild">' +
                    '<p style="margin-bottom: 0%"><b>' +
                    peerName +
                    "</b><span> " +
                    $("#clockRoom").text() +
                    "</span></p>" +
                    "<p>" +
                    message +
                    "</p>" +
                    "</div>"
            );
        });

        socket.on("ON_DISCONNECT", (peerDisconnect) => {
            delete trackList[0][[peerDisconnect]];
            var idCam = "#" + peerDisconnect;
            var idUserList = "#" + peerDisconnect + "-list";
            $(idCam).remove();
            $(idUserList).remove();
        });

        peer.on("call", (call) => {
            openStream().then((stream) => {
                call.answer(stream);
                call.on("stream", (remoteStream) => {
                    if (call.peer != id && call.peer != remoteOld) {
                        remoteOld = call.peer;
                        trackList[0][[call.peer]] = [];
                        trackList[0][[call.peer]].push(
                            remoteStream.getTracks()
                        );

                        playStream(remoteStream, "remoteStream", call.peer);
                    }

                    // playStream(remoteStream, "remoteStream", call.peer);
                });
            });
        });
    });
}

// openStream()
// .then(stream => playStream(stream));

var ip_address = "127.0.0.1";
var socket_port = "8005";
var socket = io(ip_address + ":" + socket_port);

function openStream() {
    const config = { audio: false, video: true };
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
    var clickListUser = 0;
    var clickInfo = 0;
    var clickChatbox = 0;
    var clickMic = 0;
    var clickVideo = 0;
    var peer = new Peer();
    peer.on("open", (id) => {
        socket.emit("CHECK_ROOM", roomId, id, user[0]);

        socket.on("USER_LIST", (userList) => {
            if (userList.length == 1) {
                userList.forEach((user) => {
                    console.log(user);
                    var keys = Object.keys(user);

                    openStream().then((stream) => {
                        // console.log("User List 1: " + call.peer);
                        playStream(stream, "localStream", id);
                    });
                    $("#userInRoom").append(
                        '<div class="userInRoomList">' +
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
            } else {
                if (userList.length > 1) {
                    openStream().then((stream) => {
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
                                playStream(
                                    remoteStream,
                                    "remoteStream",
                                    user[keys][0].peerId
                                );
                            });
                        });
                        $("#userInRoom").append(
                            '<div class="userInRoomList">' +
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
                    $("#userInRoom").append(
                        '<div class="userInRoomList">' +
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

                        $("#userInRoom").append(
                            '<div class="userInRoomList">' +
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
            }

            if (clickMic == 1) {
                var iconMicOpen =
                    '<svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g  fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,14.33333c-11.87517,0 -21.5,9.62483 -21.5,21.5v43c0,11.87517 9.62483,21.5 21.5,21.5c11.87517,0 21.5,-9.62483 21.5,-21.5v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM43.62988,78.83333c-4.343,0 -7.841,3.85365 -7.13867,8.14649c3.5108,21.49797 20.70692,38.35796 42.34212,41.46028v14.89323c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.89323c21.63521,-3.10233 38.83133,-19.96231 42.34212,-41.46028c0.70233,-4.29283 -2.79567,-8.14649 -7.13867,-8.14649c-3.54033,0 -6.45985,2.60553 -7.05469,6.10286c-2.9025,16.87751 -17.60659,29.73047 -35.31543,29.73047c-17.70883,0 -32.41293,-12.85297 -35.31543,-29.73047c-0.59483,-3.49733 -3.50719,-6.10286 -7.05469,-6.10286z"></path></g></g></svg>';
                $("#btnAudio").empty();
                $("#btnAudio").append(iconMicOpen);
                $("#btnAudio").css("background-color", "#3c4043");
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
            }

            if (clickVideo == 1) {
                var iconVideoOpen =
                    '<svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g  fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M21.5,35.83333c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v71.66667c0,7.83362 6.49972,14.33333 14.33333,14.33333h93.16667c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-20.92611l35.83333,28.66667v-87.14779l-35.83333,28.66667v-20.92611c0,-7.83362 -6.49972,-14.33333 -14.33333,-14.33333zM21.5,50.16667h93.16667v71.66667h-93.16667zM150.5,72.25456v27.49089l-17.18881,-13.74544z"></path></g></g></svg>';
                $("#btnVideo").empty();
                $("#btnVideo").append(iconVideoOpen);
                $("#btnVideo").css("background-color", "#3c4043");
            }

            clickVideo += 1;
            if (clickVideo > 1) {
                clickVideo = 0;
            }
        });
    });

    peer.on("call", (call) => {
        openStream().then((stream) => {
            call.answer(stream);
            call.on("stream", (remoteStream) => {
                console.log(
                    "User Join answer: " + call.peer + " local id: " + id
                );

                // playStream(remoteStream, "remoteStream", call.peer);
            });
        });
    });
}

// openStream()
// .then(stream => playStream(stream));

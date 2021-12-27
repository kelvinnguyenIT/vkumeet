const socket = io('http://127.0.0.1:8000/')

function openStream(){
    const config = {audio:false,video:true};
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(stream){
    var video = document.createElement("VIDEO");
    var localStream = document.getElementById("localStream")
    video.srcObject = stream;
    video.width = 320;
    video.height = 240;
    video.play();
    localStream.appendChild(video);
}

var peer = new Peer(); 

peer.on('open', id => console.log(id));


// openStream()
// .then(stream => playStream(stream));
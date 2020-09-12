var socket = new WebSocket("ws://localhost:8080/ws");

let connect = cb => {
    console.log("Attempting connection...");

    socket.onmessage = msg => {
        console.log(msg);
        cb(msg)
    };

    socket.onclose = event => {
        console.log ("Socket closed connection", event);
    };

    socket.onerror = error => {
        console.log("Error: ", error);
    };
};

let sendMsg = msg => {
    console.log("Sending message ", msg);
    socket.send(msg)
};

export {connect, sendMsg};
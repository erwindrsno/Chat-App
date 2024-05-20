const socket = io();

socket.on("connect",() => {
    console.log("Connected to server");

    socket.on("greetings", (arg) => {
        console.log(arg);
    });
})

socket.on("disconnect",() => {
    console.log("Disconnected from server");
})
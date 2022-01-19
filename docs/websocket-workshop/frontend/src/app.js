let wsConnection;

let chatLogsDom = document.getElementById("chatLogs")

const insertLog = (data) => {
    let pTag = document.createElement("p")
    pTag.innerHTML = data
    chatLogsDom.prepend(pTag)
}

const connectWS = () => {
    wsConnection = new WebSocket("ws://localhost:8000")
    wsConnection.onopen = (ev) => {
        wsConnection.send("New user joined")
    }
    wsConnection.onmessage = (ev) => {
        insertLog(ev.data)
    }
}

let userTextDom = document.getElementById("userText")
const sendUserText = () => {
    wsConnection.send(userTextDom.value)
}
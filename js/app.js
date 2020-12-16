let body = document.getElementById('message-output');
let txtFld = document.getElementById("text-input");
let timeStamp = document.createElement("div");
timeStamp.classList.add("time");

// intro message
function addMessage() {
    let newDiv = document.createElement("div");
    newDiv.classList.add("message-bubble", "message-robot");
    // message
    newDiv.innerHTML = "Hello, how are you?";

    getTime();
    newDiv.appendChild(timeStamp);

    body.appendChild(newDiv);
}
setTimeout(addMessage, 1200);

// send user message and clear input
function sendMessage() {
    if (txtFld.value != "") {
        let newMessage = document.createElement("div");
        newMessage.classList.add("message-bubble", "message-client");
        newMessage.innerHTML = txtFld.value;

        getTime();
        newMessage.appendChild(timeStamp);

        body.appendChild(newMessage);
        txtFld.value = "";
    }
}

// add time stamp
function getTime() {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    timeStamp.innerHTML = time;
}
let body = document.getElementById('message-output');
let txtFld = document.getElementById("text-input");
let timeStamp = document.createElement("div");
timeStamp.classList.add("time");

let answers = [
    "What is your favourite colour?",
    "The weather is nice today!",
    "What is your favourite animal?",
    "Do you like cookies?",
    "What did you had for breakfast?",
    "Every day is a good day!",
    "What's your favourite planet?",
    "How would you call a cactus?"
]

// add time stamp
function getTime() {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    timeStamp.innerHTML = time;
}

// create random answer
function createAnswer() {
    let answerIndex = Math.floor(Math.random()*(answers.length));
    let answerContent = answers[answerIndex];
    answers.splice(answerIndex, 1);

    let newAnswer = document.createElement("div");
    newAnswer.classList.add("message-bubble", "message-robot");
    newAnswer.innerHTML = answerContent;

    // getTime();
    // newMessage.appendChild(timeStamp);

    body.appendChild(newAnswer);
}

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

        setTimeout(createAnswer, 1200);

    }
}
// To do:
// - more intelligent chat

let body = document.getElementById("message-output");
let txtFld = document.getElementById("text-input");
let sound = new Audio("../incoming-message.mp3");
let notification = document.getElementById("message-sound");
let bellIcon = notification.querySelector("i");

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
    let timeStamp = document.createElement("div");
    timeStamp.classList.add("time");

    let today = new Date();
    let min = today.getMinutes();
    min = min < 10 ? "0" + min : min;

    let time = today.getHours() + ":" + min;
    timeStamp.innerHTML = time;
    return timeStamp;
}

// intro message
function introMessage() {
    let introMessage = document.createElement("div");
    introMessage.classList.add("message-bubble", "message-robot");
    // message
    introMessage.innerHTML = "Hello, how are you?";

    let time = getTime();
    introMessage.appendChild(time);

    body.appendChild(introMessage);
    sound.play();
    scrollToBottom();
}
setTimeout(introMessage, 1200);

// send user message and clear input
function sendMessage() {
}

txtFld.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        if (txtFld.value != "") {
            let newMessage = document.createElement("div");
            newMessage.classList.add("message-bubble", "message-client");
            newMessage.innerHTML = txtFld.value;

            let time = getTime();
            newMessage.appendChild(time);

            body.appendChild(newMessage);
            scrollToBottom();
            txtFld.value = "";

            setTimeout(createAnswer, 1200);
        }
    }
});

// create random answer
function createAnswer() {
    let answerIndex = Math.floor(Math.random()*(answers.length));
    let answerContent = answers[answerIndex];
    // removing the sent answer from answer array, so the same question doesn't get repeated
    answers.splice(answerIndex, 1);

    let newAnswer = document.createElement("div");
    newAnswer.classList.add("message-bubble", "message-robot");
    newAnswer.innerHTML = answerContent;

    let time = getTime();
    newAnswer.appendChild(time);

    body.appendChild(newAnswer);
    sound.play();
    scrollToBottom();
}

// scroll down when message is send/received
function scrollToBottom() {
    $("#message-output").animate({ scrollTop: $("#message-output")[0].scrollHeight}, 500);
}

// (un-)mute notification sound and change bell icon
notification.addEventListener("click", function() {
    if (bellIcon.classList.contains("fa-bell-slash")) {
        bellIcon.classList = "fas fa-bell"
        sound = new Audio("../incoming-message.mp3");
    } else {
        bellIcon.classList = "fas fa-bell-slash"
        sound = new Audio("");
    }
});

// test function for scrolling
// setInterval(function() {
//     let newMessage = document.createElement("div");
//     newMessage.classList.add("message-bubble", "message-client");
//     newMessage.innerHTML = "test";

//     let time = getTime();
//     newMessage.appendChild(time);

//     body.appendChild(newMessage);
//     scrollToBottom();
// },
// 2000)
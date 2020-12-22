$(function() {

    let body = document.getElementById("message-output");
    let txtFld = document.getElementById("text-input");
    let sound = new Audio("incoming-message.mp3");
    sound.muted = true;
    let notification = document.getElementById("message-sound");
    let bellIcon = notification.querySelector("i");

    let questionIndex = 0;
    let userInput = "";

    let questions = [
        {
            question : "Hello, what's your name?",
            display: function() {
                let newReaction = document.createElement("div");
                newReaction.classList.add("message-bubble", "message-robot");
                newReaction.innerHTML = `Hi, ${userInput}, long time no see!`
                ;

                let time = getTime();
                newReaction.appendChild(time);

                body.appendChild(newReaction);
                sound.play();
                scrollToBottom();
            }
        },
        {
            question : "What is your favourite colour?",
            reaction : "Mine too!"
        },
        {
            question : "How old are you?",
            reaction : "Age is just a number."
        },
        {
            question : "What is your favourite animal?",
            display : function() {
                let newMessage = document.createElement("div");
                newMessage.classList.add("message-bubble", "message-robot");

                let newImg = document.createElement("img");
                newImg.src = `https://source.unsplash.com/500x300/?${userInput}`;
                newMessage.appendChild(newImg);

                let time = getTime();
                newMessage.appendChild(time);

                body.appendChild(newMessage);
                scrollToBottom();
            }
        },
        {
            question : "Do you like cookies?",
            reaction : "Beware of the cookie monster...",
            display: function() {
                let newMessage = document.createElement("div");
                newMessage.classList.add("message-bubble", "message-robot");

                let newImg = document.createElement("img");
                newImg.src = "https://media.giphy.com/media/xT0xeMA62E1XIlup68/giphy.gif";

                newMessage.appendChild(newImg);

                let time = getTime();
                newMessage.appendChild(time);

                body.appendChild(newMessage);
                scrollToBottom();
            }
        },
        {
            question : "What did you had for breakfast?",
            reaction : "Sounds yummy!"
        },
        {
            question : "What's your favourite planet?",
            reaction : "Let's not forget about Pluto...",
        },
        {
            question : "How would you call a cactus?",
            reaction : "Nice choice. I think I would call mine Derek 🌵"
        }
    ];

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

    // run createQuestion() once for introduction
    setTimeout(createQuestion, 500);

    // send user message and clear input
    txtFld.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (txtFld.value != "") {
                let newMessage = document.createElement("div");
                newMessage.classList.add("message-bubble", "message-client");
                newMessage.innerHTML = txtFld.value;
                userInput = txtFld.value;

                let time = getTime();
                newMessage.appendChild(time);

                body.appendChild(newMessage);
                scrollToBottom();
                txtFld.value = "";

                setTimeout(createReaction, 1000);

                setTimeout(createQuestion, 3000);
            }
        }
    });

    // create random question
    function createQuestion() {
        if (questions.length === 0) {
            // exit chat
            let newQuestion = document.createElement("div");
            newQuestion.classList.add("message-bubble", "message-robot");
            newQuestion.innerHTML = "I have no more questions left. It was great talking to you! 🐶";

            let time = getTime();
            newQuestion.appendChild(time);

            body.appendChild(newQuestion);
            sound.play();
            scrollToBottom();

            let exitChat = document.createElement("div");
            exitChat.classList.add("exit");
            exitChat.innerHTML = "Doggo has left the chat.";

            txtFld.disabled = true;
            txtFld.placeholder = "You can't send any new messages.";

            body.appendChild(exitChat);
            sound.play();
            scrollToBottom();
        } else {
            let questionContent;
            if (questionIndex === 0) {
                // welcome message
                questionContent = questions[0].question;
            } else {
                // regular question output
                questionIndex = Math.floor(Math.random()*(questions.length));
                questionContent = questions[questionIndex].question;
            }

            let newQuestion = document.createElement("div");
            newQuestion.classList.add("message-bubble", "message-robot");
            newQuestion.innerHTML = questionContent;

            let time = getTime();
            newQuestion.appendChild(time);

            body.appendChild(newQuestion);
            sound.play();
            scrollToBottom();
        }
    }

    // create reaction after user answers
    function createReaction() {
        if (questions[questionIndex].reaction) {
            let newReaction = document.createElement("div");
            newReaction.classList.add("message-bubble", "message-robot");
            newReaction.innerHTML = questions[questionIndex].reaction;
            ;

            let time = getTime();
            newReaction.appendChild(time);

            body.appendChild(newReaction);
            sound.play();
            scrollToBottom();
        };
        if (questions[questionIndex].display) {
            questions[questionIndex].display();
        };

        // removing the sent question from question array, so the same question doesn't get repeated
        questions.splice(questionIndex, 1);

        if (questionIndex === 0) {
            questionIndex++;
        }
    }

    // scroll down when message is send/received
    function scrollToBottom() {
        $(body).animate({ scrollTop: $(body)[0].scrollHeight}, 500);
    }

    // (un-)mute notification sound and change bell icon
    $(notification).click(function () {
        $(bellIcon).toggleClass( "fa-bell-slash" );
        if ($(bellIcon).hasClass( "fa-bell-slash" )) {
            sound.muted = true;
        };

        $(bellIcon).toggleClass( "fa-bell" );
        if ($(bellIcon).hasClass( "fa-bell" )) {
            sound.muted = false;
        }
    })
});
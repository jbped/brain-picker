// Link JS to HTML Elements
var timerDisplayEl = document.querySelector('#timer-display');
var timerDivEl = document.querySelector("#timer");
var mainTopEl = document.querySelector('#main-top');
var mainTopTitle = document.querySelector('#main-top-title')
var mainCenterEl = document.querySelector('#main-center');
var mainBottomEl = document.querySelector('#main-bottom');
var startBtnEl = document.querySelector('#start-btn');
var flavorTextEl = document.querySelector('#flavor-text');
var answerFeedbackEl = document.querySelector("#answer-feedback");
var formDivEl = document.querySelector("#form-handler");
var viewHighscoresEl = document.querySelector("#highscore");
var startCont = document.querySelector("#start-cont")

// JS Created Elements
var btnHolder = document.querySelector(".button-holder");
var questionBtnEl = document.querySelectorAll(".question-btn");


// Set Score Values
scoreTime = 60;
scoreAnswers = 0;
currentQuestion = 0;

// Start Timer
var quizTimer;

var highscores =  [];

var highscoreObj = {};

// Questions and Answers Array
var questionArr = [ 
    {
        question: "For loop statements are seperated by  _________.",
        answer: 0,
        0: "a semi-colon - ';'",
        1: "a comma - ','",
        2: "a space - '  '",
        3: "double or single quotes",

    },
    {
        question: "JavasScript is exclusively a client-side programming language",
        answer: 1,
        0: "True",
        1: "False"
    },
    {
        question: "What is the correct method of creating an array?",
        answer: 2,
        0: "var arrEx = [item1; item2; item3]",
        1: "var arrEx {item1, item2, item3};",
        2: "var arrEx = [item1, item2, item3];",
        3: "var arrEx = {item1; item2; item3};"
    },
    {
        question: "What does DOM stand for?",
        answer: 1,
        0: "Display Object Method",
        1: "Document Object Model",
        2: "Display Optional Model",
        3: "Document Orientation Method"
    },
    {
        question: "What is the name for the appropriate way of compounding words in javascript (Example: compoundWord)?",
        answer: 3,
        0: "Pascal Case",
        1: "Snake Case",
        2: "Leet",
        3: "Camel Case"
    },
    {
        question: "Which method is the appropriate way to send a message to the DevTools console?",
        answer: 3,
        0: "console.message('lorem ipsum')",
        1: "console.alert('lorem ipsum')",
        2: "console.dir('lorem ipsum')",
        3: "console.log('lorem ipsum')"
    },
    {
        question: "True or False. Math.floor() rounds to the nearest integer.",
        answer: 1,
        0: "True",
        1: "False"
    }
];

// Create div for quit and next buttons
var navBtnDiv = function () {
    var navBtnDiv = document.createElement("div");
        navBtnDiv.setAttribute("id", "nav-btn-div");
        navBtnDiv.className = "nav-btn-div";
    mainBottomEl.appendChild(navBtnDiv);
}

// Create quit button (quit quiz)
var quitBtn = function() {
    
    var createQuitBtn = document.createElement('button');
    createQuitBtn.textContent = "Quit";
    createQuitBtn.id = "quit-btn";
    createQuitBtn.className = "btn-style nav-btn"
    navBtnDivEl = document.getElementById("nav-btn-div");
    createQuitBtn.addEventListener("click", function(){
       
        if(confirm("Are you sure you would like to quit?")) {
            window.location.reload();
        }
    });
    navBtnDivEl.appendChild(createQuitBtn);
}

// create next button (progress to next page)
var nextBtn = function() {
    var createNextBtn = document.createElement('button');
    createNextBtn.textContent = "Next";
    createNextBtn.id = "next-btn";
    createNextBtn.className = "btn-style nav-btn"
    navBtnDivEl = document.getElementById("nav-btn-div");
    createNextBtn.addEventListener("click", function(){
        if(currentQuestion < questionArr.length - 1) {
            currentQuestion++;
            showQuestion();
            generateButtons();
            removeButtons();
            ansFeedback();
        } else {
            endQuiz();
        }
    })
    navBtnDivEl.appendChild(createNextBtn);
}

// Generate Answer Buttons for the Current Question
var generateButtons = function () {
    // Create button div container for the generated buttons
    var buttonHolderEl = document.createElement('div');
    // Add class to generated div
    buttonHolderEl.className = "button-holder";
    buttonHolderEl.id = "btn-holder";
    // Add div to the correct element main-center
    mainCenterEl.appendChild(buttonHolderEl);
    
    // For loop that dynamically creates buttons === answer options
    for (var i = 0; i < (Object.keys(questionArr[currentQuestion]).length - 2); i++) {
        // create button element
        var createButton = document.createElement('button');
        // Add corresponding answer option as button text
            createButton.textContent = questionArr[currentQuestion][i];
            // Set buttonID to be the corresponding answer option used to verify answer
            createButton.setAttribute("buttonId", i);
            createButton.id = ("q-"+i)
            createButton.className = "question-btn btn-style";
        // Add button to the buttonHolder div created above
        buttonHolderEl.appendChild(createButton);
    }
};

// To be used upon clicking the Next button in the quiz, it will remove the previous generated answer buttons
var removeButtons = function () {
    var selectBtnDiv = document.querySelector(".button-holder");
    if (!!selectBtnDiv) {
        selectBtnDiv.remove();
    }
    var nextBtnEl = document.querySelector("#next-btn");
    // Checks in next button exists
    if (!!nextBtnEl) {
        nextBtnEl.remove();
    }
    if (!!startBtnEl) {
        startBtnEl.remove();
    }
};

var removeQuit = function() {
    rmvQuit = document.getElementById("quit-btn")
    if(!!rmvQuit) {
        rmvQuit.remove();
    }
}

// Populates the current quiz question
var showQuestion = function() {
    // check currentQuestion value, populate corresponding questionArr item
    question = questionArr[currentQuestion].question;
    // mainTopTitle.textContent = ''
    mainTopTitle.textContent = questionArr[currentQuestion].question;
}

// Using global addEventListener, if event.target matches specified class get attribute for pushed button.
var questionPressHandler = function(event) {
    var targetEl = event.target;

    if(targetEl.matches(".question-btn")) {
        var userChoice = targetEl.getAttribute("buttonId");
        // After a choice has been made, disable all choice buttons
        document.querySelectorAll("[class=question-btn]").forEach((function(disable){disable.setAttribute("disabled","true");}));
        quizLogic(userChoice);
    }
};

var quizLogic = function(userChoice) {
    // If user has not answered question, wait for response.
    if(userChoice === undefined) {
    // If user answered question correctly && it was the last question of the quiz, end quiz
    } else if (parseInt(userChoice) === questionArr[currentQuestion].answer && currentQuestion === questionArr.length - 1){
        // clearInterval(quizTimer)
        revealCorrect();
        currentQuestion++
        console.log("Correct!");
        scoreAnswers++;
        let completed = true
        endQuiz(completed);
        // If user answered question incorrectly && it was the last question of the quiz, end quiz
    } else if (parseInt(userChoice) !== questionArr[currentQuestion] && currentQuestion === questionArr.length - 1){
        // clearInterval(quizTimer)
        revealWrong();
        currentQuestion++
        console.log("Wrong!")
        scoreTime-=5;
        let completed = true
        endQuiz(completed);
    // If user answered question correctly && it wasn't the last question of the quiz add points, generate next question button
    } else if(parseInt(userChoice) === questionArr[currentQuestion].answer) {
        revealCorrect();
        console.log("Correct!")
        scoreAnswers++;
        nextBtn();
    // If user answered question incorrectly && it wasn't the last question of the quiz subtract time, generate next question button
    } else if (parseInt(userChoice) !== questionArr[currentQuestion].answer) {
        revealWrong();
        console.log("Wrong!")
        scoreTime-=5;
        nextBtn();
    }
}

var revealCorrect = function () {
    var ansDiv = document.createElement("div");
    var renderResp = document.createElement("h3");
        renderResp.textContent = "Correct!";
        renderResp.id = "ans-feedback";
        renderResp.className = "correct-ans";
    ansDiv.appendChild(renderResp);
    mainBottomEl.appendChild(ansDiv);
}
var revealWrong = function () {
    var ansDiv = document.createElement("div");
    var renderResp = document.createElement("h3");
        renderResp.textContent = "Wrong!";
        renderResp.id = "ans-feedback";
        renderResp.className = "wrong-ans";
    ansDiv.appendChild(renderResp);
    mainBottomEl.appendChild(ansDiv);
}

var ansFeedback = function() {
    var ansFdbk = document.getElementById("ans-feedback")
        if(!!ansFdbk) {
            ansFdbk.remove();
        }
}

//  Create form for entering initials to save with highscore
var createForm = function(){
    // Generate div for the form
    var formDiv = document.createElement("div");
        formDiv.setAttribute("id", "form-handler");
    // Create form element
    var initialsForm = document.createElement("form");
    // Create input for form
    var initialsInput = document.createElement("input");
        initialsInput.type = "text";
        initialsInput.name = "initials-input";
        initialsInput.id = "initials";
        initialsInput.placeholder = "Enter Initials Here";
    // Create form submit button for input
    var initialsSubmit = document.createElement("input");
        initialsSubmit.type = "submit";
        initialsSubmit.setAttribute("value", "Submit");
        initialsSubmit.id = "sub-score";
        initialsSubmit.className = "btn-style"
    // Append the created elements above
    initialsForm.appendChild(initialsInput);
    initialsForm.appendChild(initialsSubmit);
    formDiv.appendChild(initialsForm);
    mainCenterEl.appendChild(formDiv);
}

var initialSubmitHandler = function (event) {
    event.preventDefault();
    var userInitials = document.querySelector("#initials")
        .value
        .toUpperCase();
    console.log(userInitials);
    if (userInitials > 3 || userInitials < 2) {
        alert("Please provide your initials");
    } else {
        highscoreObj = {
            initials: userInitials,
            scoreTime,
            scoreAnswers,
        }
        console.log("Highscore Obj",highscoreObj);
        updateHighscores();
        showHighscores();
    }

};

var loadHighscore = function(){
    highscores = localStorage.getItem("highscores");
    if(!highscores) {
        highscores = [];
    } else {
        highscores = JSON.parse(highscores);
    }
}

var updateHighscores = function() {
    loadHighscore();
    highscores.push(highscoreObj);
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

var showHighscores = function() {
    ansFeedback();
    removeButtons();
    removeQuit();
    loadHighscore();
    mainTopTitle.textContent = "Brain Picker Highscores";
    mainCenterEl.innerHTML = "";
    timerDivEl.className = "hidden";
    viewHighscoresEl.className = "hidden";
    highscores.sort(function(a,b) {
        return b.scoreTime - a.scoreTime;
    })
    var returnToQuiz = document.createElement("button");
        returnToQuiz.className = "btn-style start-btn";
        returnToQuiz.textContent = "Return to Quiz";
    startCont.appendChild(returnToQuiz);
    returnToQuiz.addEventListener("click", function(){
        window.location.reload();
        returnToQuiz.remove();
    })
    var highscoreDiv = document.createElement("div");
        // highscoreDiv.className = "flex-row"
        var colHeadersRow = document.createElement("div");
            colHeadersRow.className = "flex-row header-row-div";
        var placeHeader = document.createElement("h3");
            placeHeader.textContent = "Place";
            placeHeader.className = "highscore-place-header";
            colHeadersRow.appendChild(placeHeader);
        var initialHeader = document.createElement("h3");
            initialHeader.textContent = "Initials";
            initialHeader.className = "highscore-header";
            colHeadersRow.appendChild(initialHeader);
        var quizTimeHeader = document.createElement("h3");
            quizTimeHeader.textContent = "Quiz Time";
            quizTimeHeader.className = "highscore-header";
            colHeadersRow.appendChild(quizTimeHeader);
        var correctAnsHeader = document.createElement("h3");
            correctAnsHeader.textContent = "Correct Answers";
            correctAnsHeader.className = "highscore-header";
            colHeadersRow.appendChild(correctAnsHeader);
        highscoreDiv.appendChild(colHeadersRow)

    for (var i = 0; i < highscores.length; i++) {
        user = highscores[i];
        var rowDiv = document.createElement("div");
            rowDiv.className = "flex-row row-div";
        var renderPlacing = document.createElement("h4");
            renderPlacing.textContent = ((i+1) + ". ");
            renderPlacing.className = "highscore-place";
        rowDiv.appendChild(renderPlacing);
        var renderInitials = document.createElement("h4");
            renderInitials.textContent = user.initials;
            renderInitials.className = "highscore-list-h4";
        rowDiv.appendChild(renderInitials);
        var renderScoreTime = document.createElement("h4");
            renderScoreTime.textContent =user.scoreTime + " seconds";
            renderScoreTime.className = "highscore-list-h4";
        rowDiv.appendChild(renderScoreTime);
        var renderScoreAnswers = document.createElement("h4");
            renderScoreAnswers.textContent = user.scoreAnswers + " questions";
            renderScoreAnswers.className = "highscore-list-h4";
        rowDiv.appendChild(renderScoreAnswers);
        highscoreDiv.appendChild(rowDiv)
    }
    mainCenterEl.appendChild(highscoreDiv);
    console.log("Highscores", highscores);
}

var startQuiz = function() {
    // Clean quiz parent containers
    flavorTextEl.className = "hidden";
    removeButtons();
    // Gen nav container
    navBtnDiv();
    // Show quit button
    quitBtn();
    // Generate Questions
    showQuestion();
    // Generate Buttons
    generateButtons();
    // Correct vs Wrong Answer Logic
    quizLogic();
}

var endQuiz = function(completed) {
    finalTime = scoreTime; 
    clearInterval(quizTimer);
    console.log(finalTime);
    removeButtons();
    removeQuit();
    if (completed) {
        mainTopTitle.textContent = "Well done! You completed the quiz!";
    } else {
        mainTopTitle.textContent = "Oh no! You ran out of time!";
    }
    flavorTextEl.className = "show";
    flavorTextEl.textContent = "You have completed the Brain Picker Quiz with a final time of " + scoreTime + " seconds. You correctly answered " + scoreAnswers + " out of " + questionArr.length + " questions available. Use the form below to save your highscore!";
    createForm();
}              

startBtnEl.addEventListener("click",function(){
    console.log("click");
    // Assign quizTimer to setInterval, begin quizTimer
    quizTimer = setInterval(function(){
        if(scoreTime > 1) {
            scoreTime--;
            timerDisplayEl.textContent = scoreTime + " seconds";
        } else if (scoreTime === 1) {
            scoreTime--;
            timerDisplayEl.textContent = scoreTime + " second";
        } else if (scoreTime === 0) {
            clearInterval(quizTimer);
            timerDisplayEl.textContent = scoreTime + " seconds";
            // quizFinish = "OOT"
            let completed = false
            endQuiz(completed);
        }
    },1000);
    startQuiz();
});

mainCenterEl.addEventListener("click", questionPressHandler);
mainCenterEl.addEventListener("submit", initialSubmitHandler);
viewHighscoresEl.addEventListener("click", showHighscores);
// Link JS to HTML Elements
var timerDisplayEl = document.querySelector('#timer-display');
var mainTopEl = document.querySelector('#main-top');
var mainTopTitle = document.querySelector('#main-top-title')
var mainCenterEl = document.querySelector('#main-center');
var mainBottomEl = document.querySelector('#main-bottom');
var startBtnEl = document.querySelector('#start-btn');
var flavorTextEl = document.querySelector('#flavor-text');
var answerFeedbackEl = document.querySelector("#answer-feedback")
var formDivEl = document.querySelector("#form-handler")

var btnHolder = document.querySelector(".button-holder");
var questionBtnEl = document.querySelectorAll(".question-btn")


// Set Score Values
scoreTime = 60;
scoreAnswers = 0;
currentQuestion = 0;

// Questions and Answers Array
var questionArr = [ 
    {
        question: "For loop statements are seperated by  _________.",
        answer: 0,
        0: "a semi-colon ';'",
        1: "a comma ','",
        2: "a space ' '",
        3: "double or single quotes",
        4: "Here is another answer"

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
    }
];

// Clears content and buttons to prepare page for quiz layout
var quizPrep = function() {
    flavorTextEl.className = "hidden";
    startBtnEl.remove();
}

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
    createQuitBtn.textContent = "Quit"
    createQuitBtn.setAttribute("id","quit-btn");
    navBtnDivEl = document.getElementById("nav-btn-div");
    createQuitBtn.addEventListener("click", function(){
       
        if(confirm("Are you sure you would like to quit?")) {
            window.location.reload()
        }
    });
    navBtnDivEl.appendChild(createQuitBtn);
}

// create next button (progress to next page)
var nextBtn = function() {
    var createNextBtn = document.createElement('button');
    createNextBtn.textContent = "Next"
    createNextBtn.id = "next-btn";
    navBtnDivEl = document.getElementById("nav-btn-div");
    createNextBtn.addEventListener("click", function(){
        if(currentQuestion < questionArr.length - 1) {
            currentQuestion++;
            showQuestion();
            generateButtons();
            removeButtons();
        } else {
            endQuiz();
        }
    })
    navBtnDivEl.appendChild(createNextBtn);
}

// Populates the current quiz question
var showQuestion = function() {
    // check currentQuestion value, populate corresponding questionArr item
    question = questionArr[currentQuestion].question
    // mainTopTitle.textContent = ''
    mainTopTitle.textContent = questionArr[currentQuestion].question
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
        createButton.className = "question-btn";
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
};

// // Start Timer
var quizTimer;
 


    
var questionPressHandler = function(event) {
    var targetEl = event.target;

    if(targetEl.matches(".question-btn")) {
        var userChoice = targetEl.getAttribute("buttonId");
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
        currentQuestion++
        console.log("Correct!")
        alert("Correct!");
        scoreAnswers++;
        endQuiz();
        // If user answered question incorrectly && it was the last question of the quiz, end quiz
    } else if (parseInt(userChoice) !== questionArr[currentQuestion] && currentQuestion === questionArr.length - 1){
        // clearInterval(quizTimer)
        currentQuestion++
        console.log("Wrong!")
        alert("Wrong!");
        scoreTime-=5;
        endQuiz();
    // If user answered question correctly && it wasn't the last question of the quiz add points, generate next question button
    } else if(parseInt(userChoice) === questionArr[currentQuestion].answer) {
        console.log("Correct!")
        alert("Correct!");
        scoreAnswers++;
        nextBtn();
    // If user answered question incorrectly && it wasn't the last question of the quiz subtract time, generate next question button
    } else if (parseInt(userChoice) !== questionArr[currentQuestion].answer) {
        console.log("Wrong!")
        alert("Wrong!");
        scoreTime-=5;
        nextBtn();
    }
}

var startQuiz = function() {
    // Clean quiz parent containers
    quizPrep();
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

var endQuiz = function() {
    finalTime = scoreTime; 
    clearInterval(quizTimer);
    console.log(finalTime);
    removeButtons();
    var removeQuit = document.getElementById("quit-btn")
        if(!!removeQuit) {
            removeQuit.remove();
        }
    mainTopTitle.textContent = "Quiz Finished";
    flavorTextEl.className = "show";
    flavorTextEl.textContent = "You have completed the Brain Picker Quiz with a final time of " + scoreTime + " seconds. You correctly answered " + scoreAnswers + " out of " + questionArr.length + " questions available. Use the form below to save your highscore!";
    formDivEl.className = "show"
    // var scoreForm = function() {
    //     var formDiv = document.createElement("div");
    //     var hsForm = document.createElement("form");
    //         hsForm.innerHtml(
    //             "<label for='initials'>Initials:</label></br> <input type='text' id='initials'"
    //         )
    // }


}
                
                
startBtnEl.addEventListener("click",function(){
    console.log("click");
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
            endQuiz();
        }
    },1000);
    startQuiz();
});

mainCenterEl.addEventListener("click", questionPressHandler);
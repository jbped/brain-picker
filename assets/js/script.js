// Link JS to HTML Elements
var timerDisplayEl = document.querySelector('#timer-display');
var mainTopEl = document.querySelector('#main-top');
var mainTopTitle = document.querySelector('#main-top-title')
var mainCenterEl = document.querySelector('#main-center');
var mainBottomEl = document.querySelector('#main-bottom');
var startBtnEl = document.querySelector('#start-btn');
var flavorTextEl = document.querySelector('#flavor-text');

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
        3: "double or single quotes"

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
        answers: 1,
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

var quizPrep = function() {
    flavorTextEl.textContent = "";
    startBtnEl.remove();
}

var navBtnDiv = function () {
    var navBtnDiv = document.createElement("div");
        navBtnDiv.setAttribute("id", "nav-btn-div");
        navBtnDiv.className = "nav-btn-div";
    
    mainBottomEl.appendChild(navBtnDiv);
}

var quitBtn = function() {
    var createQuitBtn = document.createElement('button');
    createQuitBtn.textContent = "Quit"
    createQuitBtn.setAttribute("id","next-btn");
    navBtnDivEl = document.getElementById("nav-btn-div");
    navBtnDivEl.appendChild(createQuitBtn);
}
var nextBtn = function() {
    var createNextBtn = document.createElement('button');
    createNextBtn.textContent = "Next"
    createNextBtn.setAttribute("id","next-btn");
    navBtnDivEl = document.getElementById("nav-btn-div");
    navBtnDivEl.appendChild(createNextBtn);
}

var showQuestion = function() {
    question = questionArr[currentQuestion].question
    // mainTopTitle.textContent = ''
    mainTopTitle.textContent = questionArr[currentQuestion].question
    console.log(questionArr[currentQuestion].question)
}

// Generate Answer Buttons for the Current Question
var generateButtons = function () {
    // Create button div container for the generated buttons
    var buttonHolderEl = document.createElement('div');
        // Add class to generated div
        buttonHolderEl.className = "button-holder";
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
        questionBtnEl = document.querySelector(".question-btn");
        // Add button to the buttonHolder div created above
        buttonHolderEl.appendChild(createButton);
   }
}

// To be used upon clicking the Next button in the quiz, it will remove the previous generated answer buttons
var removeButtons = function () {
    var selectBtnDiv = document.querySelector(".button-holder");
    selectBtnDiv.remove();
}

// Start Timer
var quizTimer = function(){
    setInterval(function(){
        if(scoreTime > 1) {
            timerDisplayEl.textContent = scoreTime + " seconds";
            scoreTime--;
        } else if (scoreTime === 1) {
            timerDisplayEl.textContent = scoreTime + " second";
            scoreTime--;
        } else {
            clearInterval(quizTimer)
            timerDisplayEl.textContent = scoreTime + " seconds";
        }
    },1000)
};

// var questionClick = function(){
//     questionBtn = document.querySelector(".question-btn")
//     questionBtn.addEventListener("click",function(event){
//     target = event.target.getAttribute("buttonid");
//     console.log(target)
//     return target;
//     })
// }

var startQuiz = function() {
    quizPrep();
    quizTimer();
    navBtnDiv();
    quitBtn();
    nextBtn();
    // Generate Questions
    showQuestion();
    // Generate Buttons
    generateButtons();
    // Correct vs Wrong Answer Logic
    // var questionListener = function () {
    //     document.querySelector(".question-btn")
    //     document.addEventListener("click",function(event){
    //         target = event.target.getAttribute("buttonid");
    //     return target;
    //     })
    // }

    var questionBtns = document.querySelector(".question-btn");
    // var questionBtnId = document.querySelector("buttonid")
    questionBtns.onclick = function(event) {
        // target = event.target.matches(".question-btn");
        target = event.target.getAttribute("buttonid");
        console.log(target)
    }
            // console.log(questionListener)
        
        // if (questionClick === questionArr[currentQuestion].answer) {
        //     console.log("correct")
        // }
        // else {
        //     console.log("incorrect")
        // }
}

startBtnEl.addEventListener("click",function(){
    console.log("click");
    startQuiz();
});
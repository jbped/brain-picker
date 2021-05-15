// Link JS to HTML Elements
var timerDisplayEl = document.querySelector('#timer-display');
var mainTopEl = document.querySelector('#main-top');
var mainTopTitle = document.querySelector('#main-top-title')
var mainCenterEl = document.querySelector('#main-center');
var mainBottomEl = document.querySelector('#main-bottom');
var startBtnEl = document.querySelector('#start-btn');

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

// var showQuestion = function() {


//     question = questionArr[currentQuestion].question
//     mainTopTitle.textContent = ''
//     mainTopTitle.textContent = questionArr[currentQuestion].question
//     console.log(questionArr[currentQuestion].question)
// }

var generateButtons = function () {
    // Create button div container for the generated buttons
    var buttonHolderEl = document.createElement('div');
        buttonHolderEl.className = "button-holder";
    mainCenterEl.appendChild(buttonHolderEl);

    for (var i = 0; i < (Object.keys(questionArr[currentQuestion]).length - 2); i++) {
        var createButton = document.createElement('button');
        createButton.textContent = questionArr[currentQuestion][i];
        createButton.setAttribute("buttonID", i)
        buttonHolderEl.appendChild(createButton);
   }
}

var removeButtons = function () {
    var selectBtnDiv = document.querySelector(".button-holder");
    selectBtnDiv.remove();
}

// var questionLogic = function (){
//     for (var i = 0; i < questionArr.length; i++) {
//        var questionAnswer = function () {
//            questionEl.textContent = questionArr[i].q

//        } 

//     }
// }

// Start Timer
var quizTimer = setInterval(function(){
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

var startQuiz = function() {

    

    // Generate Questions

    // Generate Buttons

    // Correct vs Wrong Answer Logic
}

startBtnEl.addEventListener("click",function(){
    console.log("click");
    startQuiz();
});
// Link JS to HTML Elements
var timerDisplayEl = document.querySelector('#timer-display');
var startBtnEl = document.querySelector('#start-btn')

// Set Score Values
scoreTime = 60;
scoreAnswers = 0;

// Questions and Answers Array
var questionArr =[ 
    {
        q: "For loop statements are seperated by  _________.",
        a: 0,
        0: "a semi-colon ';'",
        1: "a comma ','",
        2: "a space ' '",
        3: "double or single quotes"
    },
    {
        q: "What is the correct method of creating an array?",
        a: 2,
        0: "var arrEx = [item1; item2; item3]",
        1: "var arrEx {item1, item2, item3};",
        2: "var arrEx = [item1, item2, item3];",
        3: "var arrEx = {item1; item2; item3};"
    },
    {
        q: "What does DOM stand for?",
        a: 1,
        0: "Display Object Method",
        1: "Document Object Model",
        2: "Display Optional Model",
        3: "Document Orientation Method"
    },
    {
        q: "What is the name for the appropriate way of compounding words in javascript (Example: compoundWord)?",
        a: 3,
        0: "Pascal Case",
        1: "Snake Case",
        2: "Leet",
        3: "Camel Case"
    }
];

var startQuiz = function() {
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
}

startBtnEl.addEventListener("click",function(){
    console.log("click");
    startQuiz();
});
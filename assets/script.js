var startEl = $('#startBtn');
var questionsEl = $('#questions');
var timeEl = $('#timer');

var timer;
var questionList = [{question: "What is CSS?", answers: ["Cascading Styling Sheets", "Really really bad", "A military officer", "Hyper-Text Markup Language"]},
                    {question: "What is JavaScript?", answers: ["The language of the web", "Really really bad", "A war document", "A resturaunt"]},
                    {question: "What is HTML?", answers: ["Hyper-Text Markup Language", "Really really bad", "An indian dish", "A resturaunt"]},
                    {question: "What is my name?", answers: ["Kyle", "John", "Joseph", "Alexander Shillington the 3rd, junior"]},
                    {question: "Is this quiz working?", answers: ["Yes", "No", "Probably not", "What quiz?"]},
                    {question: "Click on \"This one\"", answers: ["This one", "That one", "Those ones", "These ones"]},
                    {question: "Am I a good programmer?", answers: ["Yes", "Yes", "Yes", "No"]},
                    {question: "What is my favorite soda?", answers: ["Dr. Pepper", "Coca-Cola", "Pepsi", "Mtn. Dew"]},
                    {question: "Which one isn't a coding language?", answers: ["Mandarin", "C++", "JavaScript", "Python"]},
                    {question: "Do you like my quiz?", answers: ["I love it", "Yes", "No", "What quiz?"]},
                    {question: "Is this question hard?", answers: ["No", "Yes", "What?", "No it's very soft"]},
                    {question: "What is my favorite show?", answers: ["Better Call Saul", "Breaking Bad", "Attack on Titan", "House MD"]},
                    {question: "Are you cheating?", answers: ["Yes", "No", "I don't know how to cheat", "None of your business"]}];
var seconds = 60;
var questionsAnswered = 0;
var correctAnswers = 0;
var inGame = false;

// console.log(startEl);
// console.log(questionsEl);

startEl.on('click', function (){
    inGame = true;
    seconds = 61;
    time();
    timer = setInterval(time, 1000);

    startEl.addClass('invisible');
    questionsEl.addClass('p-1');

    // Display question
    displayQuestion();
});

function displayQuestion () {
    if(questionList[questionsAnswered] == undefined){
        playerWon();
        return;
    }
    var newEl = $("<h1>" + questionList[questionsAnswered].question + "</h1>");
    questionsEl.append(newEl);
    // console.log(questionList[questionsAnswered].question);

    newEl.attr('class', 'bg-dark text-white p-3 text-center rounded');

    //Display answers below question
    var answersCopy = [];
    for(var i = 0; i < 4; i++){
        answersCopy[i] = questionList[questionsAnswered].answers[i];
    }
    for(var i = 0; i < 4; i++){
        var random = Math.floor(Math.random() * answersCopy.length);
        newEl = $("<p>" + answersCopy[random] + "</p>"); // Create new element with random answer
        // console.log(answersCopy);
        // console.log(questionList[questionsAnswered]);
        answersCopy.splice(random, 1);
        questionsEl.append(newEl);
        // console.log(newEl);
        newEl.attr('class', 'bg-info text-white text-center rounded mx-auto w-50 p-1');
    }
    
}

questionsEl.on('click', function (event){
    if(inGame){
        var clicked = event.target.textContent;
        // console.log(clicked);
        // console.log(questionsAnswered);
        // console.log(questionList[questionsAnswered]);
        // console.log(questionList[questionsAnswered].answers);
        // console.log(questionList[questionsAnswered].answers[0] === clicked);
        var correctText;

        if(questionList[questionsAnswered].answers[0] === clicked){
            // console.log("Correct answer branch");
            correctAnswers++;
            correctText = "Correct!";
        }else{
            // console.log("Wrong answer branch");
            seconds -= 10;
            correctText = "Incorrect! -10 seconds";
        }
        questionsAnswered++;
        questionsEl.empty();

        var correctEl = $("<p>" + correctText + "</p>");
        questionsEl.append(correctEl);
        correctEl.attr('class', 'bg-info text-white text-center rounded mx-auto w-50');

        setTimeout(function() {
            if(inGame){
                questionsEl.empty();
                displayQuestion();
            }
        }, 1000);
    }
});

function time(){
    seconds--;
    timeEl.text(seconds);
    // console.log("time ran");
    if(seconds <= 0){
        timeEl.text("0");
        clearInterval(timer);
        inGame = false;
        questionsEl.empty();
        var newEl = $("<h1>Quiz over! Time ran out!</h1>");
        questionsEl.append(newEl);
        newEl.attr('class', 'bg-dark text-white p-3 text-center rounded');
        newEl = $("<h2>Score: " + correctAnswers + "</h2>");
        questionsEl.append(newEl);
        newEl.attr('class', 'bg-dark text-white p-3 text-center rounded');
        displayScores();
    }
}

function playerWon() {
    timeEl.text("0");
    clearInterval(timer);
    inGame = false;
    questionsEl.empty();
    var newEl = $("<h1>Quiz over! Answered all questions!</h1>");
    questionsEl.append(newEl);
    newEl.attr('class', 'bg-dark text-white p-3 text-center rounded');
    newEl = $("<h2>Score: " + correctAnswers + "</h2>");
    questionsEl.append(newEl);
    newEl.attr('class', 'bg-dark text-white p-3 text-center rounded');
    displayScores();
}

function displayScores(){
    var sectionEl = $("<section>");
    questionsEl.append(sectionEl);
    sectionEl.attr('class', 'bg-white rounded p-2 w-100 d-flex flex-column justify-content-between');
    var newEl = $('<h1>Scores</h1>');
    sectionEl.append(newEl);
    newEl.attr('class', 'text-center');
    var listEl = $('<ul>');
    sectionEl.append(listEl);
    var scores = JSON.parse(localStorage.getItem("scores"));
    if(scores !== null){
        for(var i = 0; i < scores.length; i++){
            var itemEl = $("<li>" + scores[i].player + ": " + scores[i].score + "</li>");
            listEl.append(itemEl);
            itemEl.attr('class', 'text-center p-2');
        }
    }else{
        scores = [];
    }
    var formEl = $("<form>");
    formEl.attr('class', 'mx-auto');
    sectionEl.append(formEl);
    var textEl = $("<label>Initials: </label>");
    textEl.attr('for', 'initals');
    formEl.append(textEl);
    var inputEl = $("<input>");
    inputEl.attr('name', 'initials');
    inputEl.attr('type', 'text');
    formEl.append(inputEl);
    var btnEl = $("<button>Submit</button>");
    formEl.append(btnEl);
    btnEl.on('click', function (event){
        event.preventDefault();
        console.log(inputEl.val());
        scores.push({player: inputEl.val(), score: correctAnswers});
        localStorage.setItem("scores", JSON.stringify(scores));
        var itemEl = $("<li>" +  inputEl.val() + ": " + correctAnswers + "</li>");
        listEl.append(itemEl);
        itemEl.attr('class', 'text-center p-2');
        formEl.empty();
    });
};
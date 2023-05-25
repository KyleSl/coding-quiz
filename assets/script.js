// Inital jQuery grabs
var startEl = $('#startBtn');
var questionsEl = $('#questions');
var timeEl = $('#timer');

// var to run the timer
var timer;

// raw question data, can be expanded. The first answer in the answers array is always the correct one. They are displayed randomly later.
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

// vars to store game data
var questionsAnswered = 0;
var correctAnswers = 0;
var inGame = false;

// event handler for start button
startEl.on('click', function (){
    inGame = true;
    seconds = 61;

    // starts the timer
    time();
    timer = setInterval(time, 1000);

    // makes the start button invisible
    startEl.addClass('invisible');

    // Display question
    displayQuestion();
});

function displayQuestion () {
    // sees if the player has gone through all the questions
    if(questionList[questionsAnswered] == undefined){
        playerWon();
        return;
    }

    // Displays the question to the user
    var newEl = $("<h1>" + questionList[questionsAnswered].question + "</h1>");
    questionsEl.append(newEl);
    newEl.attr('class', 'bg-dark text-white p-3 text-center rounded');

    //Display answers below question
    var answersCopy = [];
    
    // for loop to avoid storing a reference
    // individually assigns each index
    for(var i = 0; i < 4; i++){
        answersCopy[i] = questionList[questionsAnswered].answers[i];
    }

    // uses the copy of the answers array to randomly select an answer to display, then removes it from the copy for the next iteration
    for(var i = 0; i < 4; i++){
        var random = Math.floor(Math.random() * answersCopy.length);

        newEl = $("<p>" + answersCopy[random] + "</p>"); // Create new element with random answer
        questionsEl.append(newEl);
        newEl.attr('class', 'bg-info text-white text-center rounded mx-auto w-50 p-1');

        answersCopy.splice(random, 1); // Removes chosen answer from the array copy
    }
}

// Event handler for clicking on an answer
questionsEl.on('click', function (event){
    if(inGame){
        var clicked = event.target.textContent; // gathers the text from the answer that was clicked on
        var correctText; // Stores the text that is later displayed

        if(questionList[questionsAnswered].answers[0] === clicked){ // Correct 
            correctAnswers++;
            correctText = "Correct!";
        }else{                                                      // Incorrect
            seconds -= 10;
            correctText = "Incorrect! -10 seconds";
        }
        questionsAnswered++;

        questionsEl.empty(); // Removes the answers

        // Displays to the user whether they got it right or wrong
        var correctEl = $("<p>" + correctText + "</p>");
        questionsEl.append(correctEl);
        correctEl.attr('class', 'bg-info text-white text-center rounded mx-auto w-50');

        // Waits 1 second before removing the text and displaying the next question
        setTimeout(function() {
            if(inGame){
                questionsEl.empty();
                displayQuestion();
            }
        }, 1000);
    }
});

// Timer
function time(){
    seconds--;
    timeEl.text(seconds);

    if(seconds <= 0){ // If time runs out, quiz is over and scores are displayed
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

// If questions run out, quiz is over and scores are displayed
// Different text is displayed than when time runs out
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

// Shows a list of previous scores and allows the user to save their score into that list
function displayScores(){
    // Creates a section for the list and input field
    var sectionEl = $("<section>");
    questionsEl.append(sectionEl);
    sectionEl.attr('class', 'bg-white rounded p-2 w-100 d-flex flex-column justify-content-between');

    var newEl = $('<h1>Scores</h1>');
    sectionEl.append(newEl);
    newEl.attr('class', 'text-center');

    // List items of scores are children of this
    var listEl = $('<ul>');
    sectionEl.append(listEl);

    var scores = JSON.parse(localStorage.getItem("scores")); // Grab old scores from localStorage
    if(scores !== null){ // Makes sure that scores is not empty to avoid any issues
        for(var i = 0; i < scores.length; i++){ // Traverses scores and adds list items to the screen
            var itemEl = $("<li>" + scores[i].player + ": " + scores[i].score + "</li>");
            listEl.append(itemEl);
            itemEl.attr('class', 'text-center p-2');
        }
    }else{ // If scores is empty, we initialize it to an empty array
        scores = [];
    }

    // Creates the form element for user to save score
    var formEl = $("<form>");
    formEl.attr('class', 'mx-auto');
    sectionEl.append(formEl);

    // Creates the label for the input field
    var textEl = $("<label>Initials: </label>");
    textEl.attr('for', 'initals');
    formEl.append(textEl);

    // Creates the input field
    var inputEl = $("<input>");
    inputEl.attr('name', 'initials');
    inputEl.attr('type', 'text');
    formEl.append(inputEl);

    // Creates the submit button
    var btnEl = $("<button>Submit</button>");
    formEl.append(btnEl);

    // Event handler for the submit button
    btnEl.on('click', function (event){
        event.preventDefault(); // Prevents the page from refreshing

        scores.push({player: inputEl.val(), score: correctAnswers}); // Adds the new score on to the list array

        localStorage.setItem("scores", JSON.stringify(scores)); // Pushes scores to localStorage

        // Adds the players new score on to the screen
        var itemEl = $("<li>" +  inputEl.val() + ": " + correctAnswers + "</li>");
        listEl.append(itemEl);
        itemEl.attr('class', 'text-center p-2');

        // Removes the input field
        formEl.empty();
    });
};
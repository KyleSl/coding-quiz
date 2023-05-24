var startEl = $('#startBtn');
var questionsEl = $('#questions');
var timeEl = $('#timer');
var timer;
var questionList = [{question: "does this work?", answers: ["poopoo", "peepee", "stinky"]}];
var seconds = 60;
var questionsAnswered = 0;
var correct = 0;

console.log(startEl);
console.log(questionsEl);

startEl.on('click', function (){
    seconds = 61;
    time();
    timer = setInterval(time, 1000);
    startEl.addClass('invisible');
    questionsEl.addClass('p-1');
    var newEl = $("<h1>" + questionList[questionsAnswered].question + "</h1>");
    questionsEl.append(newEl);
    console.log(questionList[questionsAnswered].question);
    newEl.attr('class', 'bg-dark text-white p-3 text-center rounded');
    for(var i = 0; i < questionList[questionsAnswered].answers.length; i++){
        newEl = $("<p>" + questionList[questionsAnswered].answers[i] + "</p>");
        questionsEl.append(newEl);
        console.log(newEl);
        newEl.attr('class', 'bg-info text-white text-center rounded mx-auto w-50 p-1');
    }
});

function time(){
    seconds--;
    timeEl.text(seconds);
    // console.log("time ran");
}
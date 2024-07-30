const questions = [
  {
    question: "'You don't know about me, but i'll bet you want to'",
    answers: [
      {text: "Bad blood", correct: false},
       {text: "Blank Space", correct: false},
       {text: "State Of Grace", correct: false},
       {text: "22", correct: true},
    ]
  },
  {
    question: "'The lights are off, he's taking off his coat'?",
      answers: [
        {text: "Love Story", correct: false},
         {text: "All too well (10 minute version)", correct: false},
         {text: "Style", correct: true},
         {text: "Enchanted", correct: false},
      ]
  },
  {
  question: "'Can't stop, won't stop groovin''",
    answers: [
      {text: "Shake It Off", correct: true},
       {text: "Cardigan", correct: false},
       {text: "Wildest Dreams", correct: false},
       {text: "Hey Stephen", correct: false},
    ]
  },
  {
    question: "'No rules in breakable heaven'",
      answers: [
        {text: "Lover", correct: false},
         {text: "London boy", correct: false},
         {text: "Anti-hero", correct: false},
         {text: "Cruel Summer", correct: true},
      ]
  },
  {
    question: "'This is our place, we make the call'",
      answers: [
        {text: "Lover", correct: true},
         {text: "Delicate", correct: false},
         {text: "betty", correct: false},
         {text: "London boy", correct: false},
      ]
  },
  {
    question: "'And I got a boyfriend, he's older than us'",
      answers: [
        {text: "Delicate", correct: false},
         {text: "Gorgeous", correct: true},
         {text: "End Game", correct: false},
         {text: "Karma", correct: false},
      ]
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  })
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}
nextButton.addEventListener("click", () =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});
let timeLeft =15; 
let timerElement = document.getElementById('timer');
let timerInterval;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000); // Update every second
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerElement.innerHTML = 'Time’s up!';
        button.disabled = true;
      nextButton.style.display = "block";
      nextButton.addEventListener("click");
      return
        
    }

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // Format minutes and seconds
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.innerHTML = `Time Left: ${minutes}:${seconds}`;
    timeLeft--;
}

startQuiz();

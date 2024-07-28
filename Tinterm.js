const questions = [
  {
    question: "What was the first re-recorded album to come out?",
    answers: [
      {text: "Red (Taylor's Version)", correct: false},
       {text: "Fearless (Taylor's Version)", correct: true},
       {text: "Speak Now (Taylor's Version", correct: false},
       {text: "1989 (Taylor's Version)", correct: false},
    ]
  },
  {
    question: "Does she have a song called 'Invisible'?",
      answers: [
        {text: "yes", correct: true},
         {text: "no", correct: false},
      ]
  },
  {
  question: "When did Miss Americana (Film) come out?",
    answers: [
      {text: "2019", correct: false},
       {text: "2018", correct: false},
       {text: "2020", correct: true},
       {text: "2021", correct: false},
    ]
  },
  {
    question: "What are the names of her cats?",
      answers: [
        {text: "Liam, Olivia, Peter", correct: false},
         {text: "Chloe, Dorothy, Betty", correct: false},
         {text: "Meredith, Olivia, Benjamin", correct: true},
         {text: "Theo, Sam, Chloe ", correct: false},
      ]
  },
  {
    question: "She's the only artist to win____4 times?",
      answers: [
        {text: "Song of the year", correct: false},
         {text: "Best pop vocal album", correct: false},
         {text: "Best pop solo performance", correct: false},
         {text: "Album of the year", correct: true},
      ]
  },
  {
    question: "When did 'reputation' come out?",
      answers: [
        {text: "December 13, 2016", correct: false},
         {text: "November 10, 2017", correct: true},
         {text: "November 10, 2016", correct: false},
         {text: "October 27, 2017", correct: false},
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

startQuiz();
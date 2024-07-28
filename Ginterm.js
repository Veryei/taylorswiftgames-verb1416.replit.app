const questions = [
  {
    question: "'For never leaving well enough alone'",
    answers: [
      {text: "Down Bad", correct: false},
       {text: "the last great american dynasty", correct: false},
       {text: "the 1", correct: true},
       {text: "evermore", correct: false},
    ]
  },
  {
    question: "'To move the furniture so we could dance'",
      answers: [
        {text: "All You Had To Do Was Stay", correct: false},
         {text: "Out Of The Woods", correct: true},
         {text: "Lavender Haze", correct: false},
         {text: "Stay Stay Stay", correct: false},
      ]
  },
  {
  question: "'And I stare at the phone, he still hasn't called'",
    answers: [
      {text: "Tell Me Why", correct: false},
       {text: "Mean", correct: false},
       {text: "exile", correct: false},
       {text: "Forever & Always", correct: true},
    ]
  },
  {
    question: "'Sipping coffee like you're on a late night show'",
      answers: [
        {text: "Better Man", correct: false},
         {text: "All too well (10 minute version)", correct: true},
         {text: "Sweet Nothing", correct: false},
         {text: "So Long, London ", correct: false},
      ]
  },
  {
    question: "'Blurring out my periphery'",
      answers: [
        {text: "Snow On The Beach", correct: true},
         {text: "Mastermind", correct: false},
         {text: "The Archer", correct: false},
         {text: "Cornelia Street", correct: false},
      ]
  },
  {
    question: "'I'm telling him to floor it through the fences'",
      answers: [
        {text: "Florida!!!", correct: false},
         {text: "But Daddy I Love Him", correct: true},
         {text: "Maroon", correct: false},
         {text: "Midnight Rain", correct: false},
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
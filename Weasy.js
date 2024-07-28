const questions = [
  {
    question: "'Our Song' or 'Picture To Burn'?",
    answers: [
      {text: "Our Song", correct: true},
       {text: "Picture To Burn", correct: false},
    ]
  },
  {
    question: "'Fifteen (Taylor's Version)' or 'Hey Stephen (Taylor's Version)'?",
      answers: [
        {text: "Fifteen (Taylor's Version)", correct: true},
         {text: "Hey Stephen (Taylor's Version)", correct: false},
      ]
  },
  {
  question: "'Back To December (Taylor's Version)' or 'Speak Now (Taylor's Version)'",
    answers: [
      {text: "Back To December (Taylor's Version)", correct: true},
       {text: "Speak Now (Taylor's Version)", correct: false},
    ]
  },
  {
    question: "'Red (Taylor's Version)' or 'I Knew You Were Trouble (Taylor's Version)'",
      answers: [
        {text: "Red (Taylor's Version)", correct: false},
         {text: "I Knew You Were Trouble (Taylor's Version)", correct: true},
      ]
  },
  {
    question: "'Is It Over Now? (Taylor's Version)' or 'Wildest Dreams (Taylor's Version)'",
      answers: [
        {text: "Is It Over Now? (Taylor's Version)", correct: false},
         {text: "Wildest Dreams (Taylor's Version)", correct: true},
      ]
  },
  {
    question: "'End Game' or 'Delicate'",
      answers: [
        {text: "End Game", correct: false},
         {text: "Delicate", correct: true},
      ]
  },
  {
    question: "'The Man' or 'Paper Rings'",
      answers: [
        {text: "The Man", correct: true},
         {text: "Paper Rings", correct: false},
      ]
  },
  {
    question: "'exile' or 'august'",
      answers: [
        {text: "exile", correct: false},
         {text: "august", correct: true},
      ]
  },
  {
    question: "'tolerate it' or 'champagne problems'",
      answers: [
        {text: "tolerate it", correct: false},
         {text: "champagne problems", correct: true},
      ]
  },
  {
    question: "'Anti-Hero' or 'Lavender Haze'",
      answers: [
        {text: "Anti-Hero", correct: true},
         {text: "Lavender Haze", correct: false},
      ]
  },
  {
    question: "'Fortnight' or 'Down Bad'",
      answers: [
        {text: "Fortnight", correct: true},
         {text: "Down Bad", correct: false},
      ]
  }
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
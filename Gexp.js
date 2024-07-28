const questions = [
  {
    question: "'Then feverishly calling their cousins'",
    answers: [
      {text: "The prophecy", correct: false},
       {text: "Labyrinth", correct: false},
       {text: "How did it end?", correct: true},
       {text: "Peter", correct: false},
    ]
  },
  {
    question: "'Free as these birds, light as whispers'",
      answers: [
        {text: "I Hate It Here", correct: false},
         {text: "Carolina", correct: true},
         {text: "epiphany", correct: false},
         {text: "mirrorball", correct: false},
      ]
  },
  {
  question: "'Open the blinds, let me see your face'",
    answers: [
      {text: "Untouchable", correct: false},
       {text: "the lakes", correct: false},
       {text: "You Are In Love", correct: false},
       {text: "Renegade", correct: true},
    ]
  },
  {
    question: "'And now that you're close, I feel like coming undone'",
      answers: [
        {text: "Untouchable", correct: true},
         {text: "Tell Me Why", correct: false},
         {text: "loml", correct: false},
         {text: "seven", correct: false},
      ]
  },
  {
    question: "'And I wish I could run to you'",
      answers: [
        {text: "The Last time", correct: false},
         {text: "I Almost Do", correct: true},
         {text: "Innocent", correct: false},
         {text: "Timeless", correct: false},
      ]
  },
  {
    question: "'Beauty is a beast that roars'",
      answers: [
        {text: "Clara Bow", correct: true},
         {text: "The Alchemy", correct: false},
         {text: "my tears ricochet", correct: false},
         {text: "peace", correct: false},
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
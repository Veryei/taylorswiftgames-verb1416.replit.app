const questions = [
  {
    question: "'I find myself at your door'",
    answers: [
      {text: "The Last Time", correct: true},
       {text: "Labyrinth", correct: false},
       {text: "How did it end?", correct: false},
       {text: "Peter", correct: false},
    ]
  },
  {
    question: "'Maybe I was naive, got lost in your eyes'",
      answers: [
        {text: "I Hate It Here", correct: false},
         {text: "Carolina", correct: false},
         {text: "White Horse", correct: true},
         {text: "mirrorball", correct: false},
      ]
  },
  {
  question: "'I hope she'll be your beautiful fool'",
    answers: [
      {text: "Untouchable", correct: false},
       {text: "the lakes", correct: false},
       {text: "happiness", correct: true},
       {text: "Renegade", correct: false},
    ]
  },
  {
    question: "'Something gave you the nerve to touch my hand'",
      answers: [
        {text: "I Forgot That You Existed", correct: false},
         {text: "Tell Me Why", correct: false},
         {text: "loml", correct: false},
         {text: "It's Nice To Have A Friend", correct: true},
      ]
  },
  {
    question: "'She knew what the agony had been for'",
      answers: [
        {text: "Robin", correct: false},
         {text: "I Almost Do", correct: false},
         {text: "The Manuscript", correct: true},
         {text: "Timeless", correct: false},
      ]
  },
  {
    question: "'Sit quiet by my side in the shade'",
      answers: [
        {text: "Clara Bow", correct: false},
         {text: "The Alchemy", correct: false},
         {text: "Paris", correct: true},
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

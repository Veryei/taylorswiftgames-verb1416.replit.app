const questions = [
  {
    question: "Does Taylor have a dog?",
    answers: [
      {text: "Yes", correct: false},
       {text: "No", correct: true},
       {text: "Yes", correct: false},
       {text: "No", correct: true},
    ]
  },
  {
    question: "What's the name of her 4th album?",
      answers: [
        {text: "Speak Now", correct: false},
        {text: "reputation", correct: false},
        {text: "1989", correct: false},
        {text: "Red", correct: true},
      ]
  },
  {
  question: "What's the name of her father?",
    answers: [
      {text: "Austin", correct: false},
       {text: "Andrew", correct: false},
       {text: "Scott", correct: true},
       {text: "Franklin", correct: false},
    ]
  },
  {
    question: "Does she have a sister?",
      answers: [
        {text: "Yes", correct: false},
         {text: "No", correct: true},
         {text: "Yes", correct: false},
         {text: "No", correct: true},
      ]
  },
  {
    question: "What city does she live in?",
      answers: [
        {text: "Los Angeles", correct: false},
         {text: "Nashville", correct: false},
         {text: "New York City", correct: true},
         {text: "Philadelphia", correct: false},
      ]
  },
  {
    question: "Which of these albums are not Taylor's Version yet?",
      answers: [
        {text: "Lover", correct: false},
         {text: "Taylor Swift", correct: true},
         {text: "Red", correct: false},
         {text: "Fearless", correct: false},
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

const questions = [
  {
    question: "What is Taylor's full name?",
    answers: [
      {text: "Taylor Andrea Swift", correct: false},
       {text: "Taylor Swift", correct: false},
       {text: "Taylor Alison Swift", correct: true},
       {text: "Taylor Ella Swift", correct: false},
    ]
  },
  {
    question: "How many cats does Taylor have?",
      answers: [
        {text: "0", correct: false},
         {text: "3", correct: true},
         {text: "2", correct: false},
         {text: "4", correct: false},
      ]
  },
  {
  question: "Where was Taylor born?",
    answers: [
      {text: "Nashville,TN. ", correct: false},
       {text: "West Reading, PA. ", correct: true},
       {text: "New York, NY. ", correct: false},
       {text: "Franklin, TN. ", correct: false},
    ]
  },
  {
    question: "How many Grammys does she have?",
      answers: [
        {text: "10", correct: false},
         {text: "13 ", correct: false},
         {text: "8 ", correct: false},
         {text: "14 ", correct: true},
      ]
  },
  {
    question: "How many Albums does she have?",
      answers: [
        {text: "10", correct: false},
         {text: "6", correct: false},
         {text: "11", correct: true},
         {text: "9", correct: false},
      ]
  },
  {
    question: "When did she release her first album?",
      answers: [
        {text: "2006", correct: true},
         {text: "2004", correct: false},
         {text: "2007", correct: false},
         {text: "2003", correct: false},
      ]
  },
  {
    question: "What is Taylor's lucky number?",
      answers: [
        {text: "7", correct: false},
         {text: "12", correct: false},
         {text: "6", correct: false},
         {text: "13", correct: true},
      ]
  },
  {
    question: "When is Taylor's birthday?",
      answers: [
        {text: "November 10", correct: false},
         {text: "December 13", correct: true},
         {text: "November 13", correct: false},
         {text: "August 6", correct: false},
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
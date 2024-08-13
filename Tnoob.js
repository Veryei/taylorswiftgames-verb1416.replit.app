const questions = [
  {
    question: "Does Taylor have dogs?",
    answers: [
      {text: "Yes", correct: true},
       {text: "No", correct: false},
       {text: "", correct: false},
       {text: "", correct: false},
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
    question: "How old is she as of August 2024?",
      answers: [
        {text: "33", correct: false},
         {text: "34 ", correct: true},
         {text: "35", correct: false},
         {text: "32", correct: false},
      ]
  },
  {
    question: "Does she have a song called "evermore"?",
      answers: [
        {text: "Yes", correct: true},
         {text: "No", correct: false},
         {text: "", correct: false},
         {text: "", correct: false},
      ]
  },
  {
    question: "When did she release "TTPD"?",
      answers: [
        {text: "May 13, 2024", correct: false},
         {text: "May 1, 2024", correct: false},
         {text: "April 19, 2024", correct: true},
         {text: "March 10, 2024", correct: false},
      ]
  },
  {
    question: "Where is she ending "the eras tour"?",
      answers: [
        {text: "Vancouver", correct: true},
         {text: "Toronto", correct: false},
         {text: "Miami", correct: false},
         {text: "New Orleans", correct: false},
      ]
  },
  {
    question: "What is Taylor's height?",
      answers: [
        {text: "6ft (182cm)", correct: false},
         {text: "5ft11 (180cm)", correct: true},
         {text: "5ft10 (177)", correct: false},
         {text: "6ft1 (185cm)", correct: false},
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

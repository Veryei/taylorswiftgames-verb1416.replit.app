const questions = [
  {
    question: "'And pull me near and shine, shine, shine'",
    answers: [
       {text: "I can see you", correct: false},
       {text: "Hey Stephen", correct: true},
       {text: "the 1", correct: false},
       {text: "evermore", correct: false},
    ]
  },
  {
    question: "'And I know I make the same mistakes every time'",
      answers: [
        {text: "Call It What You Want", correct: true},
         {text: "Out Of The Woods", correct: false},
         {text: "Lavender Haze", correct: false},
         {text: "Stay Stay Stay", correct: false},
      ]
  },
  {
  question: "'My spine split from carrying us up the hill'",
    answers: [
      {text: "Tell Me Why", correct: false},
       {text: "Mean", correct: false},
       {text: "exile", correct: false},
       {text: "So Long, London", correct: true},
    ]
  },
  {
    question: "'There's no time for tears'",
      answers: [
        {text: "Picture to burn", correct: true},
         {text: "All too well (10 minute version)", correct: false},
         {text: "Sweet Nothing", correct: false},
         {text: "Better man ", correct: false},
      ]
  },
  {
    question: "'Sat on the roof, you and I'",
      answers: [
        {text: "Snow On The Beach", correct: true},
         {text: "Mastermind", correct: false},
         {text: "The Archer", correct: false},
         {text: "Cornelia Street", correct: true},
      ]
  },
  {
    question: "'Crestfallen on the landing'",
      answers: [
        {text: "willow", correct: false},
         {text: "But Daddy I Love Him", correct: false},
         {text: "champagne problems", correct: true},
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

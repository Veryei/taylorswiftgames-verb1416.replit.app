const questions = [
  {
    question: "'Tim McGraw' or 'Picture To Burn'?",
    answers: [
      {text: "Tim McGraw", correct: false},
       {text: "Picture To Burn", correct: true},
    ]
  },
  {
    question: "'You Belong With Me (Taylor's Version)' or 'Love Story (Taylor's Version)'?",
      answers: [
        {text: "You Belong With Me (Taylor's Version)", correct: false},
         {text: "Love Story (Taylor's Version)", correct: true},
      ]
  },
  {
  question: "'Mean (Taylor's Version)' or 'The Story Of Us (Taylor's Version)'?",
    answers: [
      {text: "Mean (Taylor's Version)", correct: true},
       {text: "The Story Of Us (Taylor's Version)", correct: false},
    ]
  },
  {
    question: "'Sad Beautiful Tragic (Taylor's Version)' or 'Holy Ground (Taylor's Version)'?",
      answers: [
        {text: "Sad Beautiful Tragic (Taylor's Version)", correct: true},
         {text: "Holy Ground (Taylor's Version)", correct: false},
      ]
  },
  {
    question: "'You Are In Love (Taylor's Version)' or 'Wonderland (Taylor's Version)'?",
      answers: [
        {text: "You Are In Love (Taylor's Version)", correct: true},
         {text: "Wonderland (Taylor's Version)", correct: false},
      ]
  },
  {
    question: "'New Year's Day' or 'King Of My Heart'?",
      answers: [
        {text: "New Year's Day", correct: false},
         {text: "King Of My Heart", correct: true},
      ]
  },
  {
    question: "'I Think He Knows' or 'Death By A Thousand Cuts'?",
      answers: [
        {text: "I Think He Knows", correct: false},
         {text: "Death By A Thousand Cuts", correct: true},
      ]
  },
  {
    question: "'seven' or 'mad woman'?",
      answers: [
        {text: "seven", correct: true},
         {text: "mad woman", correct: false},
      ]
  },
  {
    question: "'gold rush' or ''tis the damn season'?",
      answers: [
        {text: "gold rush", correct: true},
         {text: "'tis the damn season", correct: false},
      ]
  },
  {
    question: "'Maroon' or 'Snow On The Beach'?",
      answers: [
        {text: "Maroon", correct: true},
         {text: "Snow On The Beach", correct: false},
      ]
  },
  {
    question: "'I Hate It Here' or 'How Did It End?'?",
      answers: [
        {text: "I Hate It Here", correct: false},
         {text: "How Did It End?", correct: true},
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
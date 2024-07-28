const questions = [
  {
    question: "'I can make the bad guys good for a weekend'",
    answers: [
      {text: "Bad blood", correct: false},
       {text: "Blank Space", correct: true},
       {text: "State Of Grace", correct: false},
       {text: "22", correct: false},
    ]
  },
  {
    question: "'These are the words I held back'?",
      answers: [
        {text: "Fearless", correct: false},
         {text: "All too well (10 minute version)", correct: false},
         {text: "Style", correct: false},
         {text: "Enchanted", correct: true},
      ]
  },
  {
  question: "'I'm really gonna miss you picking fights'",
    answers: [
      {text: "We Are Never Ever Getting Back Together", correct: true},
       {text: "Cardigan", correct: false},
       {text: "Anti-hero", correct: false},
       {text: "Fearless", correct: false},
    ]
  },
  {
    question: "'Pierced through the heart but never killed'",
      answers: [
        {text: "Shake it off", correct: false},
         {text: "Speak now", correct: false},
         {text: "Anti-hero", correct: true},
         {text: "this is me trying", correct: false},
      ]
  },
  {
    question: "'My hands shake, I'm not usually this way'",
      answers: [
        {text: "Long Live", correct: false},
         {text: "Fearless", correct: true},
         {text: "betty", correct: false},
         {text: "Cardigan", correct: false},
      ]
  },
  {
    question: "'But I knew you'd linger like a tattoo kiss'",
      answers: [
        {text: "Cardigan", correct: true},
         {text: "Snow On The Beach", correct: false},
         {text: "You're On Your Own Kid", correct: false},
         {text: "evermore", correct: false},
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
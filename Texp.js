const questions = [
  {
    question: "What was Taylor's first single to come out?",
    answers: [
      {text: "Picture to burn", correct: false},
       {text: "Our song", correct: false},
       {text: "Tim McGraw", correct: true},
       {text: "Teardrops On My Guitar", correct: false},
    ]
  },
  {
    question: "Where did The Eras Tour begin?",
      answers: [
        {text: "Glendale, AZ.", correct: true},
         {text: "Houston, TX. ", correct: false},
         {text: "Nashville, TN. ", correct: false},
         {text: "Philadelphia, PA. ", correct: false},
      ]
  },
  {
  question: "These are names that she has used as song titles?",
    answers: [
      {text: "James, Andrea, Jake ", correct: false},
       {text: "Emma, John, Sam", correct: true},
       {text: "Penelope, Luke, Rob", correct: false},
       {text: "Dorothy, Jack, Inez", correct: false},
    ]
  },
  {
    question: "Which album did Taylor write all by helself?",
      answers: [
        {text: "1989", correct: false},
         {text: "Lover", correct: false},
         {text: "reputation", correct: false},
         {text: "Speak Now", correct: true},
      ]
  },
  {
    question: "When was the last year Taylor attended the met gala?",
      answers: [
        {text: "2016", correct: true},
         {text: "2015", correct: false},
         {text: "2019", correct: false},
         {text: "2018", correct: false},
      ]
  },
  {
    question: "This is NOT a Taylor Swift song title",
      answers: [
        {text: "Electric Touch", correct: false},
         {text: "folklore", correct: true},
         {text: "evermore", correct: false},
         {text: "Ours", correct: false},
      ]
  },
  {
    question: "What is Taylor's zodiac sign?",
      answers: [
        {text: "Libra", correct: false},
         {text: "Scorpius", correct: false},
         {text: "Sagittarius", correct: true},
         {text: "Pisces", correct: false},
      ]
  },
  {
    question: "This is NOT a 22 Eras t-shirt lyric",
      answers: [
        {text: "I bet you think about me", correct: false},
         {text: "Who's Taylor Swift anyway? Ew", correct: false},
         {text: "A lot going on at the moment", correct: false},
         {text: "I don't know about you but i'm feeling 22", correct: true},
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
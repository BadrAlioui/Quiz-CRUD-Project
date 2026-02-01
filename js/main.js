const quizForm = document.getElementById("quiz-form");
const questionInput = document.getElementById("question-input");
const answerInput = document.querySelector("#answer-input");
const btnAdd = document.querySelector("#submit-btn");
const btnCancel = document.querySelector("#cancel-btn");

const quizMessage = document.getElementById("quiz-message");

const questions = [];
let indexEdit = null;

function renderMessage(text) {
  quizMessage.textContent = text;
}

function normalizeText(text) {
  const cleaned = text.trim();
  if (cleaned === "") return "";
  return cleaned;
}

function renderQuiz(list) {
  const ul = document.getElementById("question-list");
  ul.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const quiz = list[i];
    const li = document.createElement("li");
    li.textContent = `${quiz.question} - ${quiz.answer} `;
    ul.appendChild(li);
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit"
    li.appendChild(btnEdit);
    btnEdit.addEventListener("click", () => {
    indexEdit = i;
    questionInput.value = list[indexEdit].question;
    answerInput.value = list[indexEdit].answer;
    renderMessage(`Editing #${i + 1}`);
  });
  }

  
}

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cleaned = normalizeText(questionInput.value);
  if (cleaned === "") {
    renderMessage("invalid question");
    return;
  }

  const response = normalizeText(answerInput.value);
  if (response ===""){
    renderMessage("Invalid answer");
    return;
  }

  const quiz = {
    question:cleaned,
    answer: response

  }

  if (indexEdit === null){
    questions.push(quiz)
    renderQuiz(questions)
    renderMessage("Added")
    quizForm.reset()
  }else{
    questions[indexEdit] = quiz
    renderQuiz(questions)
    indexEdit = null
    renderMessage("Updated")
    quizForm.reset()
  }


});

btnCancel.addEventListener('click', ()=>{
  indexEdit = null;
  quizForm.reset();
  renderMessage("Edit cancelled");
})


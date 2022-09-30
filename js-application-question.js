const header = document.getElementById('head');
const questionArea = document.getElementById('question-area');
const startButton = document.getElementById('start-button');
const genreAndDifficultyArea = document.getElementById('question-detail-area');
const answersArea = document.getElementById('answers-area');
let questionCount = 0;
let correctAnswer = 0;

const createAnswerButtons = (multiQuestion) => {
  createIncorrectAnswers(multiQuestion);
  createCorrectAnswer(multiQuestion);
}

const setButtonStyle = (answer) => {
  const answerButton = document.createElement('input');
  answerButton.type = 'button';
  answerButton.value = answer;
  answerButton.style.display = 'block';
  answerButton.style.marginBottom = '5px';
  answerButton.className = '.p-answers';
  answersArea.appendChild(answerButton);
  return answerButton;
}

const displayResult = () => {
  genreAndDifficultyArea.innerHTML = '';
  answersArea.innerHTML = '';
  header.textContent = `あなたの正答数は${correctAnswer}です！！`;
  questionArea.textContent = '再度チャレンジしたい場合は以下をクリック！！'
  const replayButton = document.createElement('input');
  replayButton.type = 'button';
  replayButton.value = 'ホームに戻る';
  answersArea.appendChild(replayButton);
  replayButton.addEventListener('click', () => {
    window.location.reload();
  });
}

const createIncorrectAnswers = (multiQuestion) => {
  multiQuestion[questionCount].incorrect_answers.forEach( (answers, index) => {
    const incorrectAnswerButton = setButtonStyle(answers);
    incorrectAnswerButton.addEventListener('click', () => {
      questionCount++;
      if(questionCount === 10) {
        displayResult();
      } else {
        displayNewQuestion(multiQuestion);
      }
    });
  });
}

const createCorrectAnswer = (multiQuestion) => {
  const correctAnswerButton = setButtonStyle(multiQuestion[questionCount].correct_answer);
  correctAnswerButton.addEventListener('click', () => {
    correctAnswer++;
    questionCount++;
    if(questionCount === 10) {
      displayResult();
    } else {
      displayNewQuestion(multiQuestion);
    }
  });
}

const createGenreAndDifficulty = (question) => {
  genreAndDifficultyArea.innerHTML = '';
  const genre = document.createElement('h2');
  genre.textContent = ` [ジャンル]${question.category}`;
  genreAndDifficultyArea.appendChild(genre);
  const difficulty = document.createElement('h2');
  difficulty.textContent = `[難易度]${question.difficulty}`;
  genreAndDifficultyArea.appendChild(difficulty);
}

const displayNewQuestion = (questions) => {
  header.textContent = `問題${questionCount + 1}`;
  createGenreAndDifficulty(questions[questionCount]);
  questionArea.textContent = questions[questionCount].question;
  answersArea.innerHTML = '';
  createAnswerButtons(questions);
}

const displayQuestion = async () => {
  const promise = await fetch('https://opentdb.com/api.php?amount=10', {method: 'GET'});
  if(promise.ok) {
    const questionsObject = promise.json();
    console.log(typeof questionsObject);
    displayNewQuestion(questionsObject.results);
  }
}

startButton.addEventListener('click', () => {
  header.textContent = '取得中';
  questionArea.textContent = '少々お待ちください';
  startButton.remove();
  displayQuestion();
  // fetch('https://opentdb.com/api.php?amount=10', {method: 'GET'})
  // .then(Response => {
  //   console.log (Response);
  //   if(Response.ok) {
  //     Response.json()
  //     .then(responseObject => {
  //       displayNewQuestion(responseObject.results);
  //     });
  //   }
  // })
  // .catch((e) => {
  //   header.textContent = 'エラー';
  // });
});
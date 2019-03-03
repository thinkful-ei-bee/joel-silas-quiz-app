'use strict';

const STORE = {
  score: 0,
  currentQuestion: 0,
  currentAnswer: '',
  userAnswers: [],
  currentView: 'start',
};

// https://www.usefultrivia.com/music_trivia/

/*
Render the start page.
Go to the first question page,
which displays question 1.
Record user answer, including index of question,
and whether the user was correct / incorrect.
Reload the question page with the next question.
Repeat this for all 5 questions.
Go to the result page.
Display the results.
Optionally restart the game
*/

const QUESTIONS = [
  {question: 'Who was awarded the very first gold record?', 
    answer:'answer-3', 
    answers: [
      'Elvis Presley', 
      'Nat King Cole',
      'The Beatles',
      'Perry Como',
      'The Who',
    ],
    answerTrivia: 'Although there were earlier publicity stunts involving records sprayed with gold lacquer, the actual award recognized today as a Gold Record was first awarded to Perry Como in 1958 for his recording of "Catch a Falling Star".',
  },
  {question: 'What pop singer is known as "The Material Girl"?', 
    answer: 'answer-3',
    answers: [
      'Britney Spears', 
      'Christina Aguilera',
      'Taylor Swift',
      'Madonna',
      'Pink',
    ],
    anwerTrivia: 'Madonna became known as "The Material Girl" after her hit single of the same name hit the charts in 1984. She hates it, claiming she would never have done the song if she knew the name would stick.',
  },
  {question: 'What Depeche Mode song was inspired by Priscilla Presley\'s book Elvis and Me?', 
    answer: 'answer-3',
    answers: [
      'Sweetest Perfection', 
      'Strangelove',
      'World In My Eyes',
      'Personal Jesus',
      '1984',
    ],
    answerTrivia: '"Personal Jesus" was inspired by Priscilla Presley\'s book Elvis And Me, in which she describes her relationship with Elvis Presley.',
  },
  {question: 'How much pressure do the strings in a grand piano exert on the frame?', 
    answer: 'answer-3',
    answers: [
      '300 LBS', 
      '3 Tons',
      '30 Tons',
      '30 LBs',
      '800,000 Kilometers',
    ],
    answerTrivia: 'Each string has a tension of 160-200 lbs, resulting in a total combined force of up to 30 tons in a concert grand.',
  },
  {question: 'What is the oldest surviving musical instrument?', 
    answer: 'answer-2',
    answers: [
      'Trumpet', 
      'Drum',
      'Flute',
      'Lyre',
      'Bongo',
    ],
    answerTrivia: 'An ancient bone flute, estimated to be about 43,000-82,000 years old, was found by Dr Ivan Turk, a palaeontologist at the Slovenian Academy of Science at a Neanderthal campsite in Ljubljana, Slovenia, in 1998. The oldest known musical instrument, it is made of an old cavebear femur segment with four holes (two complete and two partial).',
  }
];

function newStartPageTemplate() {
  return `<div class="row">
  <div class="col-4">
    <div class="card">

      <div class="card-body">

        <h4 class="card-title text-center">Shall We Play A Game?</h4>
        
        <form>
          <div class="form-group">
            
          </div>

          <div class="form-row text-center">
            <button type="submit" id="js-quiz-starter" class="btn btn-primary">Let's play!</button>
          </div>
        </form>

      </div>

      </div>
    </div>
  </div>`;
}

function newQuestionTemplate() {
  return `<div class="row">
      <div class="col-5">
        <div class="card">

          <h4 class="card-title text-center">${QUESTIONS[STORE.currentQuestion].question}</h4>
          
          <form>
            <div class="form-group">
              <!-- https://getbootstrap.com/docs/4.3/components/list-group/ -->
              <div class="list-group">
                <a href="#" id="answer-0" class="list-group-item list-group-item-action">${QUESTIONS[STORE.currentQuestion].answers[0]}</a><br>
                <a href="#" id="answer-1" class="list-group-item list-group-item-action">${QUESTIONS[STORE.currentQuestion].answers[1]}</a><br>
                <a href="#" id="answer-2" class="list-group-item list-group-item-action">${QUESTIONS[STORE.currentQuestion].answers[2]}</a><br>
                <a href="#" id="answer-3" class="list-group-item list-group-item-action">${QUESTIONS[STORE.currentQuestion].answers[3]}</a><br>
              </div>
            </div>
    
            <div class="form-group">
              <div class="list-group">
                <ul class="list-inline">
                  <li>${STORE.currentQuestion + 1} of ${QUESTIONS.length}</li>
                  <li class='list-spacer'>|</li>
                  <li>You have ${STORE.score} of ${QUESTIONS.length} correct</li>
                </ul>
              </div>
            </div>
    
            <div class="form-row text-center">
                <button type="submit" class="btn btn-primary js-submit-button">Submit</button>
                <button type="submit" class="btn btn-primary js-start-over-button">Star Over</button>
            </div>
          </form>
    
        </div>

      </div>
    </div>`;
}

function newResultPageTemplate() {

  STORE.currentAnswer = '';
  let templateCorrectAnswer = QUESTIONS[STORE.currentQuestion - 1].answer.substring(QUESTIONS[STORE.currentQuestion-1].answer.length - 1, QUESTIONS[STORE.currentQuestion-1].answer.length);
  let templateDisplayAnswer = QUESTIONS[STORE.currentQuestion - 1].answers[templateCorrectAnswer];

  let temmplateUserAnswer = STORE.userAnswers[STORE.currentQuestion - 1].userAnswer.substring(STORE.userAnswers[STORE.currentQuestion - 1].userAnswer.length - 1,STORE.userAnswers[STORE.currentQuestion - 1].userAnswer.length);
  let templateUserDisplay = QUESTIONS[STORE.currentQuestion - 1].answers[temmplateUserAnswer];

  return `
  <div class="mb-1 bg-primary d-inline-block"></div>
  
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-8">
      <div class="card">

        <div class="card-body">
        <p class="card-text" id="main-title-subtext">
        <!-- Placeholder text -->
        </p>
        <h4 class="card-title text-center">${QUESTIONS[(STORE.currentQuestion)-1].question}</h4>
        
        <form>

          <div class="form-group">
            <div class="list-group">
              <ul class="list-inline">
                <li>You answered: ${templateUserDisplay}</li>
                <li>Correct answer: ${templateDisplayAnswer}</li>
              </ul>
            </div>
          </div>
  
          <div class="form-group">
              <ul class="list-group">
                <li>${STORE.currentQuestion} of ${QUESTIONS.length}</li>
                <li> | </li>
                <li>You have ${STORE.score} of ${QUESTIONS.length} correct</li>
              </ul>
            
          </div>
  
          <div class="form-row text-center">
            <div class="col-12">
              <button type="submit" class="btn btn-primary js-submit-button">Next</button>
              <button type="submit" class="btn btn-primary js-start-over-button">Start Over</button>
            </div>
          </div>
        </form>
  
        </div>

        </div>
      </div>
      </div>
    </div>
    <div class="col-sm-2"></div>
  </div>`;
}

function newFinalResultPageTemplate() {
  return `
  <div class="mb-1 bg-primary d-inline-block"></div>
  
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-8">
      <div class="card">

        <div class="card-body">
        <p class="card-text" id="main-title-subtext">
        <!-- Placeholder text -->
        </p>
        <h4 class="card-title text-center">Score</h4>
        
        <form>
  
          <div class="form-group">
            <div class="list-group">
              <ul class="list-inline">
                <li></li>
                <li>Your score ${STORE.score} of a possible ${QUESTIONS.length}</li>
              </ul>
            </div>
          </div>
  
          <div class="form-row text-center">
            <div class="col-12">
              <button type="submit" class="btn btn-primary js-start-over-button">Play Again!</button>
            </div>
          </div>
        </form>
  
        </div>

        </div>
      </div>
      </div>
    </div>
    <div class="col-sm-2"></div>
  </div>`;
}

function getScore() {
  console.log(`STORE.userAnswers[index].userAnswer: ${STORE.userAnswers[STORE.currentQuestion].userAnswer} QUESTIONS[STORE.currentQuestion].answer: ${QUESTIONS[STORE.currentQuestion].answer}`);

  if(STORE.userAnswers[STORE.currentQuestion].userAnswer === QUESTIONS[STORE.currentQuestion].answer) {

    STORE.score++;
    return;
  }
  return;
}

function randomizeArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomizeQuestionAnswers(array){
  array.forEach(element => {
    randomizeArray(element.answers);
  });
}

function render(){ // should only read from store
  if(STORE.currentView === 'start'){
    $('.container').html(newStartPageTemplate());
    return;
  }

  if(STORE.currentView === 'quiz' && STORE.currentAnswer) {
    $('.list-group-item').removeClass('active');
    $(`#${STORE.currentAnswer}`).addClass('active');
    console.log('trying something');
    return;
  }

  if(STORE.currentView === 'quiz' && STORE.currentAnswer === ''){
    $('.container').html(newQuestionTemplate());
    return;
  }

  if(STORE.currentView === 'result') {
    $('.container').html(newResultPageTemplate());
    return;
  }

  if(STORE.currentView === 'final') {
    $('.container').html(newFinalResultPageTemplate());
  }

}

//should only write from STORE not right read
function handleToggleStart(){
  $('main').on('click', '#js-quiz-starter', function(event){
    // we are passing this locally when it is globally available, thoughts?
    STORE.currentView = 'quiz';
    render();
    
  });
}

function handleAnswerSelection(){
  // you can not directly tell DOM, only STORE
  // Change state of selections then call render
  $('main').on('click', '.list-group-item', (event) => {
    
    STORE.currentAnswer = $(event.target).attr('id');
    console.log(`STORE.currentAnswer: ${STORE.currentAnswer}`);
    render();
  });
}

function handleAnswerSubmission() {
  $('main').on('click', '.js-submit-button', (event) => {
    event.preventDefault();

    if(STORE.currentQuestion === QUESTIONS.length){
      STORE.currentView = 'final';
      render();
      return;
    }

    if(STORE.currentView === 'quiz' && STORE.currentAnswer === ''){
      console.log('User must select an answer!!!');
      return;
    }
  
    if(STORE.currentView === 'quiz') {
      STORE.userAnswers.push({
        questionNumber: STORE.currentQuestion, 
        userAnswer: STORE.currentAnswer,
      });
      getScore();
      console.log('Change view from quiz to result');
      STORE.currentView = 'result';
      STORE.currentQuestion++;
      console.log(`STORE.currentQuestion itterated by 1 and is now: ${STORE.currentQuestion}`);
      
      render();
      return;
    }

    if(STORE.currentView === 'result') {
      console.log('Change view from result to quiz');
      STORE.currentView = 'quiz';
      render();
      return;
    }

  });
}

function handleStartOverSubmssion(){
  $('main').on('click', '.js-start-over-button', (event) =>{
    STORE.score = 0;
    STORE.currentQuestion = 0;
    STORE.currentAnswer = '';
    STORE.userAnswers = [];
    STORE.currentView = 'start';
    render();
  });
}

function main(){
  // Randomize QUESTIONS at start
  //randomizeArray(QUESTIONS);
  // Randomize QUESTIONS answers at start
  //randomizeQuestionAnswers(QUESTIONS);
  render();
  handleToggleStart();
  handleAnswerSelection();
  handleAnswerSubmission();
  handleStartOverSubmssion();
  // renderResultPage();
  // handleUserAnswer();
}

$(main);

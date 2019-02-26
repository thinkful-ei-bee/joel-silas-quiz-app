'use strict';

const STORE = {
  currentQuestion: 0,
  currentAnswer: '',
  userAnswers: [],
  currentView: 'start',
};

// https://www.usefultrivia.com/music_trivia/

const QUESTIONS = [
  {question: 'Who was awarded the very first gold record?', 
    answer:'Perry Como', 
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
    answer: 'Madonna',
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
    answer: 'Personal Jesus',
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
    answer: '30 LBS',
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
    answer: 'Flute',
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

function newQuestionTemplate(array){
  return `<div class="mb-1 bg-primary d-inline-block"></div>
    
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <div class="card">

          <div class="card-body">
          <p class="card-text" id="main-title-subtext">
          <!-- Placeholder text -->
          </p>
          <h4 class="card-title text-center">${array[0].question}</h4>
          
          <form>
            <div class="form-group">
              <!-- https://getbootstrap.com/docs/4.3/components/list-group/ -->
              <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active">${array[0].answers[0]}</a>
                <a href="#" class="list-group-item list-group-item-action">${array[0].answers[1]}</a>
                <a href="#" class="list-group-item list-group-item-action">${array[0].answers[2]}</a>
                <a href="#" class="list-group-item list-group-item-action">${array[0].answers[3]}</a>
              </dib>
            </div>
    
            <div class="form-group">
              <div class="list-group">
                <ul class="list-inline">
                  <li>${STORE.currentQuestion} of ${array.length}</li>
                  <li>${getScore()}</li>
                </ul>
              </div>
            </div>
    
            <div class="form-row text-center">
              <div class="col-12">
                <button type="submit" class="btn btn-primary js-submit-button">Submit</button>
                <button type="submit" class="btn btn-primary js-start-over-button">Star Over</button>
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

function newResultPageTemplate(){
  return `
   <div class="row">
      <div class="col-4">
        <div class="box"></div>
      </div>
      <div class="col-4">
        <div class="box blue">
            <h1>Result</h1>
            <div class="answer-result">Placeholer Text: Here's the real answer.</div>
            <form id="js-results" action="get">
                <button type="submit" for="js-results" value="Submit">Submit</button>
            </form>
        </div>
      </div>
      <div class="col-4">
        <div class="box"></div>
      </div>
    </div>`;
}

function getScore() {
  return 'Correct Answers: 0 of 5';
}

function randomizeArray(array){
  let returnArray =  array.forEach((val, key) => {
    let randomIndex = Math.ceil(Math.random()*(key + 1));
    array[key] = array[randomIndex];
    array[randomIndex] = val;
  });
  return returnArray;
}

function render(template){
  $('.container').html(template);
}

function handleToggleStart(){
  $('#js-quiz-starter').click(function(){
    console.log('Start Quiz Button Pushed');
    render(newQuestionTemplate(QUESTIONS));
  });
}

function handleAnswerSelection(){
  $('main').on('click', '.list-group-item', (event) => {
    
    const target = $(event.currentTarget);
    const otherLinks = $('.list-group-item').not(target);
    otherLinks.removeClass('active')
    target.addClass('active'); // This is your rel value
    STORE.currentAnswer = target.val();
    console.log(STORE.currentAnswer);
  });
}

function handleAnswerSubmission(){
  $('main').on('click', '.js-submit-button', (event) => {
    console.log('you submitted something');
    STORE.userAnswers.push({questionNumber: QUESTION[STORE.currentQuestion], userAnswer: STORE.currentAnswer });
  });
}

function main(){
  handleToggleStart();
  handleAnswerSelection();
  handleAnswerSubmission();
  // renderResultPage();
  // handleUserAnswer();
}

$(main);

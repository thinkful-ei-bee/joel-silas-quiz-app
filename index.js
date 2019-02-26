'use strict';

const STORE = {
  currentQuestion: 0,
  userAnswers: [],
  currentView: 'start',
};

const QUESTIONS = [
  {question: 'Placeholder question', 
    answer: 2, 
    answers: ['PH Answer 1', 'PH Answer 2']},
  {question: 'Placeholder question 2', 
    answer: 1,
    answers: ['PH Answer 1', 'PH Answer 2']},
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

function renderStartPage(){
  
}

function renderQuestionPage(){
  $('.container').click(function(event){
    event.preventDefault();
    console.log('Start Quiz Button Pushed');
    $('.container').html(newQuestionTemplate());
  });
}

function renderResultPage(){

}

function handleUserAnswer(){

}

function newQuestionTemplate(){
  return `<div class="mb-1 bg-primary d-inline-block"></div>
    
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">
            <p class="card-text" id="main-title-subtext">
            <!-- Placeholder text -->
            </p>
            <h4 class="card-title text-center">What is your favorite color?</h4>
            
            <form>
              <div class="form-group">
                <!-- https://getbootstrap.com/docs/4.3/components/list-group/ -->
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action active">Answer 1</a>
                  <a href="#" class="list-group-item list-group-item-action">Answer 2</a>
                  <a href="#" class="list-group-item list-group-item-action">Answer 3</a>
                  <a href="#" class="list-group-item list-group-item-action">Answer 4</a>
                </dib>
              </div>

              <div class="form-group">
                <div class="list-group">
                  <ul class="list-inline">
                    <li>Question: 1/5</li>
                    <li>Correct Answers: 0/5</li>
                  </ul>
                </div>
              </div>

              <div class="form-row text-center">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Submit</button>
                  <button type="submit" class="btn btn-primary">Star Over</button>
                </div>
              </div>
            </form>

          </div>
        </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
    </div>`;
}

function main(){
  renderStartPage();
  renderQuestionPage();
  renderResultPage();
  handleUserAnswer();
}

$(main);

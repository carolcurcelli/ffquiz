/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import QuizBackground from '../src/components/QuizBackground';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Loading...
      </Widget.Header>
      <Widget.Content>
        <Image
          src="/loading.gif"
          alt="Loading..."
          width={228}
          height={165}
        />
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Your results are...
      </Widget.Header>
      <Widget.Content>
        <div>
          <p>
            You got
            {' '}
            {/* {results.reduce((somatoriaAtual, resultAtual) => {
              const isRight = resultAtual === true;
              if (isRight) {
                return somatoriaAtual + 1;
              }
              return somatoriaAtual;
            }, 0)} */}
            {results.filter((i) => i).length}
            {' '}
            questions out of
            {` ${db.questions.length}`}
            .
          </p>
          <ul>
            {results.map((result, index) => (
              <li>
                <p>
                  #
                  {index + 1}
                  {' '}
                  Result:
                  {` ${result === true ? 'Correct' : 'Wrong'}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/success.gif"
          alt="Success!"
          width={189}
          height={189}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState();
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="" /> */}
        <h3>
          {`Question ${questionIndex + 1} of ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmitted(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={selectedAlternative === alternativeIndex}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}

          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
            text="Next"
          />
          {/* <p>
            selectedAlternative:
            {` ${selectedAlternative}`}
          </p>
          {isQuestionSubmitted && isCorrect && <p>You got it right!</p>}
          {isQuestionSubmitted && !isCorrect && <p>You got it wrong...</p>} */}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects (Ciclo de Vida do Componente React)]
  // React.useEffect
  // nasce === didMount
  // atualizado === willUpdate
  // morre === willUnmount

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/carolsvntos" />
    </QuizBackground>
  );
}

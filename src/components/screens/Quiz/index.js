/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Image from 'next/image';
import db from '../../../../db.json';
import Widget from '../../Widget';
import QuizLogo from '../../QuizLogo';
import GitHubCorner from '../../GitHubCorner';
import Button from '../../Button';
import QuizContainer from '../../QuizContainer';
import AlternativesForm from '../../AlternativesForm';
import QuizBackground from '../../QuizBackground';

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

function ResultWidget({ results, name }) {
  return (
    <Widget>
      <Widget.Header>
        {name}
        , here is your score:
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
  name,
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
          {`${name}, this is question ${questionIndex + 1} of ${totalQuestions}`}
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

QuestionWidget.propTypes = {
  question: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onSubmit: PropTypes.string.isRequired,
  addResult: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

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
  const router = useRouter();
  const { name } = router.query;

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
            name={name}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/carolsvntos" />
    </QuizBackground>
  );
}

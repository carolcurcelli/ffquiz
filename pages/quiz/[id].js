import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
        questionLength={dbExterno.questions.length}
      />
    </ThemeProvider>
    // /* <pre style={{ color: 'pink' }}>
    //   {JSON.stringify(dbExterno.questions, null, 4)}
    // </pre> */
  );
}

export async function getServerSideProps(context) {
  const [project, author] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${project}.${author}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Failed to load JSON.');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    // .catch((err) => {
    //   console.log(err);
    // });

  // console.log('dbExterno', dbExterno);

  return {
    props: {
      dbExterno,
    },
  };
}

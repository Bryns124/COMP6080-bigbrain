import React from 'react';
// import { Link } from 'react-router-dom';

import '../styles/Dashboard.css';
import bigbrainLogo from '../assets/bigbrain_add_quiz_img.svg'
function Dashboard ({ token }) {
  const [addQuiz, setAddQuiz] = React.useState('');
  const [quizBool, setQuizBool] = React.useState(false);
  const [allQuizes, setAllQuizes] = React.useState([]);

  const getQuizes = async () => {
    const url = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const response = await url.json();
    console.log(response);
    setAllQuizes(response);
    console.log('hey' + allQuizes);
  }
  React.useEffect(async () => {
    await getQuizes();
  }, [quizBool]);

  const addNewQuiz = async () => {
    await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: addQuiz
      })
    });
    await getQuizes();
  }

  return (
    <div className='BodyStyle'>
      <h3>Dashboard!</h3>
      <div className='InnerBody'>
        <div style={ { verticalAlign: 'baseline' } }>
          <div style={ { verticalAlign: 'baseline', display: 'flex' } }>
            <div className='QuizContainer'>
              <button href="/add-quiz" onClick={() => { setQuizBool(!quizBool) }}>
                {quizBool ? 'Hide' : 'Show'}Add New Quiz
              </button>
              {
                quizBool && (
                  <>
                    <br />
                    Create your new quiz here! <br />
                    <label>Name</label>
                    <input type="text" value={addQuiz} onChange={val => setAddQuiz(val.target.value)} />
                    <button onClick={addNewQuiz}>Create Quiz</button>
                  </>
                )
              }
              <img src={bigbrainLogo} alt="bigbrain add quiz img" />
              {
                allQuizes.map(q => (
                  <>
                    <b>{q.name}</b><br />
                  </>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
